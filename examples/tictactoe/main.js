import { createApp, h } from 'pulse'
import { makeInitialState, markReducer } from './game.js'

function View(state, emit) {
  return h('div', {
    class: `
      min-h-screen flex items-center justify-center bg-gradient-to-tr
      from-indigo-400 via-purple-400 to-pink-400 px-6 py-10
    `
  }, [
    h('div', {
      class: `
        backdrop-blur-md bg-white/20 border border-white/30 text-white
        rounded-3xl p-8 w-full max-w-md shadow-2xl
        flex flex-col items-center space-y-6
      `
    }, [
      GameHeader(state),
      GameBoard(state, emit),
      PlayAgainButton(state, emit)
    ])
  ])
}

function GameHeader(state) {
  const base = 'text-2xl font-bold text-center drop-shadow'
  if (state.winner) {
    return h('h3', {
      class: `${base} text-green-300 animate-pulse`
    }, [`🎉 Player ${state.winner} wins!`])
  }
  if (state.draw) {
    return h('h3', {
      class: `${base} text-orange-300`
    }, [`🤝 It's a draw!`])
  }
  return h('h3', {
    class: `${base} text-white`
  }, [`🎮 It's ${state.player}'s turn`])
}

function GameBoard(state, emit) {
  const frozen = state.winner || state.draw

  return h('div', {
    class: `
      grid grid-cols-3 gap-2 w-full aspect-square max-w-xs
      ${frozen ? 'pointer-events-none opacity-70' : ''}
    `
  }, state.board.flatMap((row, i) =>
    row.map((cell, j) => GameCell({ cell, i, j }, emit))
  ))
}

function GameCell({ cell, i, j }, emit) {
  const base = `
    w-full aspect-square text-center
    rounded-xl text-4xl font-extrabold font-mono
    border border-white/30
    flex items-center justify-center
    transition duration-200
  `

  if (cell) {
    return h('div', {
      class: `${base} bg-white/10 text-white select-none`
    }, [cell])
  }

  return h('button', {
    class: `
      ${base} bg-white/20 hover:bg-white/30
      active:scale-95 focus:outline-none
    `,
    on: { click: () => emit('mark', { row: i, col: j }) }
  }, [])
}

function PlayAgainButton(state, emit) {
  const isGameOver = state.winner || state.draw
  const label = isGameOver ? 'Play Again' : 'Restart'

  return h('button', {
    class: `
      mt-4 px-4 py-2 bg-white/10 hover:bg-white/20
      text-white rounded-lg text-sm tracking-wide
      transition duration-150 ease-in-out
    `,
    on: { click: () => emit('restart') }
  }, [label])
}

createApp({
  state: makeInitialState(),
  view: View,
  reducers: {
    mark: markReducer,
    restart: () => makeInitialState()
  }
}).mount(document.getElementById('app'))
