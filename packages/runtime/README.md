# Pulse

**Pulse** is a tiny frontend framework built from the ground up for modern UI development — like React, but smaller, simpler, and hackable. It runs directly in the browser using native ESM — no bundlers or compilers required.

---

## 🚀 Features

- ✅ Native ESM (no bundler needed)
- 🎯 Component-based architecture
- 🧠 Simple state + reducers system
- 💡 Works with plain JS + Tailwind CDN
- 🛠️ Designed to be hackable and minimal

---

## ⚡️ Zero Config Starter

The easiest way to start building with Pulse — no bundlers, no setup, just code:

```bash
npx create-pulse my-app
```

This scaffolds a ready-to-use project with:

- Tailwind via CDN  
- Import maps preconfigured  
- Native ESM out of the box  
- A functional counter app

---

## ✨ Advanced Usage

Want to manually set it up or integrate into your own project?

```bash
npm install pulsekit
```

Use it directly in the browser with an import map:

```html
<script type="importmap">
{
  "imports": {
    "pulse": "/node_modules/pulsekit/dist/pulse.js"
  }
}
</script>
```

Then import and render your app:

```js
import { createApp, h, hString, hFragment } from 'pulse'

const state = { count: 0 }
const reducers = {
  add: (state) => ({ count: state.count + 1 }),
  sub: (state) => ({ count: state.count - 1 }),
}

function View(state, emit) {
  return hFragment([
    h('h1', {}, [hString(`Count: ${state.count}`)]),
    h('button', { on: { click: () => emit('add') } }, [hString('+')]),
    h('button', { on: { click: () => emit('sub') } }, [hString('−')]),
  ])
}

createApp({ state, reducers, view: View }).mount(document.getElementById('app'))
```

---

## 📦 Package Info

- **Package:** [`pulsekit`](https://www.npmjs.com/package/pulsekit)
- **CLI Tool:** [`create-pulse`](https://www.npmjs.com/package/create-pulse)
- **GitHub:** [stunnerhash/pulse](https://github.com/stunnerhash/pulse)

---

## 🧠 Philosophy

Pulse is built for developers who love:

- Reading and understanding the source
- Hacking on small projects with no build steps
- Using modern browser features directly

If you enjoy learning how frameworks work under the hood, Pulse is for you.

---

## 📄 License

MIT © [stunnerhash](https://github.com/stunnerhash)
