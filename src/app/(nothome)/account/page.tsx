"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

interface UserData {
  user: {
    name: string;
    email: string;
    createdAt: string;
    accounts: Array<{
      provider: string;
      providerAccountId: string;
    }>;
  };
}

export default function AccountPage() {
  const { data: session } = useSession();
  const { data: userData, isLoading } = useQuery<UserData>({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
    enabled: !!session,
  });

  if (!session) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <Card className="rounded-none max-w-md w-full bg-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-center">Please Sign In</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    You need to be signed in to view your account information.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white rounded-none"
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !userData) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <Card className="rounded-none max-w-md w-full bg-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-center">Loading...</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Loading your account information...
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const user = userData.user;

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Account</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl space-y-6">
              <Card className="rounded-none bg-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name || "No name provided"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {user.email || "No email provided"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Account Provider:
                      </span>
                      <p className="text-sm text-gray-900 capitalize">
                        {user.accounts[0]?.provider || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Provider Account ID:
                      </span>
                      <p className="text-sm text-gray-900">
                        {user.accounts[0]?.providerAccountId || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Account Status:
                      </span>
                      <p className="text-sm text-green-600">Active</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Member Since:
                      </span>
                      <p className="text-sm text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-none bg-transparent shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>OAuth Authentication:</strong> Your account is
                      managed through your OAuth provider. To update your
                      profile information, please visit your provider&apos;s
                      account settings.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Profile Updates:
                      </span>
                      <p className="text-sm text-gray-600">
                        Managed by your {user.accounts[0]?.provider || "OAuth"}{" "}
                        provider
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Password:
                      </span>
                      <p className="text-sm text-gray-600">
                        Managed by your {user.accounts[0]?.provider || "OAuth"}{" "}
                        provider
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Two-Factor Authentication:
                      </span>
                      <p className="text-sm text-gray-600">
                        Configure in your{" "}
                        {user.accounts[0]?.provider || "OAuth"} provider
                        settings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
