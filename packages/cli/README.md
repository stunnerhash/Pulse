# create-pulse

> ⚡️ Zero-config starter CLI for [Pulse](https://github.com/stunnerhash/pulse) apps

This CLI scaffolds a new frontend app using **Pulse**, a lightweight framework built for native ESM + web standards — no bundler or transpiler needed.

---

## 📦 Features

- 🧩 Zero-config setup with `npm init` and `pulsekit`
- 🎨 TailwindCSS via CDN
- 📁 Multiple starter templates
- 🧠 Written using native ESM modules
- 🚀 Works with `serve`, `vite preview`, etc.

---

## 📁 Usage

```sh
npx create-pulse my-app
cd my-app
npm run start
```

Starts a local dev server using [`serve`](https://www.npmjs.com/package/serve).

---

## 🎨 Templates

Use the `--template` flag to scaffold different app types:

```sh
npx create-pulse my-app --template=todos
```

### Available templates

| Template   | Description               |
|------------|----------------------------|
| `default`  | Classic counter app        |
| `counter`  | Classic counter app        |
| `todos`    | Clean interactive todo app |

If a template is not found, it falls back to the `default`.

---

## 🔗 Links

- GitHub: [stunnerhash/pulse](https://github.com/stunnerhash/pulse)
- NPM: [pulsekit](https://www.npmjs.com/package/pulsekit)

---

## 🛠 Local Development

To test the CLI locally during development:

```sh
cd packages/cli
npm link
```

Then anywhere on your system:

```sh
create-pulse my-app --template=counter
```
