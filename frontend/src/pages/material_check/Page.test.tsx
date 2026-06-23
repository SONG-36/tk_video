import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'
import { canEnterPage } from '../../state/workflowGuards'
import { createWorkflowState } from '../../state/workflowState'
import MaterialCheckPage from './Page'
import {
  applyMaterialCheckConfirmation,
  getMaterialCheckConfirmationIssues,
  getMaterialCheckDraftIssues,
  materialCheckContextFixture,
  materialCheckContractGaps,
  materialCheckFixture,
  materialCheckFixtureSource,
  materialCheckWorkflowFixture,
  updateMaterialList,
} from './fixture'

function renderPage(path = '/products/p_001/variants/sku_001/materials') {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/products/:productSeriesId/variants/:variantId/materials"
          element={<MaterialCheckPage />}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('material_check page skeleton', () => {
  it('renders the page, ID context and confirmed-report prerequisite', () => {
    const markup = renderPage()

    expect(markup).toContain('<h1>材料检查页</h1>')
    expect(markup).toContain(materialCheckContextFixture.product_series_id)
    expect(markup).toContain(materialCheckContextFixture.selected_variant_id)
    expect(markup).toContain('report_confirmed')
    expect(markup).toContain('<strong>Page key:</strong> material_check')
  })

  it('shows every MaterialCheck contract group', () => {
    const markup = renderPage()

    expect(markup).toContain('required_materials')
    expect(markup).toContain('recommended_materials')
    expect(markup).toContain('risk_materials')
    expect(markup).toContain('missing_materials / 缺失材料')
    expect(markup).toContain('do_not_invent / 禁止编造')
    expect(markup).toContain('本地检查状态：')
  })

  it('shows contract gaps and a collapsed fixture/debug section', () => {
    const markup = renderPage()

    materialCheckContractGaps.forEach((gap) => {
      expect(markup).toContain(gap)
    })
    expect(markup).toContain('<details class="material-check-debug">')
    expect(markup).not.toContain(
      '<details class="material-check-debug" open="">',
    )
    expect(markup).toContain(materialCheckFixtureSource)
  })

  it('blocks a route that does not match selected_variant_id', () => {
    const markup = renderPage('/products/p_001/variants/sku_999/materials')

    expect(markup).toContain(
      '当前路由 ID 与材料 fixture 的 selected_variant_id 不一致。',
    )
    expect(markup).toContain('disabled=""')
  })

  it('provides local draft and manual confirmation controls', () => {
    const markup = renderPage()

    expect(markup).toContain('保存本地草稿')
    expect(markup).toContain('尝试人工确认材料检查')
    expect(markup).toContain('我已阅读并确认建议材料缺失')
    expect(markup).toContain('<textarea')
  })

  it('updates local material lists without mutating the fixture', () => {
    const changed = updateMaterialList(
      materialCheckFixture,
      'missing_materials',
      ['认证资料'],
    )

    expect(changed.missing_materials).toEqual(['认证资料'])
    expect(materialCheckFixture.missing_materials).toContain('吸力参数')
    expect(changed.can_continue).toBe(false)
  })

  it('blocks incomplete context and missing required materials', () => {
    const workflow = createWorkflowState({
      status: 'report_confirmed',
      selected_variant_id: null,
    })
    const incomplete = {
      ...materialCheckFixture,
      missing_materials: [
        ...materialCheckFixture.missing_materials,
        '产品名称',
      ],
    }
    const issues = getMaterialCheckConfirmationIssues({
      draft: incomplete,
      workflow,
      entryAllowed: false,
      routeMatchesFixture: false,
      recommendedMissingConfirmed: false,
    })

    expect(issues).toContain('缺少 selected_variant_id。')
    expect(issues).toContain('判断报告未确认或页面进入闸门未通过。')
    expect(issues).toContain('必须材料缺失：产品名称。')
    expect(issues).toContain('建议材料缺失尚未人工确认。')
    expect(applyMaterialCheckConfirmation(incomplete, issues)).toBe(incomplete)
  })

  it('blocks risk material missing from do_not_invent', () => {
    const incomplete = updateMaterialList(
      materialCheckFixture,
      'do_not_invent',
      ['吸力参数', '续航时间', '噪音数值'],
    )
    const issues = getMaterialCheckConfirmationIssues({
      draft: incomplete,
      workflow: materialCheckWorkflowFixture,
      entryAllowed: true,
      routeMatchesFixture: true,
      recommendedMissingConfirmed: true,
    })

    expect(issues).toContain(
      '风险材料缺失但未进入 do_not_invent：认证资料。',
    )
  })

  it('allows local confirmation without advancing shared workflow', () => {
    const entryAllowed = canEnterPage(
      'material_check',
      materialCheckWorkflowFixture,
    )
    const issues = getMaterialCheckConfirmationIssues({
      draft: materialCheckFixture,
      workflow: materialCheckWorkflowFixture,
      entryAllowed,
      routeMatchesFixture: true,
      recommendedMissingConfirmed: true,
    })
    const confirmed = applyMaterialCheckConfirmation(
      materialCheckFixture,
      issues,
    )

    expect(getMaterialCheckDraftIssues(materialCheckFixture)).toEqual([])
    expect(issues).toEqual([])
    expect(confirmed.can_continue).toBe(true)
    expect(materialCheckWorkflowFixture.status).toBe('report_confirmed')
  })
})
