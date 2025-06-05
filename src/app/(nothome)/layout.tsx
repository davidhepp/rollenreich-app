import ClientLayoutStatic from "@/components/layout/ClientLayoutStatic";
import Footer from "@/components/home/Footer";

export default function NotHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientLayoutStatic>
        {children}
        <Footer />
      </ClientLayoutStatic>
    </>
  );
}
