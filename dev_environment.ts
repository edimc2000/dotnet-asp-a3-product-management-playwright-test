export const baseURL = 'http://localhost:5220'
export const part2BaseURL = 'http://localhost:8090'
export const part3BaseURL = 'http://10.0.0.200:8090'

export const remote = 'http://10.0.0.215:8090'

export const divider = () => console.log(`\n${'-'.repeat(100)}`)

export const updateUsingIdEndpointUrl = '/account/update/id/'
export const deleteUsingIdEndpointUrl = '/account/delete/id/'

export const part3Endpoint = `${part3BaseURL}/api/products/`
export const part3DeleteEndpoint = part3Endpoint

//update this
export const token_admin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsInVzZXJJZCI6IjEiLCJqdGkiOiI1YjM1ZGFmOS1mNzA3LTQ5OTYtOTRkNC04OGVkMzIyMDJkOTQiLCJpYXQiOjE3NjkyMjA3NTUsImV4cCI6MTc2OTIyNzk1NSwiaXNzIjoibWluaW1hbC1hcGkiLCJhdWQiOiJhcGktdXNlcnMifQ.c513bSp1SuKg_8Qu2FBm7uvCgHfQkezrO3j8YAJmBlU'

export const security_headers_admin = {
     'Authorization': `Bearer ${token_admin}`,
}

//update this
export const token_user = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJ1c2VySWQiOiIyIiwianRpIjoiZWZiMWUzMWEtMzU4Zi00ODQ1LTlmN2YtZGIzZTdlMzA3ODdlIiwiaWF0IjoxNzY5MjIwNzU1LCJleHAiOjE3NjkyMjc5NTUsImlzcyI6Im1pbmltYWwtYXBpIiwiYXVkIjoiYXBpLXVzZXJzIn0.XM39IB2uemVXGR75B0D8FuXreIRV8zzMl_k7p4ALRN4'

export const security_headers_user = {
     'Authorization': `Bearer ${token_user}`,
}