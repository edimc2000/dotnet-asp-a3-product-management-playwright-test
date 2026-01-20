import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import * as dev from '../dev_environment'
import * as test_data3 from '../test_data_part3';

test.describe('Search all Endpoint HTTP 200', () => {
    test('TC 10: Retrieve all products (using seed data)',
        async ({ request }) => {
            //this should run before any creation - validating 3 records from seed 
            const endpoint = `${dev.searchAllPart3Endpoint}`

            const response = await request.get(endpoint)
            const responseData: test_data3.ProductResponsePart3 = await response.json();
            const products = responseData.data;

            dev.divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('\nResponse Body:', responseData)

            //validate entry count - 3 seed products
            expect.soft(products.length).toEqual(test_data3.seedData.length)

            // expect.soft(products.length).toEqual(3) 
            expect.soft(products).toEqual(test_data3.seedData)
        });
})

test.describe('Search all Endpoint HTTP 405', () => {
    test.only('TC 11: Validate response for unsupported method PUT',
        async ({ request }) => {
            //this should run before any creation - validating 3 records from seed 
            const endpoint = `${dev.searchAllPart3Endpoint}`

            const response = await request.put(endpoint)

            dev.divider()
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())

            //validate HTTP response code 405 
            expect.soft(response.status()).toEqual(405)
            expect.soft(response.statusText()).toEqual("Method Not Allowed")
        });
})