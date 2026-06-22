import type { ProductSeriesId, VariantId } from './common'

export type MaterialGroup = string[]
export type MaterialLevel =
  | 'required_materials'
  | 'recommended_materials'
  | 'risk_materials'
export type MissingMaterial = string
export type FabricationConstraint = string

export interface MaterialCheck {
  product_series_id: ProductSeriesId
  variant_id: VariantId
  required_materials: MaterialGroup
  recommended_materials: MaterialGroup
  risk_materials: MaterialGroup
  missing_materials: MissingMaterial[]
  do_not_invent: FabricationConstraint[]
  can_continue: boolean
}
