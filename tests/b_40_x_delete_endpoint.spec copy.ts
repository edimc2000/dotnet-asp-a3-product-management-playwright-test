import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import * as dev from '../dev_environment'
import * as test_data from '../test_data_part31';

test.describe('Delete Endpoint', () => {
    const endpoint = `${dev.part3Endpoint}`
    test.describe('HTTP 200', () => {
        test('TC 40: Delete a valid product',
            async ({ request }) => {
                const endpoint = `${dev.part3Endpoint}`
                for (let i = 0; i < test_data.testAddProducts.length - 13; i++) {
                    const addProduct = test_data.testAddProducts[i]

                    const response = await request.post(endpoint,
                        {
                            headers: dev.security_headers,
                            data: addProduct
                        })
                    const responseData = await response.json();
                    const products = responseData.data;
                }

                // Wait for 5 seconds after the loop below is to clean up the entries added on the first part of the test 
                console.log('Waiting 5 seconds before continuing...');
                await new Promise(resolve => setTimeout(resolve, 5 * 1000));
                console.log('5 seconds have passed. Cleaning up data added by the test.');

                for (let i = 104; i < 107; i++) {
                    const addProduct = test_data.testAddProducts[i]

                    const response = await request.delete(`${dev.part3DeleteEndpoint}${i}`,
                        {
                            headers: dev.security_headers,
                        })

                    const responseData = await response.json();
                    const products = responseData.data;

                    dev.divider()
                    console.log('Response Status:', response.status())
                    console.log('Response Status Text:', response.statusText())
                    console.log('\nResponse Body:', responseData)

                    //validate custom JSON response 
                    expect.soft(responseData.success).toEqual(true)
                    expect.soft(responseData.message).toEqual("Product deleted successfully")

                    //validate HTTP response code and text and location header
                    expect.soft(response.status()).toEqual(200)
                    expect.soft(response.statusText()).toEqual("OK")
                }
            });
    })

    test.describe(' HTTP 400', () => {
        test.only('TC 41: Delete using a non parsable input 201a',
            async ({ request }) => {

                const id = "201a"
                const response = await request.delete(`${dev.part3DeleteEndpoint}${id}`,
                    {
                        headers: dev.security_headers
                    })
                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)


                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual(`'${id}' is not a valid ProductId`)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual('Bad Request')
            });
    })

    test.describe('HTTP 404', () => {
        test.only('TC 42: Delete a non existent account (parsable number)',
            async ({ request }) => {
                const id = "2000"
                const response = await request.delete(`${dev.part3DeleteEndpoint}${id}`,
                    {
                        headers: dev.security_headers
                    })
                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual(`'${id}' is not a valid ProductId`)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(404)
                expect.soft(response.statusText()).toEqual('Not Found')

            })
    })

        test.describe('HTTP 403', () => {
        test.only('TC 43: Delete a non existent account (parsable number)',
            async ({ request }) => {
                const id = "101" //restricted id on the code
                const response = await request.delete(`${dev.part3DeleteEndpoint}${id}`,
                    {
                        headers: dev.security_headers
                    })
                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual(`ProductId '${id}' is restricted and cannot be deleted`)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(403)
                expect.soft(response.statusText()).toEqual('Forbidden')

            })
    })

})
