import { pageMeta, type PageKey } from '../pages/pageMeta'
import {
  WORKFLOW_STATUS_SEQUENCE,
  type WorkflowStatus,
} from './workflowStatus'

export function getNextPage(pageKey: PageKey) {
  const currentIndex = pageMeta.findIndex((page) => page.key === pageKey)
  return pageMeta[currentIndex + 1] ?? null
}

export function getPreviousPage(pageKey: PageKey) {
  const currentIndex = pageMeta.findIndex((page) => page.key === pageKey)
  return pageMeta[currentIndex - 1] ?? null
}

export function getNextStatus(status: WorkflowStatus): WorkflowStatus {
  if (status === 'blocked') {
    return 'blocked'
  }

  const currentIndex = WORKFLOW_STATUS_SEQUENCE.indexOf(status)
  return WORKFLOW_STATUS_SEQUENCE[currentIndex + 1] ?? 'completed'
}
