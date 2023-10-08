<h1 align="center">Welcome to bun-tips 👋</h1>
<p>
  A collection of simple tips for optimizing your experience with Bun. This repository encapsulates practical snippets, configurations, and insights to make your Bun projects more efficient and enjoyable.
</p>

[![IT Man - A Dive into Environment Variables, Debugging, and Workspaces with Bun [Vietnamese]](https://i.ytimg.com/vi/BxmuOe1eFOo/hqdefault.jpg)](https://www.youtube.com/watch?v=BxmuOe1eFOo)

## Table of Contents

- [Environment Variables](#environment-variables)
- [Debugging Bun](#debugging-bun)
- [Workspaces](#workspaces)

## Environment variables

### Automatic Loading of .env Files

Bun auto-loads the following `.env` files (in order of increasing precedence):

1. `.env`
2. `.env.production`, `.env.development`, `.env.test` (depending on `NODE_ENV` value)
3. `.env.local`

Example `.env` file:

```plaintext
PORT=3000
```

### Setting Environment Variables

- **Via Command Line:**
  ```bash
  PORT=3000 bun run dev
  ```

### Reading Environment Variables

Access current environment variables via `process.env` or `Bun.env`.

```javascript
process.env.API_TOKEN; // => "secret"
Bun.env.API_TOKEN; // => "secret"
```

To print all set environment variables to the command line, run `bun run env`.

### Environment Variable Expansion

Construct compound values by referencing previously-defined variables.

```plaintext
.env
PORT=3000
SERVER_URL=http://localhost:${PORT}
```

Disable expansion by escaping the `$` with a backslash.

### TypeScript Support

Utilize interface merging for autocompletion and non-optional string treatment.

```typescript
declare module "bun" {
  interface Env {
    PORT: number;
    SERVER_URL: string;
  }
}
```

Add the above line to any file in your project for global augmentation of `process.env` and `Bun.env`.

## Debugging Bun

Debugging in Bun is facilitated through the WebKit Inspector Protocol. Use the `--inspect` flag when running your Bun code to enable debugging. This section provides a step-by-step guide on how to debug Bun effectively using the web debugger and other tools.

### Enabling Debugging

1. **Flag Usage:**
   Run your Bun file with the `--inspect` flag to start the debugging session.

   ```bash
   bun --inspect server.ts
   ```

2. **Web Debugger:**
   Navigate to [debug.bun.sh](https://debug.bun.sh) to access Bun's web-based debugger, which is a modified version of WebKit's Web Inspector Interface.

### Debugging Session

1. **Setting Breakpoints:**
   Within the Sources tab of the debugger, set breakpoints by clicking on the desired line number.

2. **Inspecting Variables:**
   Inspect the local variables, control program execution, and run arbitrary code in the console at the breakpoint.

3. **Control Flow:**
   Utilize control flow buttons to step over, step into, or continue script execution.

4. **Viewing Logs:**
   Console logs and errors will be displayed in the Console tab, aiding in identifying issues.

## Workspaces

Bun facilitates monorepo management through the `workspaces` feature in `package.json`. This feature eases the development of complex software by organizing it into multiple independent packages within a single repository (monorepo).

A typical monorepo structure looks like this:

```plaintext
<root>
├── README.md
├── bun.lockb
├── server.ts
├── package.json
├── tsconfig.json
└── packages
    ├── logger
    │   ├── index.ts
    │   ├── package.json
    │   └── tsconfig.json
    ├── db
    │   ├── index.ts
    │   ├── package.json
    │   └── tsconfig.json
    └── mailer
        ├── index.ts
        ├── package.json
        └── tsconfig.json
```

In the root `package.json`, the `workspaces` key specifies the subdirectories to be treated as packages or workspaces within the monorepo. Conventionally, all workspaces are housed in a directory named `packages`.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "workspaces": ["packages/*"],
  "devDependencies": {
    "@productsway/logger": "workspace:*",
    "@productsway/db": "workspace:*",
    "@productsway/mailer": "workspace:*"
  }
}
```

### Features

- **Glob Support:**
  Bun accommodates simple `<directory>/*` globs in `workspaces`. However, the full glob syntax (e.g., `**` and `?`) is not supported at the moment.

- **Versioning:**
  Utilize `workspace:*` in the `dependencies` section of your `package.json` when referencing other packages within the monorepo.

```json
{
  "name": "@productsway/mailer",
  "version": "1.0.0",
  "dependencies": {
    "@productsway/db": "workspace:*"
  }
}
```

### Benefits

1. **Modular Code Organization:**
   Split code into logical parts. For dependencies within the monorepo, simply add them as dependencies in `package.json`. For instance, if package `mailer` depends on package `db`, `bun install` will link to your local `packages/db` directory instead of fetching it from the npm registry.

2. **Dependency De-duplication:**
   Common dependencies between `mailer` and `db` are hoisted to the root `node_modules` directory, reducing disk usage and mitigating dependency conflicts.

3. **⚡️ Speedy Installs:**
   Enjoy fast installations, even for large monorepos. Check out [benchmark](https://github.com/oven-sh/bun/tree/main/bench/install) for a detailed benchmarking report.

## 📚 Resources

- [Environment variables – Runtime | Bun Docs](https://bun.sh/docs/runtime/env)
- [Debugging Bun with the web debugger | Bun Examples](https://bun.sh/guides/runtime/web-debugger)
- [Workspaces – Package manager | Bun Docs](https://bun.sh/docs/install/workspaces)
- [Performance Best Practices Using Express in Production](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)
- [Working on Multiple Web Projects with Docker Compose and Traefik | gpk blog](https://georgek.github.io/blog/posts/multiple-web-projects-traefik/)

## Author

👤 **Huynh Duc Dung**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## 🙏 Show Your Support

If you found this project helpful, consider giving it a ⭐️!

[![kofi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/dunghd)
[![paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/dunghd)
[![buymeacoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/dunghd)

