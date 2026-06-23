import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import { pageMeta } from './pages/pageMeta'
import { RouteTree } from './router'

const expectedPageKeys = [
  'product_list',
  'product_create',
  'category_confirm',
  'variant_sku_input',
  'variant_difference_check',
  'target_variant_select',
  'variant_profile',
  'judgement_report',
  'material_check',
  'image_asset_check',
  'creative_direction',
  'video_batch_plan',
  'shot_asset_plan',
  'task_package_export',
  'output_viewer',
]

function renderRoute(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <RouteTree />
    </MemoryRouter>,
  )
}

describe('frontend route shell', () => {
  it('keeps the required 15-page order in one route definition', () => {
    expect(pageMeta.map((page) => page.key)).toEqual(expectedPageKeys)
    expect(pageMeta).toHaveLength(15)
  })

  it.each(pageMeta)('renders $key at its example path', (page) => {
    const markup = renderRoute(page.examplePath)

    expect(markup).toContain(`<strong>Page key:</strong> ${page.key}`)
    expect(markup).toContain(`<strong>Current route:</strong> ${page.examplePath}`)
    expect(markup).toContain(`data-page="${page.key}"`)
  })

  it('makes /products directly accessible', () => {
    const markup = renderRoute('/products')

    expect(markup).toContain('<h1>商品列表页</h1>')
    expect(markup).toContain('product_list')
  })

  it('renders a parameterized output route', () => {
    const markup = renderRoute(
      '/products/p_001/variants/sku_001/batches/batch_001/outputs',
    )

    expect(markup).toContain('<h1>输出结果查看页</h1>')
    expect(markup).toContain('output_viewer')
  })

  it('renders 404 for an unmatched path', () => {
    const markup = renderRoute('/not-a-route')

    expect(markup).toContain('<h1>404</h1>')
    expect(markup).toContain('Page not found.')
  })
})
