"use client";
import React, { useState } from "react";
import Abomodell from "@/components/subscription/model";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function SubscriptionPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="bg-white min-h-screen py-16 px-4 md:px-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Subscriptions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Subscriptions</h1>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat odio,
          expedita neque ipsum pariatur suscipit!
        </p>
        <div className="inline-flex border rounded-none overflow-hidden">
          <button
            onClick={() => setYearly(false)}
            className={`px-4 py-2 text-sm ${
              !yearly ? "bg-btn-primary text-white" : "bg-white text-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`px-4 py-2 text-sm ${
              yearly ? "bg-btn-primary text-white" : "bg-white text-gray-700"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <Abomodell
          title="Basic"
          price={yearly ? 90 : 9}
          features={[
            "Monthly Fresh Products",
            "Guranted Toiletpaper every Month",
            "Two Premium papers",
          ]}
          billingCycle={yearly ? "Yearly" : "Monthly"}
        />
        <Abomodell
          title="Premium"
          price={yearly ? 90 : 9}
          features={[
            "Monthly fresh premium paper",
            "Get every Drops special paper",
            "Also Benefit from special Subscription only Drops",
          ]}
          billingCycle={yearly ? "Yearly" : "Monthly"}
        />
      </div>
    </div>
  );
}
