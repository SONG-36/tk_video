import {
  INVALIDATABLE_VARIANT_OBJECT_KEYS,
  VARIANT_BOUND_PAGE_KEYS,
  type InvalidatableVariantObjectKey,
  type WorkflowState,
} from './workflowState'

export function getInvalidatedObjectsWhenVariantChanges(): readonly InvalidatableVariantObjectKey[] {
  return [...INVALIDATABLE_VARIANT_OBJECT_KEYS]
}

export function markVariantBoundObjectsInvalid(
  state: WorkflowState,
  nextSelectedVariantId: string,
): WorkflowState {
  if (state.selected_variant_id === nextSelectedVariantId) {
    return state
  }

  const nextBindings = { ...state.variantBindings }
  VARIANT_BOUND_PAGE_KEYS.forEach((key) => {
    delete nextBindings[key]
  })
  const invalidatedObjects = Object.fromEntries(
    INVALIDATABLE_VARIANT_OBJECT_KEYS.map((key) => [key, true]),
  ) as Record<InvalidatableVariantObjectKey, boolean>

  return {
    ...state,
    status: 'target_variant_selected',
    selected_variant_id: nextSelectedVariantId,
    variantBindings: nextBindings,
    invalidatedObjects,
    seriesSharedMaterialsRetained: true,
  }
}
