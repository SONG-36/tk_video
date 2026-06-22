import { useLocation } from 'react-router'
import {
  canEnterPage,
  getBlockedReason,
} from '../state/workflowGuards'
import {
  getRelevantFlagsForPage,
  isVariantBoundPage,
  mockWorkflowState,
} from '../state/workflowState'
import { getNextPage } from '../state/workflowTransitions'
import type { PageDefinition, PageKey } from './pageMeta'

interface RoutePlaceholderProps {
  page: PageDefinition
}

export function RoutePlaceholder({ page }: RoutePlaceholderProps) {
  const location = useLocation()
  const pageKey = page.key as PageKey
  const allowed = canEnterPage(pageKey, mockWorkflowState)
  const blockedReason = getBlockedReason(pageKey, mockWorkflowState)
  const nextPage = getNextPage(pageKey)
  const relevantFlags = getRelevantFlagsForPage(pageKey)

  return (
    <section className="route-placeholder">
      <h1>{page.title}</h1>
      <p>
        <strong>Page key:</strong> {page.key}
      </p>
      <p>
        <strong>Current route:</strong> {location.pathname}
      </p>
      <p>
        <strong>Current mock status:</strong> {mockWorkflowState.status}
      </p>
      <p>
        <strong>Entry allowed:</strong> {allowed ? 'yes' : 'no'}
      </p>
      {blockedReason && (
        <p role="status">
          <strong>Blocked reason:</strong> {blockedReason}
        </p>
      )}
      <p>
        <strong>Next page:</strong>{' '}
        {nextPage ? `${nextPage.title} (${nextPage.key})` : 'none'}
      </p>
      {isVariantBoundPage(pageKey) && (
        <p>
          <strong>selected_variant_id binding:</strong>{' '}
          {mockWorkflowState.selected_variant_id ?? 'required but not selected'}
        </p>
      )}
      {relevantFlags.length > 0 && (
        <div>
          <strong>Page incomplete / risk flags:</strong>
          <ul className="workflow-flag-list">
            {relevantFlags.map((flag) => (
              <li key={flag}>
                {flag}: {mockWorkflowState.flags[flag] ? 'active' : 'clear'}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>This page is a route placeholder. No business logic implemented.</p>
    </section>
  )
}
