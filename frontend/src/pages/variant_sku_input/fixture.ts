import type{Variant}from'../../types/product'
export const fixtureSource='00_design.md 第 6、7、20 章型号示例及 variant.schema.json；仅用于页面内存。'
export const seriesContext={product_series_id:'p_001',status:'category_confirmed'}as const
export const initialVariants:Variant[]=[{variant_id:'sku_001',seller_sku:'VAC-BLACK-01',platform_sku:'TT-VAC-01',variant_name:'黑色标准款',attributes:{color:'black',size:'handheld',core_parameters:'[待补参数]',accessories:'standard',price:'[价格]',images:'fixture only'},image_asset_ids:['img_001']}]
export function getIssues(items:Variant[]){const a:string[]=[];if(!items.length)a.push('至少需要一个型号。');items.forEach((v,i)=>{if(!v.variant_id.trim())a.push(`型号 ${i+1} 缺少 variant_id。`);if(!v.variant_name.trim())a.push(`型号 ${i+1} 名称为空。`);if(!v.seller_sku.trim())a.push(`型号 ${i+1} seller_sku 为空。`)});return a}
export function addVariant(items:Variant[]){return[...items,{variant_id:`sku_${String(items.length+1).padStart(3,'0')}`,seller_sku:'',variant_name:'',attributes:{color:'',size:'',core_parameters:'',accessories:'',price:'',images:''},image_asset_ids:[]}]}
