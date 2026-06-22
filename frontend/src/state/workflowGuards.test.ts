import { describe, expect, it } from 'vitest'
import { pageMeta, type PageKey } from '../pages/pageMeta'
import {
  canEnterPage,
  getBlockedReason,
  getRequiredStatusForPage,
  PAGE_REQUIRED_STATUS,
} from './workflowGuards'
import {
  createWorkflowState,
  VARIANT_BOUND_PAGE_KEYS,
} from './workflowState'

describe('workflow page guards', () => {
  it('defines an entry requirement for all 15 pages', () => {
    expect(Object.keys(PAGE_REQUIRED_STATUS)).toEqual(
      pageMeta.map((page) => page.key),
    )
    expect(pageMeta.every((page) => getRequiredStatusForPage(page.key))).toBe(
      true,
    )
  })

  it('allows product_list in draft', () => {
    expect(canEnterPage('product_list', createWorkflowState())).toBe(true)
  })

  it.each([
    ['category_confirm', 'draft', '商品系列基础信息未完成'],
    ['variant_sku_input', 'category_detected', '平台类目未确认'],
    ['variant_difference_check', 'category_confirmed', '型号 / SKU 未录入'],
    [
      'target_variant_select',
      'variants_recorded',
      '型号差异未判断',
    ],
    ['material_check', 'report_generated', '判断报告未确认'],
    ['image_asset_check', 'report_confirmed', '材料检查未通过'],
    [
      'video_batch_plan',
      'variant_image_assets_checked',
      '创意方向未确认',
    ],
    ['shot_asset_plan', 'creative_direction_confirmed', '视频批次未规划'],
    ['task_package_export', 'video_batch_planned', '镜头资产未规划'],
    ['output_viewer', 'shot_assets_planned', '任务包未导出'],
  ] as const)(
    'blocks %s before its prerequisite status',
    (pageKey, status, reason) => {
      const state = createWorkflowState({
        status,
        selected_variant_id: 'sku_001',
      })

      expect(canEnterPage(pageKey, state)).toBe(false)
      expect(getBlockedReason(pageKey, state)).toContain(reason)
    },
  )

  it.each(VARIANT_BOUND_PAGE_KEYS)(
    'blocks variant-bound page %s when selected_variant_id is missing',
    (pageKey) => {
      const state = createWorkflowState({ status: 'completed' })

      expect(canEnterPage(pageKey, state)).toBe(false)
      expect(getBlockedReason(pageKey, state)).toContain(
        '缺少 selected_variant_id',
      )
    },
  )

  it('blocks an object bound to a previous selected_variant_id', () => {
    const state = createWorkflowState({
      status: 'completed',
      selected_variant_id: 'sku_002',
      variantBindings: { creative_direction: 'sku_001' },
    })

    expect(getBlockedReason('creative_direction', state)).toContain(
      'selected_variant_id 已失效',
    )
  })

  it('blocks an object explicitly invalidated by a variant change', () => {
    const state = createWorkflowState({
      status: 'completed',
      selected_variant_id: 'sku_002',
      invalidatedObjects: { video_batch_plan: true },
    })

    expect(getBlockedReason('video_batch_plan', state)).toContain(
      '已被标记失效',
    )
  })

  it('does not turn chapter 17/18 flags into complex page guards', () => {
    const state = createWorkflowState({
      status: 'completed',
      selected_variant_id: 'sku_001',
      flags: {
        ...createWorkflowState().flags,
        tiktok_creative_structure_incomplete: true,
        viral_pattern_not_adapted: true,
        product_adaptation_failed: true,
        plot_overpowers_product_risk: true,
        hook_missing: true,
        proof_missing: true,
        cta_missing: true,
        product_first_visible_late_risk: true,
        product_proof_late_risk: true,
      },
    })

    expect(canEnterPage('output_viewer', state)).toBe(true)
  })

  it('allows only product_list while the workflow is blocked', () => {
    const state = createWorkflowState({ status: 'blocked' })

    expect(canEnterPage('product_list', state)).toBe(true)
    expect(canEnterPage('product_create', state)).toBe(false)
  })

  it('keeps the guard API constrained to known page keys', () => {
    const keys: PageKey[] = pageMeta.map((page) => page.key)
    expect(keys).toHaveLength(15)
  })
})
