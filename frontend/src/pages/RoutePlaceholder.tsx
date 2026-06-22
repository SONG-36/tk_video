import { useLocation } from 'react-router'
import type { PageDefinition } from './pageMeta'

interface RoutePlaceholderProps {
  page: PageDefinition
}

export function RoutePlaceholder({ page }: RoutePlaceholderProps) {
  const location = useLocation()

  return (
    <section className="route-placeholder">
      <h1>{page.title}</h1>
      <p>
        <strong>Page key:</strong> {page.key}
      </p>
      <p>
        <strong>Current route:</strong> {location.pathname}
      </p>
      <p>This page is a route placeholder. No business logic implemented.</p>
    </section>
  )
}
