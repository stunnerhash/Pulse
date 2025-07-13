# ⚡️ Pulse

> A tiny frontend framework for modern web apps — simple, hackable, and built with performance in mind.

Welcome to the monorepo for **Pulse**, a minimal JavaScript frontend framework and its supporting tools.

---

## 🌟 Features

- 🚀 Lightweight and fast
- 🎨 CDN-based TailwindCSS support by default
- ⚙️ Instant project setup with `create-pulse`
- 🛠️ No bundlers — just native ESM and import maps
- 💡 Inspired by modern libraries like React, Preact, and Solid

---

## 📁 Structure

This monorepo is organized as follows:

| Folder         | Description                                     |
|----------------|-------------------------------------------------|
| `packages/pulsekit` | The core Pulse framework (`pulsekit`)          |
| `packages/cli`      | CLI tool (`create-pulse`) to create new projects |
| `examples/`         | Example apps built with Pulse                   |

---

## 🚦 Getting Started

You can create a new project using the CLI:

```bash
npx create-pulse my-app
cd my-app
npm run start
