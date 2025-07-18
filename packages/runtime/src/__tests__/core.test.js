import { describe, it, expect, vi } from 'vitest'
import { h, hString, hFragment } from '../h.js'
import { Dispatcher } from '../dispatcher.js'

describe('h/hString/hFragment', () => {
  it('creates a basic element vnode', () => {
    const vnode = h('div', { id: 'test' }, ['hello'])
    expect(vnode.type).toBe('element')
    expect(vnode.tag).toBe('div')
    expect(vnode.props.id).toBe('test')
    expect(vnode.children[0].type).toBe('text')
  })

  it('wraps strings into hString', () => {
    const vnode = hString('hi')
    expect(vnode).toEqual({ type: 'text', value: 'hi' })
  })

  it('creates a fragment with children', () => {
    const frag = hFragment(['one', 'two'])
    expect(frag.type).toBe('fragment')
    expect(frag.children).toHaveLength(2)
    expect(frag.children[0].type).toBe('text')
  })
})

describe('Dispatcher', () => {
  it('calls subscribers on dispatch', () => {
    const d = new Dispatcher()
    const spy = vi.fn()
    d.subscribe('ping', spy)
    d.dispatch('ping', 123)
    expect(spy).toHaveBeenCalledWith(123)
  })

  it('calls afterEveryCommand handlers', () => {
    const d = new Dispatcher()
    const after = vi.fn()
    d.afterEveryCommand(after)
    d.dispatch('anything')
    expect(after).toHaveBeenCalled()
  })
})
