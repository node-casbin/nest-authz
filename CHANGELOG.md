# [2.2.0](https://github.com/dreamdevil00/nest-authz/compare/v2.1.0...v2.2.0) (2021-08-13)


### Bug Fixes

* fix compile error ([a1cf723](https://github.com/dreamdevil00/nest-authz/commit/a1cf723c34522441bc7f6baf395eb044ac356c09))
* **deps:** update dependency casbin to v5.6.0 ([fe4c881](https://github.com/dreamdevil00/nest-authz/commit/fe4c881b1ff8e7fd91d6f935e45f59f14400f949))
* **deps:** update dependency casbin to v5.8.0 ([59d038f](https://github.com/dreamdevil00/nest-authz/commit/59d038f9cc477a5115fc623dfc908c6ee5c1bb1a))


### Features

* add support for custom action verb ([9d7c7ed](https://github.com/dreamdevil00/nest-authz/commit/9d7c7edd9f9812b19627db6f957a8cdf2f2e5fe6))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/dreamdevil00/nest-authz/compare/v2.0.0...v2.1.0) (2021-03-20)


### Features

* **authz-management.service:** add more  management methods ([6411a44](https://github.com/dreamdevil00/nest-authz/commit/6411a4467fbe6747f481e541ff42c7af0edb2cfb))


### Bug Fixes

* **deps:** update dependency casbin to v5 ([#95](https://github.com/dreamdevil00/nest-authz/issues/95)) ([d8a83fd](https://github.com/dreamdevil00/nest-authz/commit/d8a83fd1a1fbaef340a90f82940697d2bdc1a80e))

## [2.0.0](https://github.com/dreamdevil00/nest-authz/compare/v1.1.0...v2.0.0) (2020-05-17)


### ⚠ BREAKING CHANGES

* drop support for node v8. Required Nodejs>= 10.13.0 as nestjs v7
upgrade casbin to v4 making  apis async.

### Features

* **services:** add casbin apis since v2 ([340a60c](https://github.com/dreamdevil00/nest-authz/commit/340a60c68e0e4e84888ad9a9f97a88d81ff29709))


### Bug Fixes

* **deps:** update dependency @nestjs/swagger to v4.1.12 ([eb27853](https://github.com/dreamdevil00/nest-authz/commit/eb278538fe99f3b629d8110650f454d4be629917))
* **deps:** update dependency @nestjs/swagger to v4.1.13 ([866ab7f](https://github.com/dreamdevil00/nest-authz/commit/866ab7f86df295f4fdbd5fb1f7bc083f052314c2))
* **deps:** update dependency @nestjs/swagger to v4.1.14 ([a00b4f9](https://github.com/dreamdevil00/nest-authz/commit/a00b4f99f99b4de9b11e134999240571fb63cc06))
* **deps:** update dependency @nestjs/swagger to v4.1.14 ([#54](https://github.com/dreamdevil00/nest-authz/issues/54)) ([a7f164b](https://github.com/dreamdevil00/nest-authz/commit/a7f164b32ebc9a1a6c65de075f98569f2ac1a09b))
* **deps:** update dependency @nestjs/swagger to v4.1.15 ([ae38445](https://github.com/dreamdevil00/nest-authz/commit/ae3844587be7404a5fdf9b4774bf89705d4aaac8))
* **deps:** update dependency @nestjs/swagger to v4.2.1 ([624a318](https://github.com/dreamdevil00/nest-authz/commit/624a318d5a989d3e41fc416d73ff1d5cfa8964e1))
* **deps:** update dependency @nestjs/swagger to v4.2.1 ([#60](https://github.com/dreamdevil00/nest-authz/issues/60)) ([4a3789e](https://github.com/dreamdevil00/nest-authz/commit/4a3789e62453270f861a3dae9ee1823fc718aad1))
* **deps:** update dependency @nestjs/swagger to v4.3.1 ([8926983](https://github.com/dreamdevil00/nest-authz/commit/892698313493bb6c5ef04a95e755b08862e7333f))
* **deps:** update dependency swagger-ui-express to v4.1.3 ([08a9bdc](https://github.com/dreamdevil00/nest-authz/commit/08a9bdc6b7d6a2e937b138e19b56bea1a53d4af0))
* **deps:** update dependency swagger-ui-express to v4.1.3 ([#55](https://github.com/dreamdevil00/nest-authz/issues/55)) ([e8529e6](https://github.com/dreamdevil00/nest-authz/commit/e8529e60b563c1b84154fd3651ffdfe12b3473cf))
* **deps:** update dependency uuid to v3.4.0 ([f3aeb12](https://github.com/dreamdevil00/nest-authz/commit/f3aeb124c7dab1ea79325955a97158dcf19796a1))


### build

* update dependencies ([1c06e17](https://github.com/dreamdevil00/nest-authz/commit/1c06e17c0af92270ed1e8e1f11c562185f6a6835))

## [1.1.0](https://github.com/dreamdevil00/nest-authz/compare/v1.0.0...v1.1.0) (2020-01-03)


### Features

* add module options to allow dynamic configure enforcer ([#42](https://github.com/dreamdevil00/nest-authz/issues/42)) ([d03472f](https://github.com/dreamdevil00/nest-authz/commit/d03472f83a5d223e6b441c4a69c766c454395e73))
* **options:** add module options ([765df74](https://github.com/dreamdevil00/nest-authz/commit/765df745646fc25f4984808e513df16b8cf70893))


### Bug Fixes

* **deps:** pin dependencies ([07f5668](https://github.com/dreamdevil00/nest-authz/commit/07f56681555d2c082ab669b89ec611fa841bbc82))
* **deps:** update dependency @nestjs/passport to v6.1.1 ([e48df14](https://github.com/dreamdevil00/nest-authz/commit/e48df141a6a8214d0d7509dc23363891ad1384a3))
* **deps:** update dependency @nestjs/passport to v6.1.1 ([#21](https://github.com/dreamdevil00/nest-authz/issues/21)) ([df4ee95](https://github.com/dreamdevil00/nest-authz/commit/df4ee952c2ca418bb9dccc067801bb6ca13e0692))
* **deps:** update dependency @nestjs/swagger to v4 ([f91ce80](https://github.com/dreamdevil00/nest-authz/commit/f91ce8063cd786f0054e9f0ff6c11fdf2a4ed866))
* **deps:** update dependency @nestjs/swagger to v4.1.2 ([05d18aa](https://github.com/dreamdevil00/nest-authz/commit/05d18aa4786e82adf92a165a269c2ac8ad90c102))
* **deps:** update dependency @nestjs/swagger to v4.1.2 ([#26](https://github.com/dreamdevil00/nest-authz/issues/26)) ([b16ab8d](https://github.com/dreamdevil00/nest-authz/commit/b16ab8d10753f1f0cf871e0f34a52ff2b02bba8d))
* **deps:** update dependency class-validator to v0.11.0 ([7fe2dac](https://github.com/dreamdevil00/nest-authz/commit/7fe2dacc43847708403da2733dcb563866ce2cfe))
* **deps:** update dependency class-validator to v0.11.0 ([#5](https://github.com/dreamdevil00/nest-authz/issues/5)) ([c91051c](https://github.com/dreamdevil00/nest-authz/commit/c91051cc324fb426959afcfce82905102ea2b81b))
* **deps:** update dependency dotenv to v8 ([d0fa313](https://github.com/dreamdevil00/nest-authz/commit/d0fa3137f8db1cf4ad4af734d91a4c594452789f))
* **deps:** update dependency dotenv to v8 ([#14](https://github.com/dreamdevil00/nest-authz/issues/14)) ([8b777b9](https://github.com/dreamdevil00/nest-authz/commit/8b777b9ca056d538671a922f386e7ce54fe3ea32))
* **deps:** update dependency passport to v0.4.1 ([fb57896](https://github.com/dreamdevil00/nest-authz/commit/fb57896338ef430d1dfb0429eeb07438cfb7fb5d))
* **deps:** update dependency passport to v0.4.1 ([#30](https://github.com/dreamdevil00/nest-authz/issues/30)) ([6239013](https://github.com/dreamdevil00/nest-authz/commit/623901321bdb6c65a5dd3d20104c68ce669389f1))

# [1.0.0](https://github.com/dreamdevil00/nest-authz/compare/v0.1.0...v1.0.0) (2019-04-27)


### Code Refactoring

* refactor `isOwn` to accept ExecutionContext ([e757472](https://github.com/dreamdevil00/nest-authz/commit/e757472))


### Features

* **example:** add example to show usage ([0d573b8](https://github.com/dreamdevil00/nest-authz/commit/0d573b8))
* **module options:** add `usernameFromContext` ([48fd26c](https://github.com/dreamdevil00/nest-authz/commit/48fd26c))


### BREAKING CHANGES

* isOwn now accepts ExecutionContext as the only arg



# [1.0.0](https://github.com/dreamdevil00/nest-authz/compare/v0.1.0...v1.0.0) (2019-04-27)


### Code Refactoring

* refactor `isOwn` to accept ExecutionContext ([e757472](https://github.com/dreamdevil00/nest-authz/commit/e757472))


### Features

* **example:** add example to show usage ([0d573b8](https://github.com/dreamdevil00/nest-authz/commit/0d573b8))
* **module options:** add `usernameFromContext` ([48fd26c](https://github.com/dreamdevil00/nest-authz/commit/48fd26c))


### BREAKING CHANGES

* isOwn now accepts ExecutionContext as the only arg
