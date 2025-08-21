import Link from "next/link";
import Stripe from "stripe";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="block transform transition-transform duration-300 hover:-translate-y-2 max-w-md mx-auto"
    >
      <Card className="group h-full flex flex-col overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl border border-gray-200">
        {product.images && product.images[0] && (
          <div className="relative h-70 w-full  overflow-hidden">
            <Image
              alt={product.name}
              src={product.images[0]}
              fill
              objectFit="contain"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-col p-6 flex-grow">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">
              {product.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-grow flex flex-col justify-between">
            {product.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {product.description}
              </p>
            )}

            <div className="mt-auto">
              {price && price.unit_amount && (
                <p className="text-2xl font-extrabold text-gray-900">
                  ₦{(price.unit_amount / 100).toFixed(2)}
                </p>
              )}
            </div>

            <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800 transform transition-transform duration-300 hover:scale-105">
              View Details
            </Button>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};