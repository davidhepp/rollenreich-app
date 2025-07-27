import { Separator } from "@/components/ui/separator";

interface ShippingInfoCardProps {
  className?: string;
}

export default function ShippingInfoCard({
  className = "",
}: ShippingInfoCardProps) {
  return (
    <div
      className={`w-full border bg-bg-primary p-6 flex flex-col justify-center ${className}`}
    >
      <div className="font-bold text-lg mb-2">Shipping and Return</div>
      <Separator className="my-4" />
      <div className="text-base">
        Once you hit &quot;buy,&quot; we roll your order out faster than you can
        say &quot;number two.&quot; Standard shipping takes{" "}
        <b>2–5 business days</b>, depending on how urgent your bathroom
        situation is. Every order is carefully packed (no squished rolls, we
        promise) and shipped in <b>eco-friendly, discreet packaging</b> —{" "}
        because your bathroom business is nobody else&apos;s.
        <br />
        <br />
        Not feeling the softness or color you picked? No problem! If your rolls
        didn&apos;t meet your expectations, you can return them (unused, of
        course — let&apos;s keep it hygienic) within <b>30 days</b> for a full
        refund. Just reach out, and we&apos;ll handle it smoother than our
        4-ply.
      </div>
    </div>
  );
}
