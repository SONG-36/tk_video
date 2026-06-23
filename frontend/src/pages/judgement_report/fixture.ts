import type { WorkflowState } from '../../state/workflowState'
import { createWorkflowState } from '../../state/workflowState'
import type {
  ClassificationReport,
  JudgementReport,
} from '../../types/report'

export const judgementReportFixtureSource =
  '00_design.md 第 7、10、11、20、22 章车载吸尘器报告示例，以及 judgement_report.schema.json；仅用于本地页面骨架。'

export const judgementReportContextFixture = {
  product_series_id: 'p_001',
  product_series_name: '车载吸尘器系列',
  selected_variant_id: 'sku_001',
  variant_name: '黑色标准款',
  seller_sku: 'VAC-BLACK-01',
  variant_profile_status: 'variant_profile_completed',
} as const

export const judgementReportWorkflowFixture = createWorkflowState({
  status: 'report_generated',
  selected_variant_id: judgementReportContextFixture.selected_variant_id,
})

export const judgementReportFixture = {
  product_series_id: judgementReportContextFixture.product_series_id,
  variant_id: judgementReportContextFixture.selected_variant_id,
  classification_report: {
    content_category: '小件标品',
    shooting_ease: 5,
    seeding_ease: 4,
    purchase_decision_ease: 3,
    self_made_video_recommendation: '高',
  },
  video_fit_report: {
    recommended_video_types: [
      {
        type: 'life_scenario',
        name: '生活场景型',
        score: 5,
        is_main_video_type: true,
        reason: '车载用品需要真实车内使用场景来解释用途。',
      },
      {
        type: 'selling_point',
        name: '卖点讲解型',
        score: 4,
        is_main_video_type: true,
        reason: '吸力、续航、噪音和配件等信息需要明确说明。',
      },
      {
        type: 'evaluation_comparison',
        name: '测评对比型',
        score: 4,
        is_main_video_type: true,
        reason: '同类商品多，需要用可见对比建立信任。',
      },
    ],
    not_recommended_video_types: [
      {
        type: 'unboxing',
        name: '开箱直拍型',
        reason: '单纯开箱不能证明清洁效果。',
      },
    ],
  },
  category_playbook: {
    hook_suggestions: [
      '车里这些缝隙脏到你想不到',
      '别再用纸巾擦车缝了',
    ],
    must_show: ['座椅缝隙清洁', '吸力近景', '尘盒清理'],
    trust_building: ['展示真实灰尘', '展示清洁前后对比'],
  },
  risks: [
    '同类视频容易撞创意。',
    '电子电器类商品需要确认合规与安全资料。',
  ],
  missing_information: [
    '吸力参数',
    '续航时间',
    '噪音数值',
    '认证资料',
  ],
  confirmed_by_user: false,
} satisfies JudgementReport

export const judgementReportContractGaps = [
  '当前 Schema 没有 judgement_report_id；报告以 product_series_id + variant_id 绑定。',
  'rule_hit_report、结构化 risk_summary、next_step 和人工备注不是当前 JudgementReport 字段，本页不补造。',
  '三档画像与布尔画像的映射仍未裁决；本页只展示既有 fixture 结果，不重新计算分类或分型。',
] as const

export type JudgementReportDraft = Partial<JudgementReport>

const validContentCategories = ['小件标品', '非标品', '大件标品'] as const

function isScore(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 5
}

export function getJudgementReportDraftIssues(
  draft: JudgementReportDraft,
): string[] {
  const issues: string[] = []

  if (!draft.product_series_id?.trim()) {
    issues.push('缺少 product_series_id。')
  }
  if (!draft.variant_id?.trim()) {
    issues.push('缺少 variant_id。')
  }

  const classification = draft.classification_report
  if (!classification) {
    issues.push('缺少 classification_report。')
  } else {
    if (!validContentCategories.includes(classification.content_category)) {
      issues.push('classification_report.content_category 无效。')
    }
    if (!isScore(classification.shooting_ease)) {
      issues.push('shooting_ease 必须为 1—5 的整数。')
    }
    if (!isScore(classification.seeding_ease)) {
      issues.push('seeding_ease 必须为 1—5 的整数。')
    }
    if (!isScore(classification.purchase_decision_ease)) {
      issues.push('purchase_decision_ease 必须为 1—5 的整数。')
    }
    if (!classification.self_made_video_recommendation.trim()) {
      issues.push('缺少 self_made_video_recommendation。')
    }
  }

  if (!draft.video_fit_report) {
    issues.push('缺少 video_fit_report。')
  }
  if (!draft.category_playbook) {
    issues.push('缺少 category_playbook。')
  }
  if (!Array.isArray(draft.risks)) {
    issues.push('缺少 risks。')
  }
  if (!Array.isArray(draft.missing_information)) {
    issues.push('缺少 missing_information。')
  }
  if (typeof draft.confirmed_by_user !== 'boolean') {
    issues.push('缺少 confirmed_by_user。')
  }

  return issues
}

interface ConfirmationCheckInput {
  draft: JudgementReportDraft
  workflow: WorkflowState
  entryAllowed: boolean
  routeMatchesFixture: boolean
  risksReviewed: boolean
}

export function getJudgementReportConfirmationIssues({
  draft,
  workflow,
  entryAllowed,
  routeMatchesFixture,
  risksReviewed,
}: ConfirmationCheckInput): string[] {
  const issues = getJudgementReportDraftIssues(draft)

  if (!entryAllowed) {
    issues.push('variant_profile 未完成或页面进入闸门未通过。')
  }
  if (!workflow.selected_variant_id) {
    issues.push('缺少 selected_variant_id。')
  }
  if (!routeMatchesFixture) {
    issues.push('当前路由 ID 与报告 fixture 上下文不一致。')
  }
  if (
    draft.variant_id &&
    workflow.selected_variant_id &&
    draft.variant_id !== workflow.selected_variant_id
  ) {
    issues.push('报告 variant_id 与 selected_variant_id 不一致。')
  }
  if (!risksReviewed) {
    issues.push('尚未人工确认已阅读风险和缺失信息。')
  }

  return [...new Set(issues)]
}

export function updateClassificationField<
  Field extends keyof ClassificationReport,
>(
  report: JudgementReport,
  field: Field,
  value: ClassificationReport[Field],
): JudgementReport {
  return {
    ...report,
    classification_report: {
      ...report.classification_report,
      [field]: value,
    },
    confirmed_by_user: false,
  }
}

export function applyJudgementReportConfirmation(
  report: JudgementReport,
  confirmationIssues: readonly string[],
): JudgementReport {
  if (confirmationIssues.length > 0) {
    return report
  }

  return { ...report, confirmed_by_user: true }
}
