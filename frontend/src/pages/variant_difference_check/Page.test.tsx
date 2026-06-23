import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import Page from './Page'
import { getIssues, getSingleVariantNotice, initialRows } from './fixture'

describe('variant_difference_check', () => {
  it('renders comparison matrix', () => {
    const markup = renderToStaticMarkup(<MemoryRouter><Page /></MemoryRouter>)
    expect(markup).toContain('型号差异判断页')
    expect(markup).toContain('外观结构与颜色')
    expect(markup).toContain('隔离字段')
    expect(markup).toContain('仅一个型号')
    expect(markup).toContain('<details class="local-debug">')
  })
  it('blocks unconfirmed draft', () => expect(getIssues(initialRows, false)).toContain('差异判断尚未人工确认。'))
  it('accepts isolated confirmed rows', () => expect(getIssues(initialRows, true)).toEqual([]))
  it('documents the single-variant default', () => expect(getSingleVariantNotice(1)).toContain('默认通过'))
})
