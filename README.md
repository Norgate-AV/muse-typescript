# muse-typescript

This is a test project to experiment using TypeScript with Muse.

## Installation

```bash
pnpm install
```

## Environment Setup

Create a `.env` file in the root of the project with the following content:

```bash
USERNAME=your-username
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

## Available Linux Commands

1. `pwd`
2. `cd`
3. `grep`
4. `nano`
5. `cat`
6. `echo`
7. `wc`
8. `whoami`
9. `ttop`
10. `tmux` Breaks terminal session. Can't exit using regular tmux keybinds.
11. `ls` but must use `shell:ls` for it to work as you would expect.

It seems other commands can be run using `shell:exec`

```bash
shell:exec which scp
/usr/bin/scp
```

## Node.js

Version is `18.16.0`.
Located at `/usr/bin/node`.

## `os-release`

```bash
ID=elina
NAME="HARMANs Embedded Linux for Automotive"
VERSION="2.0.2015143A (dunfell)"
VERSION_ID=2.0.2015143a
PRETTY_NAME="HARMANs Embedded Linux for Automotive 2.0.2015143A (dunfell)"
```

## Other Useful Info

Python is located in `/opt/bin/python3.10`.

## License

[MIT](./LICENSE)

```

```
