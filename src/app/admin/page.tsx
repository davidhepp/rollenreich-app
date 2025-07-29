import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full rounded-lg p-8 text-center">
        <div className="mb-8">
          <Image
            src="/herotext.svg"
            alt="Rollenreich"
            width={800}
            height={800}
            className="mx-auto"
          />
        </div>
        <h1 className="text-3xl font-semibold text-text-primary font-playfair">
          ADMIN
        </h1>
        <h2 className="text-lg text-text-secondary font-playfair">
          Welcome, {session?.user?.name || session?.user?.email}!
        </h2>
        <div className="flex gap-4">
          <Button
            className="mt-4 bg-btn-primary hover:bg-btn-primary-hover rounded-none"
            asChild
          >
            <Link href="/admin/products">Products Management</Link>
          </Button>
          <Button
            className="mt-4 bg-btn-primary hover:bg-btn-primary-hover rounded-none"
            asChild
          >
            <Link href="/admin/collections">Collections Management</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
