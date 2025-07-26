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
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </div>
    </div>
  );
}
