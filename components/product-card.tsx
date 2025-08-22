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
      className="block h-full transform transition-transform duration-300 hover:-translate-y-1 md:hover:-translate-y-2 max-w-sm mx-auto"
    >
      <Card className="group h-full flex flex-col  rounded-xl transition-shadow duration-300 hover:shadow-2xl border border-gray-200">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              alt={product.name}
              src={product.images[0]}
              fill
              objectFit="contain"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-col p-4 flex-grow">
          <CardHeader className="p-0 mb-1">
            <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">
              {product.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-grow flex flex-col justify-between">
            {product.description && (
              <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                {product.description}
              </p>
            )}

            <div className="mt-auto">
              {price && price.unit_amount && (
                <p className="text-xl font-extrabold text-gray-900">
                  ₦{(price.unit_amount / 100).toFixed(2)}
                </p>
              )}
            </div>

            <Button className="mt-2 w-full bg-black text-white hover:bg-gray-800 transform transition-transform duration-300 hover:scale-105">
              View Details
            </Button>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};