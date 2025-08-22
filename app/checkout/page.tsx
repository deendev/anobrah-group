"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import { ArrowRight, ShoppingCart, Minus, Plus } from "lucide-react";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <ShoppingCart className="w-24 h-24 text-gray-400 mb-6" />
        <h1 className="text-3xl font-extrabold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Looks like you haven't added anything yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen   py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
          Checkout
        </h1>
        <Card className="bg-white  rounded-xl shadow-lg border-none">
          <CardHeader className="border-b border-gray-200 dark:border-gray-500 p-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-6">
              {items.map((item) => (
                <li
                  key={item.id} // Use item.id as key for better performance and stability
                  className="flex items-center justify-between gap-4 pb-4 border-b border-gray-300 dark:border-gray-300 last:border-b-0 last:pb-0"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-lg truncate">
                      {item.name}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-600 mt-1">
                      ₦{((item.price * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full w-8 h-8 text-gray-600 dark:text-gray-400"
                      onClick={() => removeItem(item.id)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-lg font-bold px-2 w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full w-8 h-8 text-gray-600 dark:text-gray-400"
                      onClick={() => addItem({ ...item, quantity: 1 })}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-00 flex justify-between items-center text-xl font-extrabold">
              <span>Total:</span>
              <span>₦{(total / 100).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        <form action={checkoutAction} className="mt-8">
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-black text-white transition-colors duration-200 rounded-lg shadow-md flex items-center justify-center gap-2"
          >
            Proceed to Payment <ArrowRight className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
