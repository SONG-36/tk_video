import { describe, expect, expectTypeOf, it } from 'vitest'
import type {
  CodexTaskPackage,
  CreativeDirection,
  CreativeReadinessFlags,
  ImageAsset,
  JudgementReport,
  MaterialCheck,
  ProductAdaptedPattern,
  ProductProfile,
  ProductSeries,
  ShotAssetPlan,
  Variant,
  VideoBatchPlan,
  VideoPlan,
  ViralPatternCard,
} from './index'

type RequiredKeys<T> = {
  [Key in keyof T]-?: Record<string, never> extends Pick<T, Key>
    ? never
    : Key
}[keyof T]

type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>

const videoPlan = {
  video_id: 'video_01',
  video_type: 'life_scenario',
  creative_style: '真实痛点',
  main_selling_point: '座椅缝隙清洁',
  usage_scene: '车内座椅缝隙',
  target_pain_point: '纸巾无法清洁缝隙',
  generation_level: 'A',
  generate_seedance_prompts: true,
  requires_human_assets: false,
  requires_product_image_lock: true,
  requires_competitor_assets: false,
  estimated_shot_count: 5,
  duration: '20s',
  hook_type: 'failed_method',
  first_3_seconds_text: 'Tissue? Nope.',
  first_3_seconds_visual: 'A tissue fails to reach the seat gap.',
  scroll_stop_reason: 'A familiar failed method creates tension.',
  script_structure: {
    '0_3s': 'Hook',
    '3_8s': 'Problem',
    '8_18s': 'Product and proof',
    '18_25s': 'Result',
    final_2_3s: 'CTA',
  },
  retention_design: { mechanism: 'failed method to product method' },
  key_message: 'Clean gaps that a hand cannot reach.',
  proof_point: 'Show debris entering the dust container.',
  cta: {
    cta_type: 'product_card_click',
    cta_text: 'Check the product card before your next car clean.',
    cta_visual: 'Clean seat gap beside the product.',
  },
  tiktok_native_style: { style: 'UGC demo' },
  text_overlay_plan: [{ time: '0-3s', text: 'Tissue? Nope.' }],
  sound_or_voiceover_plan: { type: 'voiceover + action sound' },
  viral_pattern_ref: 'vp_001',
  adapted_pattern_ref: 'ap_001',
} satisfies VideoPlan

const viralPatternCard = {
  pattern_id: 'vp_001',
  source_platform: 'Douyin',
  source_region: 'CN',
  source_category: 'short_drama',
  pattern_name: '尴尬救场',
  original_context_summary: 'A failed ordinary method creates a rescue beat.',
  attention_trigger: ['尴尬场景'],
  first_3_seconds_mechanism: 'Show the problem immediately.',
  retention_mechanism: 'Delay the successful method.',
  emotional_payload: ['relief'],
  structure: { '0_3s': 'conflict', '3_8s': 'failed method' },
  transferable_elements: ['pacing', 'shot logic'],
  non_transferable_elements: ['original dialogue', 'original visuals'],
  suitable_product_types: ['cleaning tools'],
  risk_flags: ['plot may overpower product'],
} satisfies ViralPatternCard

const productAdaptedPattern = {
  adapted_pattern_id: 'ap_001',
  source_pattern_id: 'vp_001',
  product_series_id: 'p_001',
  variant_id: 'sku_001',
  batch_id: 'batch_001',
  video_id: 'video_01',
  adapted_concept: 'A tissue fails before the vacuum solves the problem.',
  hook_type: 'failed_method',
  first_3_seconds_text: 'Tissue? Nope.',
  first_3_seconds_visual: 'A tissue fails to reach the seat gap.',
  emotional_trigger: ['awkward rescue'],
  product_role: 'The practical solution.',
  proof_scene: 'Debris is removed from the gap.',
  cta: 'Check the product card.',
  risk_check: { product_overpowered_by_plot: false },
} satisfies ProductAdaptedPattern

const readinessFlags = {
  tiktok_creative_structure_incomplete: false,
  viral_pattern_not_adapted: false,
  product_adaptation_failed: false,
  plot_overpowers_product_risk: false,
  hook_missing: false,
  proof_missing: false,
  cta_missing: false,
  product_first_visible_late_risk: false,
  product_proof_late_risk: false,
} satisfies CreativeReadinessFlags

