import { describe, expect, it } from 'vitest'
import {
  getInvalidatedObjectsWhenVariantChanges,
  markVariantBoundObjectsInvalid,
} from './workflowInvalidation'
import {
  createWorkflowState,
  INVALIDATABLE_VARIANT_OBJECT_KEYS,
  VARIANT_BOUND_PAGE_KEYS,
  WORKFLOW_FLAGS,
} from './workflowState'
import {
  WORKFLOW_STATUSES,
  type WorkflowStatus,
} from './workflowStatus'
import { getNextStatus } from './workflowTransitions'

const expectedStatuses = [
  'draft',
  'basic_info_completed',
  'category_detected',
  'category_confirmed',
  'variants_recorded',
  'variant_differences_checked',
  'target_variant_selected',
  'variant_profile_completed',
  'video_type_completed',
  'report_generated',
  'report_confirmed',
  'materials_checked',
  'variant_image_assets_checked',
  'creative_direction_confirmed',
  'video_batch_planned',
  'shot_assets_planned',
  'task_package_exported',
  'codex_processing',
  'codex_output_ready',
  'completed',
  'blocked',
] satisfies WorkflowStatus[]

const expectedFlags = [
  'tiktok_creative_structure_incomplete',
  'viral_pattern_not_adapted',
  'product_adaptation_failed',
  'plot_overpowers_product_risk',
  'hook_missing',
  'proof_missing',
  'cta_missing',
  'product_first_visible_late_risk',
  'product_proof_late_risk',
]

describe('workflow state', () => {
  it('contains every required workflow status without chapter 17/18 statuses', () => {
    expect(WORKFLOW_STATUSES).toEqual(expectedStatuses)
    expect(WORKFLOW_STATUSES).toHaveLength(21)
  })

  it('advances through the ordered statuses and keeps terminal statuses stable', () => {
    expect(getNextStatus('draft')).toBe('basic_info_completed')
    expect(getNextStatus('completed')).toBe('completed')
    expect(getNextStatus('blocked')).toBe('blocked')
  })

  it('reserves all chapter 17/18 flags without evaluating them', () => {
    const state = createWorkflowState()

    expect(WORKFLOW_FLAGS).toEqual(expectedFlags)
    expect(Object.values(state.flags).every((value) => value === false)).toBe(
      true,
    )
  })

  it('defines the required selected-variant page bindings', () => {
    expect(VARIANT_BOUND_PAGE_KEYS).toEqual([
      'variant_profile',
      'judgement_report',
      'material_check',
      'image_asset_check',
      'creative_direction',
      'video_batch_plan',
      'shot_asset_plan',
      'task_package_export',
      'output_viewer',
    ])
  })

  it('returns the exact objects invalidated by a selected variant change', () => {
    expect(getInvalidatedObjectsWhenVariantChanges()).toEqual([
      'variant_profile',
      'judgement_report',
      'image_asset_check',
      'creative_direction',
      'video_batch_plan',
      'shot_asset_plan',
      'task_package_export',
      'output_viewer',
    ])
    expect(INVALIDATABLE_VARIANT_OBJECT_KEYS).toHaveLength(8)
  })

  it('marks variant-scoped objects invalid and retains shared-material marker', () => {
    const state = createWorkflowState({
      status: 'completed',
      selected_variant_id: 'sku_001',
      variantBindings: Object.fromEntries(
        VARIANT_BOUND_PAGE_KEYS.map((key) => [key, 'sku_001']),
      ),
      seriesSharedMaterialsRetained: false,
    })

    const changed = markVariantBoundObjectsInvalid(state, 'sku_002')

    expect(changed.status).toBe('target_variant_selected')
    expect(changed.selected_variant_id).toBe('sku_002')
    expect(changed.variantBindings).toEqual({})
    expect(changed.invalidatedObjects).toEqual(
      Object.fromEntries(
        INVALIDATABLE_VARIANT_OBJECT_KEYS.map((key) => [key, true]),
      ),
    )
    expect(changed.seriesSharedMaterialsRetained).toBe(true)
  })

  it('does not invalidate objects when the selected variant is unchanged', () => {
    const state = createWorkflowState({ selected_variant_id: 'sku_001' })

    expect(markVariantBoundObjectsInvalid(state, 'sku_001')).toBe(state)
  })
})
