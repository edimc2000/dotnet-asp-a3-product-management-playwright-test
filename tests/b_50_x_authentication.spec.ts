import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse, AccountResponse } from './ApiInterfaces';
import * as dev from '../dev_environment'
import * as test_data from '../test_data_part31';

test.describe('Delete Endpoint', () => {
    const endpoint = `${dev.part3Endpoint}`
    test.describe('HTTP 401', () => {
        test('TC 50: Register without token for authentication',
            async ({ request }) => {
                const response = await request.post(`${endpoint}`)
                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(401)
                expect.soft(response.statusText()).toEqual('Unauthorized')
            });

        test('TC 51: Search all, without token for authentication',
            async ({ request }) => {
                const response = await request.get(`${endpoint}`)
                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(401)
                expect.soft(response.statusText()).toEqual('Unauthorized')
            });

        test('TC 51: Search by id, without token for authentication',
            async ({ request }) => {
                const id = "201"
                const response = await request.get(`${endpoint}${id}`)
                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(401)
                expect.soft(response.statusText()).toEqual('Unauthorized')
            });

        test('TC 52: Delete without token for authentication',
            async ({ request }) => {
                const id = "201"
                const response = await request.delete(`${dev.part3DeleteEndpoint}${id}`)
                dev.divider()
                console.log('Response Status:', response.status())
                console.log('Response Status Text:', response.statusText())

                //validate HTTP response code and text and location header
                expect.soft(response.status()).toEqual(401)
                expect.soft(response.statusText()).toEqual('Unauthorized')
            });
    })


})
