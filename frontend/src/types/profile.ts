import type { ProductSeriesId, VariantId } from './common'

export type SellingPointType = string

export interface ProductProfileDetails {
  size: string
  requires_model: boolean
  requires_large_scene: boolean
  has_clear_function: boolean
  style_sensitive: boolean
  suitable_for_comparison: boolean
  product_has_packaging: boolean
  is_electronic: boolean
  has_battery: boolean
  touches_body: boolean
  is_children_related: boolean
  is_pet_related: boolean
  is_food_related: boolean
  is_high_price: boolean
  selling_point_types: SellingPointType[]
}

/**
 * The three-level page choices and these Schema booleans have unresolved
 * granularity differences. This type intentionally follows the Schema.
 */
export type RiskProfile = Pick<
  ProductProfileDetails,
  | 'is_electronic'
  | 'has_battery'
  | 'touches_body'
  | 'is_children_related'
  | 'is_pet_related'
  | 'is_food_related'
  | 'is_high_price'
>

export interface ProductProfile {
  product_series_id: ProductSeriesId
  variant_id: VariantId
  product_profile: ProductProfileDetails
}
