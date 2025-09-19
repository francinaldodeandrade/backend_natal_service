Cadastro de usuário: POST /api/clients/register

<!-- Login de usuário: POST /api/clients/login → retorna token JWT

CRUD de clientes protegido por token:

GET /api/clients

GET /api/clients/:id

PUT /api/clients/:id

DELETE /api/clients/:id -->

Vou criar uma versão automática do Postman para o seu projeto, que faz todo o fluxo CRUD de clientes sem precisar copiar IDs manualmente. O fluxo será:

Register User → cria o usuário/cliente.

Login User → salva automaticamente o token em {{token}}.

Create Client → cria um cliente adicional e salva o \_id em {{clientId}}.

Get All Clients → lista todos os clientes.

Get Client By ID → usa {{clientId}}.

Update Client → atualiza o cliente com {{clientId}}.

Delete Client → deleta o cliente com {{clientId}}.

📦 Coleção Postman JSON (Fluxo Automático)

Salve como ClientsAPI_Flow.postman_collection.json e importe no Postman:

---

{
"info": {
"name": "Clients API Flow",
"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
},
"item": [
{
"name": "Register User",
"request": {
"method": "POST",
"header": [{ "key": "Content-Type", "value": "application/json" }],
"body": {
"mode": "raw",
"raw": "{\n \"nome\": \"João Silva\",\n \"email\": \"joao@example.com\",\n \"senha\": \"123456\"\n}"
},
"url": { "raw": "http://localhost:3000/api/clients/register", "protocol": "http", "host": ["localhost"], "port": "3000", "path": ["api", "clients", "register"] }
}
},
{
"name": "Login User",
"request": {
"method": "POST",
"header": [{ "key": "Content-Type", "value": "application/json" }],
"body": {
"mode": "raw",
"raw": "{\n \"email\": \"joao@example.com\",\n \"senha\": \"123456\"\n}"
},
"url": { "raw": "http://localhost:3000/api/clients/login", "protocol": "http", "host": ["localhost"], "port": "3000", "path": ["api", "clients", "login"] }
},
"event": [
{
"listen": "test",
"script": {
"exec": [
"const jsonData = pm.response.json();",
"if(jsonData.token){",
" pm.environment.set('token', jsonData.token);",
"}"
],
"type": "text/javascript"
}
}
]
},
{
"name": "Create Client",
"request": {
"method": "POST",
"header": [
{ "key": "Authorization", "value": "Bearer {{token}}" },
{ "key": "Content-Type", "value": "application/json" }
],
"body": {
"mode": "raw",
"raw": "{\n \"nome\": \"Cliente Teste\",\n \"email\": \"cliente@example.com\",\n \"senha\": \"123456\"\n}"
},
"url": { "raw": "http://localhost:3000/api/clients/register", "protocol": "http", "host": ["localhost"], "port": "3000", "path": ["api", "clients", "register"] }
},
"event": [
{
"listen": "test",
"script": {
"exec": [
"const data = pm.response.json();",
"if(data.client && data.client._id){",
" pm.environment.set('clientId', data.client._id);",
"}"
],
"type": "text/javascript"
}
}
]
},
{
"name": "Get All Clients",
"request": {
"method": "GET",
"header": [{ "key": "Authorization", "value": "Bearer {{token}}" }],
"url": { "raw": "http://localhost:3000/api/clients", "protocol": "http", "host": ["localhost"], "port": "3000", "path": ["api", "clients"] }
}
},
{
"name": "Get Client By ID",
"request": {
"method": "GET",
"header": [{ "key": "Authorization", "value": "Bearer {{token}}" }],
"url": { "raw": "http://localhost:3000/api/clients/{{clientId}}", "protocol": "http", "host": ["localhost"], "port": "3000", "path": ["api", "clients", "{{clientId}}"] }
}
},
{
"name": "Update Client",
"request": {
"method": "PUT",
"header": [
{ "key": "Authorization", "value": "Bearer {{token}}" },
{ "key": "Content-Type", "value": "application/json" }
],
"body": {
"mode": "raw",
"raw": "{\n \"nome\": \"Cliente Atualizado\",\n \"email\": \"cliente2@example.com\"\n}"
},
"url": { "raw": "http://localhost:3000/api/clients/{{clientId}}", "protocol": "http", "host": ["localhost"], "port": "3000", "path": ["api", "clients", "{{clientId}}"] }
}
},
{
"name": "Delete Client",
"request": {
"method": "DELETE",
"header": [{ "key": "Authorization", "value": "Bearer {{token}}" }],
"url": { "raw": "http://localhost:3000/api/clients/{{clientId}}", "protocol": "http", "host": ["localhost"], "port": "3000", "path": ["api", "clients", "{{clientId}}"] }
}
}
],
"variable": [
{ "key": "token", "value": "" },
{ "key": "clientId", "value": "" }
]
}

📝 Como usar

Importe a coleção no Postman.

Execute em ordem:

Register User → cria o usuário.

Login User → salva automaticamente o token.

Create Client → salva \_id do cliente em {{clientId}}.

Get All Clients → lista todos os clientes.

Get Client By ID → pega o cliente criado.

Update Client → atualiza o cliente criado.

Delete Client → remove o cliente criado.
