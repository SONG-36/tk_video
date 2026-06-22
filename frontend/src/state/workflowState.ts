import type { PageKey } from '../pages/pageMeta'
import type { WorkflowStatus } from './workflowStatus'

export const WORKFLOW_FLAGS = [
  'tiktok_creative_structure_incomplete',
  'viral_pattern_not_adapted',
  'product_adaptation_failed',
  'plot_overpowers_product_risk',
  'hook_missing',
  'proof_missing',
  'cta_missing',
  'product_first_visible_late_risk',
  'product_proof_late_risk',
] as const

export type WorkflowFlag = (typeof WORKFLOW_FLAGS)[number]

export const VARIANT_BOUND_PAGE_KEYS = [
  'variant_profile',
  'judgement_report',
  'material_check',
  'image_asset_check',
  'creative_direction',
  'video_batch_plan',
  'shot_asset_plan',
  'task_package_export',
  'output_viewer',
] as const satisfies readonly PageKey[]

export type VariantBoundPageKey = (typeof VARIANT_BOUND_PAGE_KEYS)[number]

export const INVALIDATABLE_VARIANT_OBJECT_KEYS = [
  'variant_profile',
  'judgement_report',
  'image_asset_check',
  'creative_direction',
  'video_batch_plan',
  'shot_asset_plan',
  'task_package_export',
  'output_viewer',
] as const satisfies readonly VariantBoundPageKey[]

export type InvalidatableVariantObjectKey =
  (typeof INVALIDATABLE_VARIANT_OBJECT_KEYS)[number]

export interface WorkflowState {
  status: WorkflowStatus
  selected_variant_id: string | null
  batch_id: string | null
  flags: Record<WorkflowFlag, boolean>
  variantBindings: Partial<Record<VariantBoundPageKey, string>>
  invalidatedObjects: Partial<
    Record<InvalidatableVariantObjectKey, boolean>
  >
  seriesSharedMaterialsRetained: boolean
}

export function createWorkflowFlags(): Record<WorkflowFlag, boolean> {
  return Object.fromEntries(
    WORKFLOW_FLAGS.map((flag) => [flag, false]),
  ) as Record<WorkflowFlag, boolean>
}

export function createWorkflowState(
  overrides: Partial<WorkflowState> = {},
): WorkflowState {
  return {
    status: 'draft',
    selected_variant_id: null,
    batch_id: null,
    variantBindings: {},
    invalidatedObjects: {},
    seriesSharedMaterialsRetained: true,
    ...overrides,
    flags: {
      ...createWorkflowFlags(),
      ...overrides.flags,
    },
  }
}

export const mockWorkflowState = createWorkflowState()

export function isVariantBoundPage(
  pageKey: PageKey,
): pageKey is VariantBoundPageKey {
  return (VARIANT_BOUND_PAGE_KEYS as readonly PageKey[]).includes(pageKey)
}

const PAGE_RELEVANT_FLAGS: Partial<
  Record<PageKey, readonly WorkflowFlag[]>
> = {
  creative_direction: [
    'tiktok_creative_structure_incomplete',
    'viral_pattern_not_adapted',
    'product_adaptation_failed',
    'plot_overpowers_product_risk',
  ],
  video_batch_plan: WORKFLOW_FLAGS,
  shot_asset_plan: [
    'plot_overpowers_product_risk',
    'proof_missing',
    'product_first_visible_late_risk',
    'product_proof_late_risk',
  ],
  task_package_export: WORKFLOW_FLAGS,
  output_viewer: WORKFLOW_FLAGS,
}

export function getRelevantFlagsForPage(
  pageKey: PageKey,
): readonly WorkflowFlag[] {
  return PAGE_RELEVANT_FLAGS[pageKey] ?? []
}
