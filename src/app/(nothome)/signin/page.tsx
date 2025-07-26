"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface ProvidersStatus {
  google: boolean;
  github: boolean;
}

export default function SignInPage() {
  const [providersStatus, setProvidersStatus] = useState<ProvidersStatus>({
    google: false,
    github: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  useEffect(() => {
    const fetchProvidersStatus = async () => {
      try {
        const response = await fetch("/api/auth/providers-status");
        const status = await response.json();
        setProvidersStatus(status);
      } catch (error) {
        console.error("Failed to fetch providers status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvidersStatus();
  }, []);

  const handleGoogleSignIn = () => {
    if (providersStatus.google) {
      signIn("google", { callbackUrl: "/" });
    }
  };

  const handleGithubSignIn = () => {
    if (providersStatus.github) {
      signIn("github", { callbackUrl: "/" });
    }
  };

  return (
    <div className="min-h-screen flex bg-white items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-12 mt-16">
          <h1 className="text-3xl font-semibold text-text-primary font-playfair">
            SIGN IN TO YOUR ACCOUNT
          </h1>
        </div>

        <div className="space-y-4 mb-16">
          <Button
            onClick={handleGoogleSignIn}
            disabled={!providersStatus.google || isLoading}
            variant="outline"
            size="lg"
            className={`w-full h-12 border-2 rounded-none font-medium tracking-wide ${
              providersStatus.google && !isLoading
                ? "border-text-primary hover:bg-bg-secondary bg-white text-text-primary"
                : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FcGoogle className="w-5 h-5 mr-3" />
            {!providersStatus.google && !isLoading
              ? "GOOGLE (NOT CONFIGURED)"
              : "CONTINUE WITH GOOGLE"}
          </Button>
          <div className="text-center text-text-primary  ">OR</div>

          <Button
            onClick={handleGithubSignIn}
            disabled={!providersStatus.github || isLoading}
            variant="outline"
            size="lg"
            className={`w-full h-12 border-2 rounded-none font-medium tracking-wide ${
              providersStatus.github && !isLoading
                ? "border-text-primary hover:bg-bg-secondary bg-white text-text-primary"
                : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaGithub className="w-5 h-5 mr-3" />
            {!providersStatus.github && !isLoading
              ? "GITHUB (NOT CONFIGURED)"
              : "CONTINUE WITH GITHUB"}
          </Button>
        </div>

        <div className="text-center pt-24">
          <h3 className="text-lg font-semibold text-text-primary mb-8 tracking-wide">
            BECOME PART OF MY ROLLENREICH
          </h3>

          <div className="grid grid-cols-3 gap-12 text-text-primary">
            <div className="text-center">
              <h4 className="font-semibold mb-2 tracking-wide">
                ORDER TRACKING
              </h4>
              <p className="text-sm opacity-80">
                Track your orders in real-time
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-2 tracking-wide">
                FASTER ORDER PROCESS
              </h4>
              <p className="text-xs opacity-80">
                Save time for future purchases
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-2 tracking-wide">
                SCHEDULE A CONSULTATION
              </h4>
              <p className="text-xs opacity-80">
                Personalized advice and exclusive services
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
