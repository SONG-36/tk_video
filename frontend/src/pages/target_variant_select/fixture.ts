import{INVALIDATABLE_VARIANT_OBJECT_KEYS}from'../../state/workflowState';import type{Variant}from'../../types/product'
export const fixtureSource='00_design.md 第 6、7、9、20 章型号选择示例及 variant.schema.json；仅用于页面内存。'
export const context={product_series_id:'p_001',status:'variant_differences_checked'}as const
export const variants:Variant[]=[{variant_id:'sku_001',seller_sku:'VAC-BLACK-01',variant_name:'黑色标准款',attributes:{color:'black',accessories:'standard'},image_asset_ids:['img_001']},{variant_id:'sku_002',seller_sku:'VAC-WHITE-02',variant_name:'白色增强款',attributes:{color:'white',accessories:'extended'},image_asset_ids:['img_101']}]
export const invalidatedObjects=[...INVALIDATABLE_VARIANT_OBJECT_KEYS]
export function getIssues(id:string){return !id?['未选择 selected_variant_id。']:variants.some(v=>v.variant_id===id)?[]:['selected_variant_id 不存在于当前型号列表。']}
