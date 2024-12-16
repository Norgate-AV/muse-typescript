# muse-typescript

This is a test project to experiment using TypeScript with Muse.

## Installation

```bash
pnpm install
```

## Environment Setup

Create a `.env` file in the root of the project with the following content:

```bash
USER=your-username
HOST=your-host
```

This will be used to deploy the changes to the Muse processor.

## Build

The build is done with [tsup](https://tsup.egoist.dev/). It will generate a `dist` folder with the compiled JavaScript code in ES5 format.

On a successful build, the [deploy script](./scripts/deploy.sh) will be run automatically, deploying the changes to the Muse processor.

```bash
pnpm build
```

## Deploy

The deploy script uses `jq`. You can install it with `brew install jq`.

```bash
bash ./scripts/deploy.sh
```

## LICENSE :balance_scales:

[MIT](./LICENSE)

```

```
