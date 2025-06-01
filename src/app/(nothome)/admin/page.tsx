import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.email !== "david@heppify.de") {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full rounded-lg p-8 text-center">
        <h1 className="text-3xl font-semibold text-text-primary font-playfair">
          ADMIN
        </h1>
      </div>
    </div>
  );
}
