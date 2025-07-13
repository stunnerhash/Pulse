import { createApp, h, hString, hFragment } from 'pulse'

const state = { count: 0 }

const reducers = {
  add: (state) => ({ count: state.count + 1 }),
  sub: (state) => ({ count: state.count - 1 }),
}

function View(state, emit) {
  return Layout(
    CounterCard(state, emit),
    Footer()
  )
}

function Layout(mainContent, footer) {
  return h('div', {
    class: `
      min-h-screen w-full font-sans text-gray-100
      bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
      flex flex-col
    `
  }, [
    h('div', {
      class: 'flex-grow flex items-center justify-center w-full px-4'
    }, [mainContent]),

    footer
  ])
}

function CounterCard(state, emit) {
  return h('div', {
    class: `
      backdrop-blur-md bg-glass border border-white/20 shadow-xl
      rounded-3xl p-10 w-full max-w-md text-center
    `
  }, [
    h('h1', { class: 'text-4xl font-bold mb-6' }, [hString('Pulse Counter')]),

    h('div', { class: 'flex justify-center items-center gap-8 mb-6' }, [
      Button('−', () => emit('sub')),
      CountDisplay(state.count),
      Button('+', () => emit('add'))
    ]),

    h('p', { class: 'text-sm text-white/70' }, [hString('Try clicking the buttons!')])
  ])
}

function CountDisplay(value) {
  const color = value < 0 ? 'text-accent' : 'text-white'
  return h('span', {
    class: `text-5xl font-extrabold ${color}`
  }, [hString(value)])
}

function Button(label, onClick) {
  return h('button', {
    class: `
      bg-white/20 border border-white/30 w-14 h-14 text-3xl rounded-full
      hover:bg-white/30 transition-all active:scale-90
    `,
    on: { click: onClick }
  }, [hString(label)])
}

function Footer() {
  return h('footer', {
    class: 'text-center text-white/70 text-sm py-6'
  }, [
    hString('Made with '),
    h('strong', { class: 'text-white' }, [hString('Pulse')]),
    hString(' — '),
    Link('GitHub', 'https://github.com/stunnerhash/pulse'),
    hString(' | '),
    Link('NPM', 'https://www.npmjs.com/package/pulsekit')
  ])
}

function Link(text, href) {
  return h('a', {
    href,
    class: 'underline hover:text-white',
    target: '_blank'
  }, [hString(text)])
}

createApp({ state, view: View, reducers }).mount(document.getElementById('app'))
