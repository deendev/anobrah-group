"use server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> =>{
    const itemsJson = formData.get("items") as string;
    const items = JSON.parse(itemsJson);
    const line_items = items.map((item: CartItem) => ({
        price_data: {
            currency: "NGN",
            product_data: {name: item.name},
            unit_amount: item.price,
        },
        quantity: item.quantity,
    }));


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
        // Add these two lines to collect shipping and phone details
        shipping_address_collection: {
            allowed_countries: ['NG'], // Specify the countries you ship to
        },
        phone_number_collection: {
            enabled: true,
        },
    });

    redirect(session.url!);
};