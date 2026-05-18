# Grapesjs fork

## Setup

install [pnpm](https://pnpm.io/installation)

```shell
$ pnpm install
```

## Run & Publish

First time :

```shell
$ npm run build:cli
$ cd core
$ pnpm install
$ npm run start
```

Upgrade the version in [packages/core/package.json](./packages/core/package.json) as follows :

```
"version": "x.xx.xx"
```

Then publish with :

```shell
$ npm run publish:core:latest
```
