import type { PageKey } from '../pages/pageMeta'
import { hasReachedStatus, type WorkflowStatus } from './workflowStatus'
import {
  isVariantBoundPage,
  type WorkflowState,
} from './workflowState'

export const PAGE_REQUIRED_STATUS = {
  product_list: 'draft',
  product_create: 'draft',
  category_confirm: 'basic_info_completed',
  variant_sku_input: 'category_confirmed',
  variant_difference_check: 'variants_recorded',
  target_variant_select: 'variant_differences_checked',
  variant_profile: 'target_variant_selected',
  judgement_report: 'variant_profile_completed',
  material_check: 'report_confirmed',
  image_asset_check: 'materials_checked',
  creative_direction: 'variant_image_assets_checked',
  video_batch_plan: 'creative_direction_confirmed',
  shot_asset_plan: 'video_batch_planned',
  task_package_export: 'shot_assets_planned',
  output_viewer: 'task_package_exported',
} as const satisfies Record<PageKey, WorkflowStatus>

const BLOCKED_REASON_BY_PAGE: Record<PageKey, string> = {
  product_list: '商品列表页始终可访问。',
  product_create: '新建商品页始终可访问。',
  category_confirm: '商品系列基础信息未完成，不能进入平台类目确认。',
  variant_sku_input: '平台类目未确认，不能录入并确认型号业务信息。',
  variant_difference_check: '型号 / SKU 未录入，不能进行型号差异判断。',
  target_variant_select: '型号差异未判断，不能选择本次拍摄型号。',
  variant_profile: '本次拍摄型号未选择，不能补全型号级商品画像。',
  judgement_report: '型号级商品画像未完成，不能生成视频分型和判断报告。',
  material_check: '判断报告未确认，不能进入材料检查。',
  image_asset_check: '材料检查未通过，不能进入型号级产品图片资产检查。',
  creative_direction: '目标型号图片资产未检查，不能进入创意方向设定。',
  video_batch_plan: '创意方向未确认，不能进入视频批次规划。',
  shot_asset_plan: '视频批次未规划，不能进入镜头资产规划。',
  task_package_export: '镜头资产未规划，不能导出 Codex 任务包。',
  output_viewer: '任务包未导出，不能进入 Codex 输出结果页。',
}

export function getRequiredStatusForPage(pageKey: PageKey): WorkflowStatus {
  return PAGE_REQUIRED_STATUS[pageKey]
}

export function getBlockedReason(
  pageKey: PageKey,
  state: WorkflowState,
): string | null {
  if (state.status === 'blocked') {
    return pageKey === 'product_list'
      ? null
      : '当前商品流程处于 blocked 状态。'
  }

  if (!hasReachedStatus(state.status, getRequiredStatusForPage(pageKey))) {
    return BLOCKED_REASON_BY_PAGE[pageKey]
  }

  if (isVariantBoundPage(pageKey)) {
    if (!state.selected_variant_id) {
      return '缺少 selected_variant_id，不能进入型号绑定页面。'
    }

    const boundVariantId = state.variantBindings[pageKey]
    if (boundVariantId && boundVariantId !== state.selected_variant_id) {
      return '页面对象绑定的 selected_variant_id 已失效，需要重新检查。'
    }

    if (
      pageKey !== 'material_check' &&
      state.invalidatedObjects[pageKey]
    ) {
      return '切换 selected_variant_id 后，该页面对象已被标记失效。'
    }
  }

  return null
}

export function canEnterPage(
  pageKey: PageKey,
  state: WorkflowState,
): boolean {
  return getBlockedReason(pageKey, state) === null
}
