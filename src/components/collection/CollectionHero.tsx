import Image from "next/image";

const CollectionHero = ({
  imageSrc,
  alt,
  name,
}: {
  imageSrc: string;
  alt: string;
  name: string;
}) => {
  return (
    <div className="relative w-full h-128 overflow-hidden">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="w-full h-full object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white text-center px-4">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default CollectionHero;
