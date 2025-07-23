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
        We roll out your order as smoothly as our toilet paper. Once your
        purchase is confirmed, we’ll dispatch your premium rolls faster than you
        can say “number two.” Standard shipping usually takes 2–5 business days,
        depending on your bathroom emergency level. All orders are lovingly
        packed (no crumpling, we promise) and shipped in discreet, eco-friendly
        packaging — because your business is nobody else’s. Whether you’re
        wiping tears of joy or… well, you know — we’ve got your rear covered.
        Sit tight, relief is on the way!
      </div>
    </div>
  );
}
