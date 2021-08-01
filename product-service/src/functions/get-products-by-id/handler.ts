import 'source-map-support/register';
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {Client} from 'pg';
import schema from '@functions/get-products-by-id/schema';

const {PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD} = process.env;
const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 1000
};

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    console.log(event);
    try {
        const {productId = ''} = event.pathParameters;
        const client = new Client(dbOptions);
        await client.connect();
        const text = 'select p.*, s.count from products p inner join stocks s on s.product_id = p.id where p.id = $1';
        const values = [productId];
        const {rows: products} = await client.query(text, values);
        await client.end();
        if (products.length === 0) {
            throw new Error('Product not found');
        }

        const result = products.pop();
        console.log(result);

        return formatJSONResponse(
            result
        );
    } catch (e) {
        console.log(e);
        return formatJSONResponse(
            {
                error: e.toString(),
            },
            500
        );
    }

};

export const main = middyfy(getProductsById);
