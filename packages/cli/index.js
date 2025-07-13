#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// === Get CLI arguments ===
const args = process.argv.slice(2)
const projectName = args[0] || '.'

// Extract --template value (e.g. --template tictactoe)
const templateFlag = args.find(arg => arg.startsWith('--template'))
const templateName = templateFlag ? templateFlag.split('=')[1] : 'default'

// === Resolve template path ===
const templatesDir = path.join(__dirname, 'templates')
const selectedTemplateDir = path.join(templatesDir, templateName)
const fallbackTemplateDir = path.join(templatesDir, 'default')

// Fallback to default if not found
const templateDir = fs.existsSync(selectedTemplateDir)
  ? selectedTemplateDir
  : fallbackTemplateDir

// === Create project folder ===
const projectPath = path.resolve(process.cwd(), projectName)
if (!fs.existsSync(projectPath)) {
  fs.mkdirSync(projectPath, { recursive: true })
  console.log(`📁 Created folder: ${projectName}`)
}

// === npm init ===
console.log('🧩 Initializing package.json...')
execSync('npm init -y', { cwd: projectPath, stdio: 'inherit' })

// === Patch package.json ===
const pkgPath = path.join(projectPath, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

pkg.type = 'module'
pkg.scripts = { start: 'npx serve .' }
pkg.dependencies = { pulsekit: '^0.0.2' }

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
console.log('📦 Updated package.json')

// === Copy template files ===
const files = fs.readdirSync(templateDir)
for (const file of files) {
  const src = path.join(templateDir, file)
  const dest = path.join(projectPath, file)
  fs.copyFileSync(src, dest)
}
console.log(`📄 Copied template: ${path.basename(templateDir)}`)

// === Install dependencies ===
console.log('📦 Installing dependencies...')
execSync('npm install', { cwd: projectPath, stdio: 'inherit' })

// === Done ===
console.log(`\n✅ Pulse app created in '${projectName}'!`)
console.log(`\nNext steps:`)
console.log(`  cd ${projectName}`)
console.log(`  npm run start`)
