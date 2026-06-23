import { createWorkflowState } from '../../state/workflowState'
import type { ProductProfile, ProductProfileDetails } from '../../types/profile'

export const variantProfileFixtureSource =
  '00_design.md 第 20、22 章车载吸尘器商品画像示例；仅用于本地页面骨架。'

export const variantProfileContextFixture = {
  product_series_id: 'p_001',
  product_series_name: '车载吸尘器系列',
  selected_variant_id: 'sku_001',
  variant_name: '黑色标准款',
  seller_sku: 'VAC-BLACK-01',
} as const

export const variantProfileFixture: ProductProfile = {
  product_series_id: variantProfileContextFixture.product_series_id,
  variant_id: variantProfileContextFixture.selected_variant_id,
  product_profile: {
    size: '小件，可手持',
    requires_model: false,
    requires_large_scene: true,
    has_clear_function: true,
    style_sensitive: false,
    suitable_for_comparison: true,
    product_has_packaging: true,
    is_electronic: true,
    has_battery: true,
    touches_body: false,
    is_children_related: false,
    is_pet_related: false,
    is_food_related: false,
    is_high_price: false,
    selling_point_types: ['功能效果', '便携', '痛点解决'],
  },
}

export const variantProfileWorkflowFixture = createWorkflowState({
  status: 'target_variant_selected',
  selected_variant_id: variantProfileContextFixture.selected_variant_id,
})

export const sizeOptions = [
  '小件，可手持',
  '中件，桌面展示',
  '大件，需要房间/户外空间',
] as const

export const sellingPointOptions = [
  '功能效果',
  '便携',
  '外观颜值',
  '价格优势',
  '材质品质',
  '使用场景',
  '痛点解决',
  '情绪价值',
  '安全性',
  '省时间',
  '省空间',
] as const

export const editableBasicBooleanFields = [
  ['style_sensitive', '强依赖审美、款式或效果'],
  ['suitable_for_comparison', '适合对比测试'],
  ['product_has_packaging', '有包装展示价值'],
] as const satisfies readonly (readonly [keyof ProductProfileDetails, string])[]

export const riskBooleanFields = [
  ['is_electronic', '电子 / 电器类'],
  ['has_battery', '含电池'],
  ['touches_body', '接触人体'],
  ['is_children_related', '儿童相关'],
  ['is_pet_related', '宠物相关'],
  ['is_food_related', '食品 / 饮品相关'],
  ['is_high_price', '高单价'],
] as const satisfies readonly (readonly [keyof ProductProfileDetails, string])[]

export const unresolvedTierFields = [
  {
    key: 'requires_model',
    label: '真人出镜需求',
    designOptions: ['不需要', '最好需要', '必须需要'],
  },
  {
    key: 'requires_large_scene',
    label: '大场景需求',
    designOptions: ['不需要', '需要简单场景', '需要完整家居/户外/车内场景'],
  },
  {
    key: 'has_clear_function',
    label: '功能明确程度',
    designOptions: [
      '是，功能很明确',
      '一般，需要解释',
      '否，主要靠款式/颜值/情绪价值',
    ],
  },
] as const

export const variantProfileContractBlockers = [
  '真人出镜需求、大场景需求、功能明确程度的三档页面选项与 Schema 布尔字段映射未裁决。',
  '“认证或合规要求”存在于页面设计，但 product_profile.schema.json 没有对应字段。',
] as const

export type VariantProfileDraft = Partial<ProductProfileDetails>

const requiredBooleanFields = [
  'requires_model',
  'requires_large_scene',
  'has_clear_function',
  'style_sensitive',
  'suitable_for_comparison',
  'product_has_packaging',
  'is_electronic',
  'has_battery',
  'touches_body',
  'is_children_related',
  'is_pet_related',
  'is_food_related',
  'is_high_price',
] as const satisfies readonly (keyof ProductProfileDetails)[]

export function getVariantProfileDraftIssues(
  draft: VariantProfileDraft,
): string[] {
  const issues: string[] = []

  if (!draft.size?.trim()) {
    issues.push('商品体积未填写。')
  }

  requiredBooleanFields.forEach((field) => {
    if (typeof draft[field] !== 'boolean') {
      issues.push(`${field} 未填写。`)
    }
  })

  if (!draft.selling_point_types?.length) {
    issues.push('至少选择一个卖点类型。')
  }

  return issues
}
