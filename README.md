## Description

Microservice boilerplate based on [NestJS v9](https://github.com/nestjs/nest), built with TypeScript.
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This project cover both, running on a containerized environment using Docker, or on your local machine.

[Guidelines](docs/guidelines.md#guidelines)

### Local Environment
This section will cover the steps to follow for a local version of this project.

### Prerequisites
* A running Mysql Server. Reffer to [official documentation](https://dev.mysql.com/doc/refman/5.7/en/) for intructions.
* A running Node Server. Reffer to [official documentation](https://nodejs.org/en/download/) for intructions.
* [npm](https://www.npmjs.com)

### Installation

```bash
$ npm install
```

### Database setup
* using TypeORM CLI. Reffer to [migration documentation](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#migrations) for intructions.

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Built With

* [Docker](https://docs.docker.com/) - Containerization technology
* [npm](https://www.npmjs.com) - Dependency Management
* [Nest](https://github.com/nestjs/nest)

## Future Goals

Add tests;

## Contributing

You are welcome to contribute to this project, just open a PR.

## License

 [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
