import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import * as dev from '../dev_environment'
import * as test_data from '../test_data_part31';

test.describe('Create Endpoint', () => {
    test.describe(' HTTP 201', () => {
        test('TC 30: Add products using proper JSON data',
            async ({ request }) => {

                let locationHeader
                const endpoint = `${dev.part3Endpoint}`
                for (let i = 0; i < test_data.testAddProducts.length; i++) {
                    const addProduct = test_data.testAddProducts[i]

                    const response = await request.post(endpoint,
                        {
                            headers: dev.security_headers_admin,
                            data: addProduct
                        })
                    const responseData = await response.json();
                    const products = responseData.data;

                    dev.divider()
                    console.log('Response Status:', response.status())
                    console.log('Response Status Text:', response.statusText())
                    console.log('\nResponse Body:', responseData)

                    // validate id, name, desc and price (non updating via search)
                    // expect.soft(products.productId).toEqual(test_data.seedData[i].productId)
                    expect.soft(products.name).toEqual(test_data.testAddProducts[i].name)

                    expect.soft(products.description).toEqual(test_data.testAddProducts[i].description)
                    expect.soft(products.price).toEqual(test_data.testAddProducts[i].price)

                    //validate HTTP response code and text and location header
                    expect.soft(response.status()).toEqual(201)
                    expect.soft(response.statusText()).toEqual("Created")


                    if (response.status() === 201) {
                        locationHeader = response.headers()['location'] || 'Not present';
                    }
                    expect.soft(locationHeader).toBe(`${dev.part3Endpoint}${products.productId}`)

                    //validate custom JSON response 
                    expect.soft(responseData.success).toEqual(true)
                    expect.soft(responseData.message).toEqual("Product created successfully")


                }

                // Wait for 5 seconds after the loop below is to clean up the entries added on the first part of the test 
                console.log('Waiting 5 seconds before continuing...');
                await new Promise(resolve => setTimeout(resolve, 2 * 1000));
                console.log('5 seconds have passed. Cleaning up data added by the test.');

                for (let i = 104; i < 120; i++) {
                    const addProduct = test_data.testAddProducts[i]

                    const response = await request.delete(`${dev.part3DeleteEndpoint}${i}`,
                        {
                            headers: dev.security_headers_admin,
                        })

                    const responseData = await response.json();
                    const products = responseData.data;

                    dev.divider()
                    console.log('Response Status:', response.status())
                    console.log('Response Status Text:', response.statusText())
                    console.log('\nResponse Body:', responseData)
                }
            });
    })

    test.describe(' HTTP 400', () => {
        const endpoint = `${dev.part3Endpoint}`

        test('TC 301: Validate name required field - empty name',
            async ({ request }) => {

                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.emptyName.data
                    })



                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Validation Error: The Name field is required.")



            });

        test('TC 302: Validate name length - less than 2 characters',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.nameTooShort.data
                    })



                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Validation Error: Name must be between 1 and 101 characters long")
            });

        test('TC 303: Validate name length - exceeds 100 characters',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.nameTooLong.data
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Validation Error: Name must be between 1 and 101 characters long")
            });

        test('TC 304: Validate description required field - empty description',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.emptyDescription.data
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('t:', test_data.validationTestData.nameTooLong.data)
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Validation Error: The Description field is required.")
            });

        test('TC 305: Validate description length - less than 2 characters',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.descriptionTooShort.data
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Validation Error: Description must be between 1 and 101 characters long")
            });

        test('TC 306: Validate description length - exceeds 100 characters',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.descriptionTooLong.data
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Validation Error: Description must be between 1 and 101 characters long")
            });

        test('TC 307: Validate price range - negative value',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.negativePrice.data
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Validation Error: Price must be between 0 and 999,999")
            });

        test('TC 308: Validate price range - exceeds 999,999',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.priceTooHigh.data
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Validation Error: Price must be between 0 and 999,999")
            });

        test('TC 309: Validate price format - unparsable string',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.unparsablePrice.data
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("'not-a-number' is not a valid amount")
            });

        test('TC 310: Validate price required field - missing price',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.missingPrice.data
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("'' is not a valid amount")
            });

        test('TC 311: Validate all fields - multiple validation failures',
            async ({ request }) => {
                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.validationTestData.allFieldsInvalid.data
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Validation Error: The Name field is required.; Description must be between 1 and 101 characters long; Price must be between 0 and 999,999")
            });

        test('TC 312: Validate response when JSON body is missing',
            async ({ request }) => {

                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(400)
                expect.soft(response.statusText()).toEqual("Bad Request")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Request body is empty")
            });


    })

    test.describe('HTTP 422', () => {

        const endpoint = `${dev.part3Endpoint}`

        test('TC 313: Validate response when JSON body is malformed',
            async ({ request }) => {

                const response = await request.post(endpoint,
                    {
                        headers: dev.security_headers_admin,
                        data: test_data.malformedJSON
                    })

                const responseData = await response.json();
                const products = responseData.data;

                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())
                console.log('\nResponse Body:', responseData)

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(422)
                expect.soft(response.statusText()).toEqual("Unprocessable Entity")

                //validate custom JSON response 
                expect.soft(responseData.success).toEqual(false)
                expect.soft(responseData.message).toEqual("Malformed JSON in request body")
            })

    })

})
