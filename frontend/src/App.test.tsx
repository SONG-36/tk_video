import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the initialized frontend shell', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('商品内容生产流程式工作台')
    expect(markup).toContain('Frontend initialized.')
    expect(markup).toContain('No business flow implemented yet.')
  })
})
