# API Server BFF (Backend for Frontend)
##### Experience APIs (REST/HTTP) for supporting the State of Oregon Pandemic Unemployment Assistance clients

#### Getting Started:
* Install dependencies: `npm install`
* Start the server: `npm start` OR `make up`

#### Grant Admin Role By Email
* Run local script: `npm run grant:admin <email@domain.com>`
* Click email link in terminal/console to verify email address
* Reauthenticate into the client app

#### Generate JSON Schema
* Run local script: `npm run schema`
> This will generate a schema.json file from the interfaces directory

#### Load Test via Artillery
* Run local script: `npm run test:load`
