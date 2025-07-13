import { createApp, h, hString } from 'pulse'

const state = {
  todos: [],
  input: '',
}

const reducers = {
  add(state) {
    const input = state.input.trim()
    if (!input) return state
    return {
      ...state,
      todos: [...state.todos, { text: input, done: false }],
      input: '',
    }
  },
  remove(state, index) {
    const todos = [...state.todos]
    todos.splice(index, 1)
    return { ...state, todos }
  },
  toggle(state, index) {
    const todos = [...state.todos]
    todos[index].done = !todos[index].done
    return { ...state, todos }
  },
  updateInput(state, value) {
    return { ...state, input: value }
  },
}

function View(state, emit) {
  return h('div', {
    class: `
      min-h-screen p-4
      flex items-center justify-center
      bg-gradient-to-br from-indigo-50 to-purple-100
    `
  }, [
    h('div', {
      class: `
        w-full max-w-md p-6 space-y-6
        bg-white rounded-2xl border border-indigo-100
        shadow-2xl
      `
    }, [
      Header(),
      TodoForm(state, emit),
      TodoList(state, emit)
    ])
  ])
}

function Header() {
  return h('h1', {
    class: `
      text-3xl font-extrabold text-center
      text-indigo-600 tracking-tight
    `
  }, ['Todos'])
}

function TodoForm(state, emit) {
  return h('form', {
    class: 'flex gap-3',
    on: {
      submit(e) {
        e.preventDefault()
        emit('add')
      }
    }
  }, [
    h('input', {
      class: `
        flex-1 px-4 py-2 text-sm rounded-xl
        border border-gray-300 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-indigo-400
        transition
      `,
      type: 'text',
      placeholder: 'Add a task...',
      value: state.input,
      on: {
        input(e) {
          emit('updateInput', e.target.value)
        }
      }
    }),
    h('button', {
      type: 'submit',
      class: `
        px-4 py-2 font-medium text-white
        bg-indigo-500 hover:bg-indigo-600
        rounded-xl transition shadow
      `
    }, ['Add'])
  ])
}

function TodoList(state, emit) {
  const hasTodos = state.todos.length > 0

  if (!hasTodos) {
    return h('p', {
      class: 'text-center text-sm text-gray-400 italic mt-2'
    }, ['Nothing here yet. Add something!'])
  }

  return h('div', {
    class: 'space-y-3'
  }, state.todos.map((todo, index) => TodoItem(todo, index, emit)))
}

function TodoItem(todo, index, emit) {
  return h('div', {
    class: `
      flex items-center justify-between
      px-4 py-2 bg-gray-50 border border-gray-200
      rounded-lg shadow-sm hover:shadow-md
      transition
    `
  }, [
    h('div', { class: 'flex items-center gap-3' }, [
      h('input', {
        type: 'checkbox',
        checked: todo.done,
        class: 'h-4 w-4 text-indigo-500 rounded focus:ring-indigo-400',
        on: { change: () => emit('toggle', index) }
      }),
      h('span', {
        class: `
          text-sm
          ${todo.done ? 'line-through text-gray-400' : 'text-gray-800'}
        `
      }, [todo.text])
    ]),
    h('button', {
      class: 'text-xs text-red-500 hover:underline font-medium',
      on: { click: () => emit('remove', index) }
    }, ['Delete'])
  ])
}

createApp({ state, view: View, reducers }).mount(document.getElementById('app'))
