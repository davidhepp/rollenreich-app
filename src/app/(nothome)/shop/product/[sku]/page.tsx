import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span>{params.sku}</span>
        </nav>
      </div>
    </div>
  );
}
