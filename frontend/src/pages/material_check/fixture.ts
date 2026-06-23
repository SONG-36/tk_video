import type { WorkflowState } from '../../state/workflowState'
import { createWorkflowState } from '../../state/workflowState'
import type { MaterialCheck } from '../../types/material'

export const materialCheckFixtureSource =
  '00_design.md 第 12、22 章车载吸尘器材料检查示例、material_check.schema.json 与 material_check_rules.json；仅用于本地页面骨架。'

export const materialCheckContextFixture = {
  product_series_id: 'p_001',
  product_series_name: '车载吸尘器系列',
  selected_variant_id: 'sku_001',
  variant_name: '黑色标准款',
  judgement_report_status: 'report_confirmed',
} as const

export const materialCheckWorkflowFixture = createWorkflowState({
  status: 'report_confirmed',
  selected_variant_id: materialCheckContextFixture.selected_variant_id,
})

export const materialCheckFixture = {
  product_series_id: materialCheckContextFixture.product_series_id,
  variant_id: materialCheckContextFixture.selected_variant_id,
  required_materials: [
    '产品名称',
    '目标平台',
    '目标市场',
    '平台类目',
    '商品分类',
    '核心卖点',
    '使用场景',
    '视频分型',
  ],
  recommended_materials: [
    '产品图片',
    '吸力参数',
    '续航时间',
    '噪音数值',
    '尘盒容量',
    '配件图',
    '真实车内使用素材',
    '竞品视频',
  ],
  risk_materials: ['认证资料', '电池容量', '充电规格', '安全标识'],
  missing_materials: ['吸力参数', '续航时间', '噪音数值', '认证资料'],
  do_not_invent: ['吸力参数', '续航时间', '噪音数值', '认证资料'],
  can_continue: false,
} satisfies MaterialCheck

export const materialCheckContractGaps = [
  '当前 Schema 只有统一 missing_materials，没有按必须/建议/风险拆分的缺失字段；本页不新增分组。',
  '创意表达材料、产品图片资产和竞品参考材料缺少与其他分组同等粒度的字段清单。',
  '材料共享范围与 selected_variant_id 切换后的沿用关系留给后续 validators。',
] as const

export type MaterialCheckDraft = Partial<MaterialCheck>

export function getMaterialCheckDraftIssues(
  draft: MaterialCheckDraft,
): string[] {
  const issues: string[] = []

  if (!draft.product_series_id?.trim()) {
    issues.push('缺少 product_series_id。')
  }
  if (!draft.variant_id?.trim()) {
    issues.push('缺少 variant_id。')
  }

  ;(
    [
      'required_materials',
      'recommended_materials',
      'risk_materials',
      'missing_materials',
      'do_not_invent',
    ] as const
  ).forEach((field) => {
    if (!Array.isArray(draft[field])) {
      issues.push(`缺少 ${field}。`)
    }
  })

  if (typeof draft.can_continue !== 'boolean') {
    issues.push('缺少 can_continue。')
  }

  return issues
}

interface ConfirmationCheckInput {
  draft: MaterialCheckDraft
  workflow: WorkflowState
  entryAllowed: boolean
  routeMatchesFixture: boolean
  recommendedMissingConfirmed: boolean
}

export function getMaterialCheckConfirmationIssues({
  draft,
  workflow,
  entryAllowed,
  routeMatchesFixture,
  recommendedMissingConfirmed,
}: ConfirmationCheckInput): string[] {
  const issues = getMaterialCheckDraftIssues(draft)

  if (!entryAllowed) {
    issues.push('判断报告未确认或页面进入闸门未通过。')
  }
  if (!workflow.selected_variant_id) {
    issues.push('缺少 selected_variant_id。')
  }
  if (!routeMatchesFixture) {
    issues.push('当前路由 ID 与材料 fixture 上下文不一致。')
  }
  if (
    draft.variant_id &&
    workflow.selected_variant_id &&
    draft.variant_id !== workflow.selected_variant_id
  ) {
    issues.push('材料 variant_id 与 selected_variant_id 不一致。')
  }

  const missing = draft.missing_materials ?? []
  const required = draft.required_materials ?? []
  const recommended = draft.recommended_materials ?? []
  const risk = draft.risk_materials ?? []
  const doNotInvent = draft.do_not_invent ?? []

  const missingRequired = missing.filter((item) => required.includes(item))
  if (missingRequired.length > 0) {
    issues.push(`必须材料缺失：${missingRequired.join('、')}。`)
  }

  const missingRecommended = missing.filter((item) =>
    recommended.includes(item),
  )
  if (missingRecommended.length > 0 && !recommendedMissingConfirmed) {
    issues.push('建议材料缺失尚未人工确认。')
  }

  const unconstrainedRisk = missing.filter(
    (item) => risk.includes(item) && !doNotInvent.includes(item),
  )
  if (unconstrainedRisk.length > 0) {
    issues.push(
      `风险材料缺失但未进入 do_not_invent：${unconstrainedRisk.join('、')}。`,
    )
  }

  const knownMaterials = new Set([...required, ...recommended, ...risk])
  const unclassifiedMissing = missing.filter(
    (item) => !knownMaterials.has(item),
  )
  if (unclassifiedMissing.length > 0) {
    issues.push(`缺失材料未标明等级：${unclassifiedMissing.join('、')}。`)
  }

  return [...new Set(issues)]
}

export function applyMaterialCheckConfirmation(
  draft: MaterialCheck,
  confirmationIssues: readonly string[],
): MaterialCheck {
  if (confirmationIssues.length > 0) {
    return draft
  }

  return { ...draft, can_continue: true }
}

export function updateMaterialList(
  draft: MaterialCheck,
  field: 'missing_materials' | 'do_not_invent',
  items: string[],
): MaterialCheck {
  return {
    ...draft,
    [field]: items,
    can_continue: false,
  }
}
