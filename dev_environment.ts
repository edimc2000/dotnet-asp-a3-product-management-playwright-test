export const baseURL = 'http://localhost:5220'
export const part2BaseURL = 'http://localhost:8090'
export const part3BaseURL = 'http://10.0.0.200:8090'

export const divider = () => console.log(`\n${'-'.repeat(100)}`)

export const updateUsingIdEndpointUrl = '/account/update/id/'
export const deleteUsingIdEndpointUrl = '/account/delete/id/'

export const part3Endpoint = `${part3BaseURL}/api/products/`
export const part3DeleteEndpoint = `${part3BaseURL}/api/delete/`

//update this
export const token_admin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsInVzZXJJZCI6IjEiLCJqdGkiOiIzYjA0MTAzZS0zZGE1LTQ5M2YtOGYzZC04YzEyODVjYTcyY2QiLCJpYXQiOjE3NjkwNTQ5OTgsImV4cCI6MTc2OTA2MjE5OCwiaXNzIjoibWluaW1hbC1hcGkiLCJhdWQiOiJhcGktdXNlcnMifQ.yxugJp-QeLtERcUXSW9bZeKoGp82uuqnHRlAxtJOQD8'

export const security_headers_admin = {
     'Authorization': `Bearer ${token_admin}`,
}

//update this
export const token_user = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJ1c2VySWQiOiIyIiwianRpIjoiMDYzOTBhMGYtNTE2Ny00ODE5LTgzZDEtYTdjNWNiOTIwZDlmIiwiaWF0IjoxNzY5MDU1NTMwLCJleHAiOjE3NjkwNjI3MzAsImlzcyI6Im1pbmltYWwtYXBpIiwiYXVkIjoiYXBpLXVzZXJzIn0.FXrIQwnjwWpkp29GjDSBKrTzUrpHErZgERV3KhF_2Sk'

export const security_headers_user = {
     'Authorization': `Bearer ${token_user}`,
}