# Grapesjs fork

## Setup

```shell
$ pnpm install
```

## Publish

First time :
```shell
$ npm run build:cli
```

Upgrade the version in [packages/core/package.json](./packages/core/package.json) as follows :
```
"version": "x.xx.xx"
```

Then publish with :
```shell
$ npm run publish:core:latest
```