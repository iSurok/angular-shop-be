import 'source-map-support/register';

import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';

// @ts-ignore
import products from '../../data/products-data.json';

// @ts-ignore
const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        return formatJSONResponse(
            products
        );
    } catch (e) {
        return formatJSONResponse(
            {
                error: e.toString(),
            }
        );
    }
};

export const main = middyfy(getProductsList);
