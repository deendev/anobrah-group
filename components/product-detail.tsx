"use client";
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  product: Stripe.Product;
}

export const ProductDetails = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <Card className="flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-8 rounded-2xl shadow-xl border border-gray-100">
        {product.images && product.images[0] && (
          <div className="relative h-64 md:h-96 w-full md:w-1/2 rounded-xl overflow-hidden ">
            <Image
              alt={product.name}
              src={product.images[0]}
              fill
              objectFit="contain"
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <CardHeader className="p-0 mb-2 md:mb-4">
            <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {product.description && (
              <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                {product.description}
              </p>
            )}
            {price && price.unit_amount && (
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                ₦{((price.unit_amount ?? 0) / 100).toFixed(2)}
              </p>
            )}

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => removeItem(product.id)}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full text-lg"
              >
                -
              </Button>
              <span className="text-lg font-bold w-6 md:w-8 text-center">{quantity}</span>
              <Button
                className="bg-black text-white w-8 h-8 md:w-10 md:h-10 rounded-full text-lg"
                onClick={onAddItem}
              >
                +
              </Button>
            </div>
            <Button className="mt-4 md:mt-6 w-full py-4 md:py-6 text-base md:text-lg bg-black text-white hover:bg-gray-800">
              Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};