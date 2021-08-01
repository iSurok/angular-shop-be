import 'source-map-support/register';
import {formatJSONResponse, ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {Client} from 'pg';
import schema from '@functions/get-products-list/schema';

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

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    console.log(event);
    try {
        const client = new Client(dbOptions);
        await client.connect();
        const {rows: products} = await client.query(`select p.*, s.count from products p inner join stocks s on s.product_id = p.id`);
        await client.end();
        return formatJSONResponse(
            products
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

export const main = middyfy(getProductsList);
