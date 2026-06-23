import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'
import { canEnterPage } from '../../state/workflowGuards'
import { createWorkflowState } from '../../state/workflowState'
import { pageMeta } from '../pageMeta'
import JudgementReportPage from './Page'
import {
  applyJudgementReportConfirmation,
  getJudgementReportConfirmationIssues,
  getJudgementReportDraftIssues,
  judgementReportContextFixture,
  judgementReportContractGaps,
  judgementReportFixture,
  judgementReportFixtureSource,
  judgementReportWorkflowFixture,
  updateClassificationField,
} from './fixture'

function renderPage(path = '/products/p_001/variants/sku_001/report') {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/products/:productSeriesId/variants/:variantId/report"
          element={<JudgementReportPage />}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('judgement_report page skeleton', () => {
  it('renders the report title, ID context and upstream state', () => {
    const markup = renderPage()

    expect(markup).toContain('<h1>Judgement Report / 判断报告</h1>')
    expect(markup).toContain(judgementReportContextFixture.product_series_id)
    expect(markup).toContain(judgementReportContextFixture.selected_variant_id)
    expect(markup).toContain('variant_profile_completed')
    expect(markup).toContain('report_generated')
    expect(markup).toContain('judgement_report_id')
  })

  it('shows every existing JudgementReport contract group', () => {
    const markup = renderPage()

    expect(markup).toContain('classification_report / 产品分类判断')
    expect(markup).toContain('video_fit_report / 视频分型建议')
    expect(markup).toContain('category_playbook / 类目打法')
    expect(markup).toContain('risks / 风险汇总')
    expect(markup).toContain('missing_information / 缺失信息')
    expect(markup).toContain('confirmed_by_user')
  })

  it('keeps classification inside the report instead of adding a page', () => {
    expect(pageMeta.map((page) => String(page.key))).not.toContain(
      'product_classification',
    )
    expect(renderPage()).toContain('classification_report')
  })

  it('shows contract gaps and a collapsed fixture/debug section', () => {
    const markup = renderPage()

    judgementReportContractGaps.forEach((gap) => {
      expect(markup).toContain(gap)
    })
    expect(markup).toContain('<details class="judgement-report-debug">')
    expect(markup).not.toContain(
      '<details class="judgement-report-debug" open="">',
    )
    expect(markup).toContain(judgementReportFixtureSource)
  })

  it('blocks a route that does not match selected_variant_id', () => {
    const markup = renderPage('/products/p_001/variants/sku_999/report')

    expect(markup).toContain(
      '当前路由 ID 与报告 fixture 的 selected_variant_id 不一致。',
    )
    expect(markup).toContain('disabled=""')
  })

  it('supports local classification edits without changing the fixture', () => {
    const changed = updateClassificationField(
      judgementReportFixture,
      'self_made_video_recommendation',
      '中高',
    )

    expect(changed.classification_report.self_made_video_recommendation).toBe(
      '中高',
    )
    expect(
      judgementReportFixture.classification_report
        .self_made_video_recommendation,
    ).toBe('高')
    expect(changed.confirmed_by_user).toBe(false)
  })

  it('shows both local draft and manual confirmation controls', () => {
    const markup = renderPage()

    expect(markup).toContain('保存本地草稿')
    expect(markup).toContain('尝试人工确认')
    expect(markup).toContain('我已阅读风险与缺失信息')
    expect(markup).toContain('人工确认状态：')
  })

  it('rejects missing context and incomplete required fields', () => {
    const missingContextWorkflow = createWorkflowState({
      status: 'report_generated',
      selected_variant_id: null,
    })
    const issues = getJudgementReportConfirmationIssues({
      draft: {},
      workflow: missingContextWorkflow,
      entryAllowed: false,
      routeMatchesFixture: false,
      risksReviewed: false,
    })

    expect(issues).toContain('缺少 product_series_id。')
    expect(issues).toContain('缺少 selected_variant_id。')
    expect(issues).toContain('缺少 classification_report。')
    expect(issues).toContain('variant_profile 未完成或页面进入闸门未通过。')
    expect(applyJudgementReportConfirmation(judgementReportFixture, issues)).toBe(
      judgementReportFixture,
    )
  })

  it('allows an explicit local confirmation when current contract conditions pass', () => {
    const entryAllowed = canEnterPage(
      'judgement_report',
      judgementReportWorkflowFixture,
    )
    const issues = getJudgementReportConfirmationIssues({
      draft: judgementReportFixture,
      workflow: judgementReportWorkflowFixture,
      entryAllowed,
      routeMatchesFixture: true,
      risksReviewed: true,
    })
    const confirmed = applyJudgementReportConfirmation(
      judgementReportFixture,
      issues,
    )

    expect(getJudgementReportDraftIssues(judgementReportFixture)).toEqual([])
    expect(issues).toEqual([])
    expect(confirmed.confirmed_by_user).toBe(true)
    expect(judgementReportWorkflowFixture.status).toBe('report_generated')
  })
})
