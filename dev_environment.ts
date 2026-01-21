export const baseURL = 'http://localhost:5220'
export const part2BaseURL = 'http://localhost:8090'
export const part3BaseURL = 'http://10.0.0.200:8090'

export const divider = () => console.log(`\n${'-'.repeat(100)}`)

export const updateUsingIdEndpointUrl = '/account/update/id/'
export const deleteUsingIdEndpointUrl = '/account/delete/id/'

export const part3Endpoint = `${part3BaseURL}/api/products/`
export const part3DeleteEndpoint = `${part3BaseURL}/api/delete/`

export const random_sys_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFkbWluIiwic3ViIjoiQWRtaW4iLCJqdGkiOiIxODkxOTQ0OCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjUxOTciLCJodHRwczovL2xvY2FsaG9zdDo3MDQ3Il0sIm5iZiI6MTc2ODk0ODI2MywiZXhwIjoxNzc2NzI0MjYzLCJpYXQiOjE3Njg5NDgyNjMsImlzcyI6ImRvdG5ldC11c2VyLWp3dHMifQ.XdefSVK6dRLer8nD9i0gVf8dqbqcpLCw6jWpJ7sWpvU'

export const security_headers = {
     'Authorization': `Bearer ${random_sys_token}`,
}