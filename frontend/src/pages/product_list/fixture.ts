import type { WorkflowStatus } from '../../state/workflowStatus'

export interface ProductListItem {
  product_series_id: string
  product_name: string
  target_platform: string
  target_market: string
  platform_category: string
  classification: string
  status: WorkflowStatus
  missing_material_count: number
  updated_at: string
}

export const fixtureSource = '00_design.md 第 7 章商品列表页示例；仅用于页面内存。'
export const productListFixture: ProductListItem[] = [
  { product_series_id: 'p_001', product_name: '车载吸尘器', target_platform: 'TikTok Shop US', target_market: 'US', platform_category: 'Automotive & Motorcycle', classification: '小件标品', status: 'report_confirmed', missing_material_count: 4, updated_at: 'fixture-time-001' },
  { product_series_id: 'p_002', product_name: '无线直发梳', target_platform: 'TikTok Shop US', target_market: 'US', platform_category: 'Beauty & Personal Care', classification: '小件标品', status: 'variant_profile_completed', missing_material_count: 3, updated_at: 'fixture-time-002' },
]
export const blockers = ['列表数据仅来自 fixture。', '没有真实商品库、删除能力或最近更新时间来源。']
export function filterProducts(items: ProductListItem[], query: string) { return items.filter((item) => item.product_name.includes(query.trim())) }
