"use client";
import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
    products: Stripe.Product[];
}



export const ProductList = ({ products }: Props) =>  {
    const [SearchTerm, setSearchTerm] = useState<string>("");
    // Filter products based on search term
    const filteredProducts = products.filter((product) => {
        const term = SearchTerm.toLowerCase()
        const nameMatch = product.name.toLowerCase().includes(term)
        const descriptionMatch = product.description 
        ? product.description.toLowerCase().includes(term) 
        : false;

        return nameMatch || descriptionMatch;
    });

    return (
        <div>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={SearchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product, key) => (
                    <li key={key}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

