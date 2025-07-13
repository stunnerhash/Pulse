#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get target directory
const projectName = process.argv[2] || '.'
const projectPath = path.resolve(process.cwd(), projectName)

// Step 0: Create folder and move into it
if (!fs.existsSync(projectPath)) {
  fs.mkdirSync(projectPath, { recursive: true })
  console.log(`📁 Created folder: ${projectName}`)
}
process.chdir(projectPath)

// Step 1: npm init
console.log('🧩 Initializing package.json...')
execSync('npm init -y', { stdio: 'inherit' })

// Step 2: Patch package.json
const pkgPath = path.join(projectPath, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

pkg.type = 'module'
pkg.scripts = { start: 'npx serve .' }
pkg.dependencies = { pulsekit: '^0.0.2' }

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
console.log('📦 Updated package.json')

// Step 3: Create index.html
fs.writeFileSync(
  'index.html',
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Pulse App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="importmap">
      {
        "imports": {
          "pulse": "/node_modules/pulsekit/dist/pulse.js"
        }
      }
    </script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: '#6366f1',
              accent: '#e11d48',
              glass: 'rgba(255, 255, 255, 0.15)',
            },
          },
        },
      };
    </script>
  </head>
  <body>
    <!-- App mounts here -->
    <div id="app"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>`
)

// Step 4: Create main.js
fs.writeFileSync(
  'main.js',
  `import { createApp, h, hString, hFragment } from 'pulse'

const state = { count: 0 }

const reducers = {
  add: (state) => ({ count: state.count + 1 }),
  sub: (state) => ({ count: state.count - 1 }),
}

function View(state, emit) {
  return hFragment([
    h('div', {
      class:
        'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col justify-center items-center text-gray-100 font-sans w-full',
    }, [
      h('div', {
        class: 'flex-grow flex items-center justify-center w-full px-4',
      }, [
        h('div', {
          class: 'backdrop-blur-md bg-glass border border-white/20 shadow-xl rounded-3xl p-10 w-full max-w-md text-center',
        }, [
          h('h1', { class: 'text-4xl font-bold mb-6' }, [hString('Pulse Counter')]),

          h('div', { class: 'flex justify-center items-center gap-8 mb-6' }, [
            h('button', {
              class: 'bg-white/20 border border-white/30 w-14 h-14 text-3xl rounded-full hover:bg-white/30 transition-all active:scale-90',
              on: { click: () => emit('sub') },
            }, [hString('−')]),

            h('span', {
                class: 'text-5xl font-extrabold ' + (state.count < 0 ? 'text-accent' : 'text-white')
            }, [hString(state.count)]),

            h('button', {
              class: 'bg-white/20 border border-white/30 w-14 h-14 text-3xl rounded-full hover:bg-white/30 transition-all active:scale-90',
              on: { click: () => emit('add') },
            }, [hString('+')]),
          ]),

          h('p', { class: 'text-sm text-white/70' }, [hString('Try clicking the buttons!')]),
        ]),
      ]),

      h('footer', {
        class: 'text-center text-white/70 text-sm py-6',
      }, [
        hString('Made with '),
        h('strong', { class: 'text-white' }, [hString('Pulse')]),
        hString(' — '),
        h('a', {
          href: 'https://github.com/stunnerhash/pulse',
          class: 'underline hover:text-white',
          target: '_blank',
        }, [hString('GitHub')]),
        hString(' | '),
        h('a', {
          href: 'https://www.npmjs.com/package/pulsekit',
          class: 'underline hover:text-white',
          target: '_blank',
        }, [hString('NPM')]),
      ]),
    ]),
  ])
}

createApp({ state, view: View, reducers }).mount(document.getElementById('app'))`
)

// Step 5: Install dependencies
console.log('📦 Installing dependencies...')
execSync('npm install', { stdio: 'inherit' })

// Step 6: Auto run server
console.log(`\n✅ Puse app created in '${projectName}'!`) 
execSync('npm run start', { stdio: 'inherit' })
