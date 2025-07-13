# create-pulse

A simple CLI to spin up a new project using **Pulse** — a minimal, modern frontend framework built with native ESM and no bundlers.

## ⚡️ What It Does

- Sets up a new project with `pulsekit` pre-installed  
- Adds a `start` script using `serve`  
- Includes TailwindCSS via CDN  
- Provides a beautiful, ready-to-run counter app using Pulse  

## 🚀 Getting Started

```bash
npx create-pulse my-app
cd my-app
npm run start
```

Then visit `http://localhost:3000` to see your app.

## 📂 Project Structure

```
my-app/
├── index.html        # HTML with Tailwind and import map for Pulse
├── main.js           # Counter app using Pulse
├── package.json      # Includes pulsekit and serve
└── node_modules/
```

## 🔧 Scripts

```bash
npm run start
```

Starts the app using [`serve`](https://www.npmjs.com/package/serve).

## 💡 Requirements

- Node.js ≥ 18 (for native `importmap` support)
- No bundler, no build step — just modern browser + native ESM

## 🧠 About Pulse

Pulse is a tiny frontend framework designed for simplicity, modularity, and direct browser usage. Great for fast prototyping, hacking, and small web apps.

---

## 📦 Related Packages

- [`pulsekit`](https://www.npmjs.com/package/pulsekit) – The core frontend framework  
- [`create-pulse`](https://www.npmjs.com/package/create-pulse) – This CLI

## 🧪 License

MIT © [stunnerhash](https://github.com/stunnerhash)
