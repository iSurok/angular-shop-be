import 'source-map-support/register';

import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';

// @ts-ignore
import products from '../../data/products-data.json';

// @ts-ignore
const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        const {productId = ''} = event.pathParameters;
        const product = products.find(product => product.id === productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return formatJSONResponse(
            product
        );
    } catch (e) {
        return formatJSONResponse(
            {
                error: e.toString(),
            }
        );
    }

};

export const main = middyfy(getProductsById);
