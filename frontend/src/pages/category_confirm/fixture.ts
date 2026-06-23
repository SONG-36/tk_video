export interface Candidate{platform_category:string;sub_category:string;confidence:number;reason:string;risk:string}
export const fixtureSource='00_design.md 第 7、20 章类目候选示例；无独立 category_detection Schema，不执行识别算法。'
export const productContext={product_series_id:'p_001',product_name:'车载吸尘器',status:'basic_info_completed'} as const
export const candidates:Candidate[]=[{platform_category:'Automotive & Motorcycle',sub_category:'Car Cleaning Appliance',confidence:.88,reason:'主要使用场景是车内清洁。',risk:'需确认电器合规信息。'},{platform_category:'Household Appliances',sub_category:'Portable Vacuum',confidence:.54,reason:'具备小家电属性。',risk:'主要场景并非家庭。'}]
export function getIssues(category:string,confirmed:boolean){const a=[];if(!category.trim())a.push('未选择平台类目。');if(!confirmed)a.push('类目尚未人工确认。');return a}
