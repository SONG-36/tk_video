import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'
import VariantProfilePage from './Page'
import {
  editableBasicBooleanFields,
  getVariantProfileDraftIssues,
  riskBooleanFields,
  sellingPointOptions,
  unresolvedTierFields,
  variantProfileContextFixture,
  variantProfileContractBlockers,
  variantProfileFixture,
  variantProfileFixtureSource,
} from './fixture'

function renderPage(path = '/products/p_001/variants/sku_001/profile') {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/products/:productSeriesId/variants/:variantId/profile"
          element={<VariantProfilePage />}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('variant_profile page skeleton', () => {
  it('shows the page title, selected variant context and local fixture source', () => {
    const markup = renderPage()

    expect(markup).toContain('<h1>型号级商品画像补全页</h1>')
    expect(markup).toContain('p_001')
    expect(markup).toContain('sku_001')
    expect(markup).toContain('黑色标准款')
    expect(markup).toContain('target_variant_selected')
    expect(markup).toContain(variantProfileFixtureSource)
  })

  it('covers every Schema profile field and selling-point option', () => {
    const markup = renderPage()

    expect(markup).toContain('商品体积')
    unresolvedTierFields.forEach((field) => {
      expect(markup).toContain(field.label)
      expect(markup).toContain(field.key)
    })
    editableBasicBooleanFields.forEach(([, label]) => {
      expect(markup).toContain(label)
    })
    riskBooleanFields.forEach(([, label]) => {
      expect(markup).toContain(label)
    })
    sellingPointOptions.forEach((sellingPoint) => {
      expect(markup).toContain(sellingPoint)
    })
    expect(markup).toContain('认证或合规要求')
  })

  it('keeps manual confirmation blocked by unresolved contracts', () => {
    const markup = renderPage()

    expect(markup).toContain('正式确认阻断')
    variantProfileContractBlockers.forEach((blocker) => {
      expect(markup).toContain(blocker)
    })
    expect(markup).toContain('人工确认画像')
    expect(markup).toContain('aria-disabled="true"')
    expect(markup).toContain('未确认，不推进状态')
  })

  it('blocks a route whose variant ID does not match selected_variant_id', () => {
    const markup = renderPage('/products/p_001/variants/sku_999/profile')

    expect(markup).toContain(
      '当前路由 ID 与 fixture 的 selected_variant_id 上下文不一致。',
    )
    expect(markup).toContain('disabled=""')
  })

  it('reports missing required local draft fields without a runtime validator', () => {
    expect(getVariantProfileDraftIssues({})).toContain('商品体积未填写。')
    expect(
      getVariantProfileDraftIssues({
        ...variantProfileFixture.product_profile,
        selling_point_types: [],
      }),
    ).toContain('至少选择一个卖点类型。')
    expect(
      getVariantProfileDraftIssues(variantProfileFixture.product_profile),
    ).toEqual([])
  })

  it('binds the fixture output variant to selected_variant_id', () => {
    expect(variantProfileFixture.product_series_id).toBe(
      variantProfileContextFixture.product_series_id,
    )
    expect(variantProfileFixture.variant_id).toBe(
      variantProfileContextFixture.selected_variant_id,
    )
  })
})
