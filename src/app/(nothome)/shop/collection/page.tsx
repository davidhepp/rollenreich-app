import React from "react";
import CollectionPage from "@/components/collection/CollectionPage";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ProductCard from "@/components/cards/ProductCard";

const CollectionPageView = () => {
    return(
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
                            <BreadcrumbPage>Collection</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
        <CollectionPage
            name="Lorem Ipsum"
            motivation="Tralalero Trala"
            description="Tricolore Bella Italia"
            imageSrc="/specials/test.png"
            />
                <section className="mt-16">
                    <h3 className="text-xl font-semibold mb-6"></h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProductCard
                    name="Lorem Ipsum"
                    price="00"
                    imageSrc="/products/standard.png"
                />
                <ProductCard
                    name="Lorem Ipsum"
                    price="00"
                    imageSrc="/products/standard_black.png"
                />
                <ProductCard
                    name="Lorem Ipsum"
                    price="00"
                    imageSrc="/products/standard_green.png"
                />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default CollectionPageView;