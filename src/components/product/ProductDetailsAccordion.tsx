import { Product } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductDetailsAccordionProps {
  product: Product & {
    collections?: Array<{
      collection: {
        description: string;
      };
    }>;
  };
  className?: string;
}

export default function ProductDetailsAccordion({
  product,
  className = "",
}: ProductDetailsAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={`w-full border bg-bg-primary ${className}`}
      defaultValue="item-2"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Detail</AccordionTrigger>
        <AccordionContent>{product?.description}</AccordionContent>
      </AccordionItem>

      {product.collections && product.collections.length > 0 && (
        <AccordionItem value="item-2">
          <AccordionTrigger>About The Collection</AccordionTrigger>
          <AccordionContent>
            {product.collections[0].collection.description}
          </AccordionContent>
        </AccordionItem>
      )}

      <AccordionItem value="item-3">
        <AccordionTrigger>Sustainability</AccordionTrigger>
        <AccordionContent>
          {product?.sustainabilityInfo
            ?.split("\\n\\n")
            .map((paragraph: string, index: number) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph.trim()}
              </p>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
