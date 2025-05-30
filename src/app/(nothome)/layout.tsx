import ClientLayoutStatic from "@/components/layout/ClientLayoutStatic";

export default function NotHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayoutStatic>{children}</ClientLayoutStatic>;
}
