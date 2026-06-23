export interface ProductCreateDraft { product_name:string; target_platform:string; target_market:string; business_stage:string; product_images:string; link_1688:string; link_tiktok:string; link_amazon:string; supplier_material:string; price_range:string; purchase_quantity:string; notes:string }
export const fixtureSource='00_design.md 第 7、20 章商品基础信息示例；当前无独立 basic_info Schema，仅用于页面内存。'
export const initialDraft:ProductCreateDraft={product_name:'',target_platform:'TikTok Shop US',target_market:'US',business_stage:'准备拍视频',product_images:'',link_1688:'',link_tiktok:'',link_amazon:'',supplier_material:'',price_range:'',purchase_quantity:'',notes:''}
export const contractGaps=['basic_info 没有独立 Schema。','创建成功不会写入 data/products。']
export function getIssues(d:ProductCreateDraft){return [['产品名称',d.product_name],['目标平台',d.target_platform],['目标市场',d.target_market],['当前业务阶段',d.business_stage]].filter(([,v])=>!v.trim()).map(([k])=>`${k}为空。`)}
