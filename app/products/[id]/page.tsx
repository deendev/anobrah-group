import { ProductDetails } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";

export default async function ProductPage({
    params,
}: {
    params: {id: string}
}) {
    const product = await stripe.products.retrieve(params.id, {
        expand: ["default_price"],
    })

    const plainProduct = JSON.parse(JSON.stringify(product));
    // This is a placeholder for the product details component
    return <ProductDetails product={plainProduct} />;
}