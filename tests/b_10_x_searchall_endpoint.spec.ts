import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import * as dev from '../dev_environment'
import * as test_data from '../test_data_part3';

test.describe('Search all Endpoint', () => {
    test.describe(' HTTP 200', () => {
        test('TC 10: Retrieve all products (using seed data)',
            async ({ request }) => {
                //this should run before any creation - validating 3 records from seed 
                const endpoint = `${dev.part3Endpoint}`

                const response = await request.get(endpoint,
                    { headers: dev.security_headers, })
                const responseData: test_data.ProductResponsePart3 = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                // validate entry count - 3 seed products
                expect.soft(products.length).toEqual(test_data.seedData.length)

                // validate non updating data from seed, id, name, desc and price 
                for (let i = 0; i < test_data.seedData.length; i++) {
                    expect.soft(products[i].productId).toEqual(test_data.seedData[i].productId)
                    expect.soft(products[i].name).toEqual(test_data.seedData[i].name)
                    expect.soft(products[i].description).toEqual(test_data.seedData[i].description)
                    expect.soft(products[i].price).toEqual(test_data.seedData[i].price)
                }

                //validate HTTP response code and text 
                expect.soft(response.status()).toEqual(200)
                expect.soft(response.statusText()).toEqual("OK")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(true)
                expect.soft(responseData.message).toEqual("Total of 3 products retrieved successfully")
            });
    })

    test.describe('HTTP 405', () => {
        test('TC 11: Validate response for unsupported method PUT',
            async ({ request }) => {
                //this should run before any creation - validating 3 records from seed 
                const endpoint = `${dev.part3Endpoint}`

                const response = await request.put(endpoint)

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())

                //validate HTTP response code 405 
                expect.soft(response.status()).toEqual(405)
                expect.soft(response.statusText()).toEqual("Method Not Allowed")
            });
    })

})