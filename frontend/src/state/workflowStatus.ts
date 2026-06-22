export const WORKFLOW_STATUS_SEQUENCE = [
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
] as const

export const WORKFLOW_STATUSES = [
  ...WORKFLOW_STATUS_SEQUENCE,
  'blocked',
] as const

export type WorkflowStatus = (typeof WORKFLOW_STATUSES)[number]

const statusPosition = new Map<WorkflowStatus, number>(
  WORKFLOW_STATUS_SEQUENCE.map((status, index) => [status, index]),
)

export function hasReachedStatus(
  currentStatus: WorkflowStatus,
  requiredStatus: WorkflowStatus,
): boolean {
  if (currentStatus === 'blocked') {
    return requiredStatus === 'blocked'
  }

  if (requiredStatus === 'blocked') {
    return false
  }

  return (
    (statusPosition.get(currentStatus) ?? -1) >=
    (statusPosition.get(requiredStatus) ?? Number.POSITIVE_INFINITY)
  )
}
