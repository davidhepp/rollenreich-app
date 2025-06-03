"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  //test
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/" });
  };

  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Continue with email:", email);
  };

  return (
    <div className="min-h-screen flex bg-white items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-12 mt-24">
          <h1 className="text-3xl font-semibold text-text-primary font-playfair">
            YOUR ACCOUNT
          </h1>
        </div>

        <div className="space-y-4 mb-8">
          <Button
            disabled={true}
            onClick={handleGoogleSignIn}
            variant="outline"
            size="lg"
            className="w-full h-12 border-2 border-text-primary hover:bg-bg-secondary bg-white rounded-none text-text-primary font-medium tracking-wide"
          >
            <FcGoogle className="w-5 h-5 mr-3" />
            CONTINUE WITH GOOGLE
          </Button>

          <Button
            onClick={handleGithubSignIn}
            variant="outline"
            size="lg"
            className="w-full h-12 border-2 border-text-primary hover:bg-bg-secondary bg-white rounded-none text-text-primary font-medium tracking-wide"
          >
            <FaGithub className="w-5 h-5 mr-3" />
            CONTINUE WITH GITHUB
          </Button>
        </div>

        <div className="text-center mb-8">
          <span className="text-text-primary font-medium tracking-wide">
            OR
          </span>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-text-primary text-center mb-6 tracking-wide">
            CONTINUE WITH E-MAIL
          </h2>

          <p className="text-sm text-text-primary text-center mb-8 leading-relaxed">
            Sign in with your email address and password or create an account if
            you are new.
          </p>

          <form onSubmit={handleEmailContinue} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="E-MAIL*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border-2 border-text-primary rounded-none bg-transparent placeholder:text-text-primary/60 placeholder:font-medium placeholder:tracking-wide focus:border-btn-primary"
                required
              />
            </div>

            <Button
              disabled={true}
              type="submit"
              className="w-full h-12 bg-btn-primary hover:bg-btn-primary/90 text-white font-medium tracking-wider rounded-none"
            >
              CONTINUE
            </Button>
          </form>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium text-text-primary mb-8 tracking-wide">
            BECOME PART OF MY ROLLENREICH
          </h3>

          <div className="grid grid-cols-3 gap-12 text-text-primary">
            <div className="text-center">
              <h4 className="font-medium mb-2 tracking-wide">ORDER TRACKING</h4>
              <p className="text-sm opacity-80">
                Track your orders in real-time
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-medium mb-2 tracking-wide">
                FASTER ORDER PROCESS
              </h4>
              <p className="text-xs opacity-80">
                Save time for future purchases
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-medium mb-2 tracking-wide">
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
