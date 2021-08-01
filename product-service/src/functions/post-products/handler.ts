import 'source-map-support/register';
import {formatJSONResponse, ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {Pool} from 'pg';
import schema from '@functions/post-products/schema';

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

const postProducts: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    console.log(event);
    let newProductId = null;
    try {
        const productData = event.body;
        const pool = new Pool(dbOptions);
        if (!productData || !productData.title || !productData.price || !productData.count) {
            return formatJSONResponse(
                {
                    error: 'Product data is invalid'
                },
                400
            );
        }
        ;(async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                const query = 'INSERT INTO products(title, description, price, logo) VALUES($1, $2, $3, $4) RETURNING id';
                const values = [
                    productData.title,
                    productData.description ? productData.description : '',
                    productData.price ? productData.price : 0,
                    productData.logo ? productData.logo : ''
                ];
                const res = await client.query(query, values);
                const insertStock = 'INSERT INTO stocks(product_id, count) VALUES ($1, $2)';
                newProductId = res.rows[0].id;
                const insertStockValues = [newProductId, productData.count ? productData.count : 0];
                await client.query(insertStock, insertStockValues);
                await client.query('COMMIT');
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch(e => {
            pool.end();
            console.log(e.stack);
            return formatJSONResponse(
                {
                    error: e.toString(),
                },
                500
            );
        });
        await pool.end();
        return formatJSONResponse(
            {
                success: !!newProductId,
                id: newProductId,
            }
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

export const main = middyfy(postProducts);
