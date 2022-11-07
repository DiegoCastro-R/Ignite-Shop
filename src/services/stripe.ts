import Stripe from 'stripe';
import { stripe } from '../lib/stripe'

export class StripeClient {
    async getProducts() {
        const response = await stripe.products.list({
            expand: ["data.default_price"],
        });

        const products = response.data.map((product) => {
            const price = product.default_price as Stripe.Price;

            return {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                url: product.url,
                price: price.unit_amount / 100,
            };
        });
        return products;
    }
}

export const stripeClient = new StripeClient();