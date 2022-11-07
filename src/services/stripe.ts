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
                price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price.unit_amount / 100),
            };
        });
        return products;
    }

    async getProductById(id: string) {
        const product = await stripe.products.retrieve(id, {
            expand: ["default_price"],
        });

        const price = product.default_price as Stripe.Price;
        return {

            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            url: product.url,
            price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price.unit_amount / 100),
            description: product.description,
            defaultPriceId: price.id,

        }

    }

    async getCheckoutSession(id: string) {
        const session = await stripe.checkout.sessions.retrieve(id, {
            expand: ['line_items', 'line_items.data.price.product']
        });
        console.log({ session })
        const costumerName = session.customer_details.name;
        const product = session.line_items.data[0].price.product as Stripe.Product;

        return {
            costumerName,
            product: {
                name: product.name,
                imageUrl: product.images[0],
            }
        }
    }
}

export const stripeClient = new StripeClient();