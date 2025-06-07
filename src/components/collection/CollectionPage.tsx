"use client";

import React from "react";
import Image from "next/image";


interface CollectionPageProps {
    name: string;
    motivation: string;
    description: string;
    imageSrc: string;
}

const CollectionPage = ({
                            name,
                            motivation,
                            description,
                            imageSrc,
                        }: CollectionPageProps) => {
    return (
        <div className="min-h-screen bg-bg-primary">
            <div className="relative w-full h-96 overflow-hidden">

                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    className="w-full h-full object-cover"
                />




                <div className="max-w-4xl mx-auto -mt-8 mb-8">
                    <div className="bg-white rounded shadow p-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
                    </div>
                </div>


                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
                        {name}
                    </h1>
                </div>
            </div>


            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 break-words">
                        {motivation}
                    </p>

                    <p className="text-base md:text-lg text-gray-600 leading-relaxed break-words">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;

