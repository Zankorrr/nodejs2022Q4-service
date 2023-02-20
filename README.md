# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Zankorrr/nodejs2022Q4-service.git
git checkout postgres
cd nodejs2022Q4-service
```

## Installing NPM modules

```
npm install
```

## .ENV

```
rename .env.example to .env
```

## Postgres

```
Please start your local postgresql, db in docker container doesn`t work :(
```

## Migration

```
npx prisma migrate dev --name init
npx prisma generate
```

## Running application

```
npm start
```

or

```
docker-compose up   // will throw an error - please comment out the 'my-postgres'
                    // code block in docker-conpose.yml and work with local postrges db
```

## Vulnerabilities scanning
### You must be loggined on Docker Hub!

```
npm run scan
```

## Testing

After application running open new terminal and enter:

<!-- To run all tests without authorization -->

```
npm run test
```

## Swagger


After starting the app on port (4000 as default) you can open in your browser [OpenAPI documentation](http://localhost:4000/doc/).


<!-- To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
``` -->
<!-- 
### Auto-fix and format

```
npm run lint
```

```
npm run format
``` -->

<!-- ### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging -->
