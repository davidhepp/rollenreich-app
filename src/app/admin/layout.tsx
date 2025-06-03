import { checkAdmin } from "@/lib/checkAdmin";
import { notFound } from "next/navigation";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return notFound();
  }

  return <>{children}</>;
}
