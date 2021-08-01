import type {AWS} from '@serverless/typescript';
import * as dotenv from 'dotenv';
import {hello, getProductsList, getProductsById, postProducts} from '@functions/index';

dotenv.config({path: __dirname + '/.env'});

const serverlessConfiguration: AWS = {
    service: 'product-service',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    resources: {
        Resources: {
            onlyBodyValidator: {
                Type: 'AWS::ApiGateway::RequestValidator',
                Properties: {
                    Name: 'only-body-validator',
                    RestApiId: {
                        Ref: 'ApiGatewayRestApi'
                    },
                    ValidateRequestBody: true,
                    ValidateRequestParameters: false,
                }
            },
            emptyValidator: {
                Type: 'AWS::ApiGateway::RequestValidator',
                Properties: {
                    Name: 'empty-validator',
                    RestApiId: {
                        Ref: 'ApiGatewayRestApi'
                    },
                    ValidateRequestBody: false,
                    ValidateRequestParameters: false,
                }
            }
        }
    },
    useDotenv: true,
    plugins: ['serverless-webpack', 'serverless-reqvalidator-plugin', 'serverless-aws-documentation'],
    provider: {
        name: 'aws',
        runtime: 'nodejs12.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            PG_HOST: process.env.PG_HOST,
            PG_PORT: process.env.PG_PORT,
            PG_DATABASE: process.env.PG_DATABASE,
            PG_USERNAME: process.env.PG_USERNAME,
            PG_PASSWORD: process.env.PG_PASSWORD,
        },
        lambdaHashingVersion: '20201221',
        stage: 'dev',
        region: 'eu-west-1',
    },
    // import the function via paths
    functions: {hello, getProductsList, getProductsById, postProducts},
};

module.exports = serverlessConfiguration;