const taskPackage = {
  product_series_id: 'p_001',
  variant_id: 'sku_001',
  batch_id: 'batch_001',
  judgement_report: {} as JudgementReport,
  material_check: {} as MaterialCheck,
  image_assets: [] as ImageAsset[],
  creative_direction: {} as CreativeDirection,
  video_batch_plan: {} as VideoBatchPlan,
  shot_asset_plan: {} as ShotAssetPlan,
  available_materials: [],
  missing_materials: [],
  do_not_invent: [],
  output_root: 'outputs/p_001/batch_001/',
  tiktok_creative_requirements: {
    hook: 'required',
    proof: 'required',
    cta: 'required',
  },
  viral_pattern_cards: [viralPatternCard],
  product_adapted_patterns: [productAdaptedPattern],
  creative_transfer_constraints: {
    product_first_visible_max_seconds: 8,
    product_proof_start_max_seconds: 12,
    plot_must_not_overpower_product: true,
    reference_pattern_not_source_copy: true,
  },
  blocked_copying_behaviors: ['copy original dialogue'],
} satisfies CodexTaskPackage

describe('frontend Schema type projections', () => {
  it('expresses the chapter 17 fields on a video plan', () => {
    expect(videoPlan.hook_type).toBe('failed_method')
    expect(videoPlan.proof_point).toContain('debris')
    expect(videoPlan.cta.cta_type).toBe('product_card_click')
    expectTypeOf(videoPlan).toMatchTypeOf<VideoPlan>()
    expectTypeOf<OptionalKeys<VideoPlan>>().toEqualTypeOf<
      | 'hook_type'
      | 'first_3_seconds_text'
      | 'first_3_seconds_visual'
      | 'scroll_stop_reason'
      | 'emotional_trigger'
      | 'script_structure'
      | 'retention_design'
      | 'key_message'
      | 'proof_point'
      | 'cta'
      | 'tiktok_native_style'
      | 'text_overlay_plan'
      | 'sound_or_voiceover_plan'
      | 'viral_pattern_ref'
      | 'adapted_pattern_ref'
    >()
  })

  it('expresses chapter 18 pattern and adapted-pattern objects', () => {
    expect(viralPatternCard.pattern_id).toBe('vp_001')
    expect(productAdaptedPattern.source_pattern_id).toBe('vp_001')
    expectTypeOf(viralPatternCard).toMatchTypeOf<ViralPatternCard>()
    expectTypeOf(productAdaptedPattern).toMatchTypeOf<ProductAdaptedPattern>()
  })

  it('carries creative requirements and both pattern collections in a task package', () => {
    expect(taskPackage.tiktok_creative_requirements.hook).toBe('required')
    expect(taskPackage.viral_pattern_cards).toHaveLength(1)
    expect(taskPackage.product_adapted_patterns).toHaveLength(1)
    expectTypeOf(taskPackage).toMatchTypeOf<CodexTaskPackage>()
    expectTypeOf<OptionalKeys<CodexTaskPackage>>().toEqualTypeOf<
      | 'tiktok_creative_requirements'
      | 'viral_pattern_cards'
      | 'product_adapted_patterns'
      | 'creative_transfer_constraints'
      | 'blocked_copying_behaviors'
    >()
  })

  it('keeps all nine workflow readiness flags in one shared type', () => {
    expect(Object.keys(readinessFlags)).toHaveLength(9)
    expectTypeOf(readinessFlags).toMatchTypeOf<CreativeReadinessFlags>()
  })

  it('keeps all ten root Schema projections available to TypeScript', () => {
    expectTypeOf<ProductSeries>().toBeObject()
    expectTypeOf<Variant>().toBeObject()
    expectTypeOf<ProductProfile>().toBeObject()
    expectTypeOf<JudgementReport>().toBeObject()
    expectTypeOf<MaterialCheck>().toBeObject()
    expectTypeOf<ImageAsset>().toBeObject()
    expectTypeOf<CreativeDirection>().toBeObject()
    expectTypeOf<VideoBatchPlan>().toBeObject()
    expectTypeOf<ShotAssetPlan>().toBeObject()
    expectTypeOf<CodexTaskPackage>().toBeObject()
  })
})
