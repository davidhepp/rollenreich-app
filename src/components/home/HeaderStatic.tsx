import Link from "next/link";
import Navbundle from "./Navbundle";
import Image from "next/image";

interface HeaderStaticProps {
  onMenuToggle: () => void;
}

const HeaderStatic = ({ onMenuToggle }: HeaderStaticProps) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between py-8 sm:py-4 px-4 relative">
          {/* empty for balance */}
          <div className="flex-1"></div>

          <div className="absolute sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="text-2xl font-playfair tracking-tight">
              <Image
                src="/herotext.svg"
                alt="Rollenreich"
                width={150}
                height={150}
              />
            </Link>
          </div>

          <div className="flex-1 flex justify-end">
            <Navbundle onMenuToggle={onMenuToggle} />
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderStatic;
