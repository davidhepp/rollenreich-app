import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full rounded-lg p-8 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold">401</h1>
          <h2 className="text-2xl font-semibold mb-4">Unauthorized</h2>
          <p className="mb-6">
            You don&apos;t have permission to access this page. Please log in or
            contact an administrator.
          </p>
        </div>

        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="w-full h-12 border-2 border-text-primary hover:bg-bg-secondary bg-white rounded-none text-text-primary font-medium tracking-wide"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
