import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges multiple class strings', () => {
    const result = cn('bg-red-500', 'text-white', 'font-bold')
    const classes = result.split(' ')
    expect(classes).toContain('bg-red-500')
    expect(classes).toContain('text-white')
    expect(classes).toContain('font-bold')
    expect(classes).toHaveLength(3)
  })

  it('removes duplicate tailwind classes', () => {
    const result = cn('bg-red-500', 'bg-red-500', 'px-2', 'px-4')
    const classes = result.split(' ')
    expect(classes).toContain('bg-red-500')
    expect(classes).toContain('px-4')
    expect(classes).not.toContain('px-2')
    expect(classes.filter((c) => c === 'bg-red-500')).toHaveLength(1)
  })
})
