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
    <main className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
      <div className="max-w-7xl mx-auto">
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
            Say goodbye to paper shortages and awkward moments. Our Basic plan
            delivers two rolls of cloud-soft toilet paper every month—perfect
            for life’s little emergencies. Upgrade to Premium for extra-fluffy
            sheets, exclusive Drop designs, and VIP “on-the-roll” perks that
            banish every crappy surprise.
          </p>
          <div className="inline-flex border rounded-none overflow-hidden">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 text-sm cursor-pointer ${
                !yearly ? "bg-btn-primary text-white" : "bg-white text-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 text-sm cursor-pointer ${
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
            price={yearly ? 49.99 : 4.99}
            features={[
              "Monthly replenishment so you’re never caught flat-handed",
              "Soft, responsibly sourced paper—kind to you and the planet",
              "Discreet doorstep delivery straight to your powder room",
              "Earn “Roll Rewards” points toward free single rolls",
            ]}
            billingCycle={yearly ? "Yearly" : "Monthly"}
          />
          <Abomodell
            title="Premium"
            price={yearly ? 99.99 : 9.99}
            features={[
              "Indulgent triple-ply luxury for a truly royal flush",
              "Priority access to limited-edition patterns and scents",
              "Quarterly curated “Luxury Roll” sampler packs",
              "White-glove scheduling around your personal routine",
              "Extended-length rolls: fewer box changes, more peace of mind",
            ]}
            billingCycle={yearly ? "Yearly" : "Monthly"}
          />
        </div>
      </div>
    </main>
  );
}
