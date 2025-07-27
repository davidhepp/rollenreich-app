import { prisma as db } from "@/prisma";
import { checkAdmin } from "@/lib/checkAdmin";
import { NextResponse } from "next/server";
import { CollectionEditFormSchema } from "@/lib/schemas/collectionSchema";

export async function POST(request: Request) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = CollectionEditFormSchema.parse(body);

    const { id, productIds, image, ...collectionData } = validatedData;

    // Update the collection
    await db.collection.update({
      where: { id },
      data: {
        ...collectionData,
        ...(image && {
          image: {
            upsert: {
              create: {
                url: image,
                altText: collectionData.name,
              },
              update: {
                url: image,
                altText: collectionData.name,
              },
            },
          },
        }),
      },
    });

    // Update product connections
    // First, remove all existing connections
    await db.productCollection.deleteMany({
      where: { collectionId: id },
    });

    // Then, create new connections
    if (productIds && productIds.length > 0) {
      await db.productCollection.createMany({
        data: productIds.map((productId) => ({
          collectionId: id,
          productId,
        })),
      });
    }

    // Fetch the complete updated collection
    const updatedCollection = await db.collection.findUnique({
      where: { id },
      include: {
        image: true,
        products: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedCollection);
  } catch (error) {
    console.error("Error updating collection:", error);
    return NextResponse.json(
      { error: "Failed to update collection" },
      { status: 500 }
    );
  }
}
