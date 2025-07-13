import { createApp, h, hString, hFragment } from 'pulse'

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

createApp({ state, view: View, reducers }).mount(document.getElementById('app'))
