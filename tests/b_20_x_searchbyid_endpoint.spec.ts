import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import * as dev from '../dev_environment'
import * as test_data from '../test_data_part3';

test.describe('Search by productId Endpoint', () => {

    test.describe('HTTP 200', () => {
        test('TC 20: Search using valid productIds from seed data',
            async ({ request }) => {
                //this should run before any creation - validating 3 records from seed 
                for (let i = 0; i < test_data.seedData.length; i++) {
                    const productId = test_data.seedData[i].productId
                    const endpoint = `${dev.part3Endpoint}${productId}`
                    const response = await request.get(`${endpoint}`,
                        { headers: dev.security_headers, })
                    const responseData: test_data.ProductResponsePart3 = await response.json();
                    const products = responseData.data;

                    dev.divider()
                    console.log('Response Status:', response.status())
                    console.log('Response Status Text:', response.statusText())
                    console.log('\nResponse Body:', responseData)

                    // validate id, name, desc and price (non updating via search)
                    expect.soft(products[0].productId).toEqual(test_data.seedData[i].productId)
                    expect.soft(products[0].name).toEqual(test_data.seedData[i].name)
                    expect.soft(products[0].description).toEqual(test_data.seedData[i].description)
                    expect.soft(products[0].price).toEqual(test_data.seedData[i].price)

                    //validate HTTP response code and text 
                    expect.soft(response.status()).toEqual(200)
                    expect.soft(response.statusText()).toEqual("OK")

                    //validate custom JSON response 
                    expect.soft(responseData.success).toEqual(true)
                    expect.soft(responseData.message).toEqual("Product retrieved successfully")
                }
            });
    })

    test.describe('HTTP 400', () => {
        test('TC 21x: Validate response for an unparsable productID',
            async ({ request }) => {
                //this should run before any creation - validating 3 records from seed 
                const productId = '20111a'
                const endpoint = `${dev.part3Endpoint}${productId}`
                const response = await request.get(`${endpoint}`,
                    { headers: dev.security_headers, })
                const responseData: test_data.ProductResponsePart3 = await response.json();
                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())

                //validate HTTP response code and text 
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual(`'${productId}' is not a valid ProductId`)
            });
    })

    test.describe('HTTP 401', () => {
        test('TC 21x: Validate response if there is no authentication on the header',
            async ({ request }) => {
                //this should run before any creation - validating 3 records from seed 
                const productId = '20111'
                const endpoint = `${dev.part3Endpoint}${productId}`

                const response = await request.get(`${endpoint}`)
                // const responseData: test_data.ProductResponsePart3 = await response.json();
                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())

                //validate HTTP response code and text 
                expect.soft(response.status()).toEqual(401)
                expect.soft(response.statusText()).toEqual("Unauthorized")


            });
    })


    test.describe('HTTP 404', () => {
        test('TC 21x: Validate response for non existent productID',
            async ({ request }) => {
                //this should run before any creation - validating 3 records from seed 
                const productId = '20111'
                const endpoint = `${dev.part3Endpoint}${productId}`

                const response = await request.get(`${endpoint}`,
                    { headers: dev.security_headers, })
                const responseData: test_data.ProductResponsePart3 = await response.json();
                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())

                //validate HTTP response code 405 
                expect.soft(response.status()).toEqual(404)
                expect.soft(response.statusText()).toEqual("Not Found")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual(`ProductId '${productId}' was not found.`)
            });
    })


    test.describe('HTTP 405', () => {
        test('TC 2xx: Validate response for unsupported method PUT',
            async ({ request }) => {
                //this should run before any creation - validating 3 records from seed 
                const productId = 201
                const endpoint = `${dev.part3Endpoint}${productId}`

                const response = await request.put(`${endpoint}`,
                    { headers: dev.security_headers, })

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())

                //validate HTTP response code 405 
                expect.soft(response.status()).toEqual(405)
                expect.soft(response.statusText()).toEqual("Method Not Allowed")
            });
    })
})

