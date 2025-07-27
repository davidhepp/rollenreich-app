import { prisma as db } from "@/prisma";
import { checkAdmin } from "@/lib/checkAdmin";
import { NextResponse } from "next/server";
import { CollectionAddFormSchema } from "@/lib/schemas/collectionSchema";

export async function POST(request: Request) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = CollectionAddFormSchema.parse(body);

    const { productIds, image, ...collectionData } = validatedData;

    // Create the collection
    const collection = await db.collection.create({
      data: {
        ...collectionData,
        ...(image && {
          image: {
            create: {
              url: image,
              altText: collectionData.name,
            },
          },
        }),
      },
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

    // Connect products to the collection
    if (productIds && productIds.length > 0) {
      await db.productCollection.createMany({
        data: productIds.map((productId) => ({
          collectionId: collection.id,
          productId,
        })),
      });
    }

    // Fetch the complete collection with products
    const completeCollection = await db.collection.findUnique({
      where: { id: collection.id },
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

    return NextResponse.json(completeCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      { error: "Failed to create collection" },
      { status: 500 }
    );
  }
}
