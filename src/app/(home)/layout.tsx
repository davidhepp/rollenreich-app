import ClientLayout from "@/components/layout/ClientLayout";
import Footer from "@/components/home/Footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout>
      {children}
      <Footer />
    </ClientLayout>
  );
}
