import { NavLink, Outlet } from 'react-router'
import { pageMeta } from './pages/pageMeta'

function App() {
  return (
    <div className="app-shell">
      <nav aria-label="页面导航">
        <ol className="page-navigation">
          {pageMeta.map((page, index) => (
            <li key={page.key}>
              <NavLink to={page.examplePath}>
                {index + 1}. {page.title}
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
      <main className="route-content">
        <Outlet />
      </main>
    </div>
  )
}

export function NotFoundPage() {
  return (
    <section className="route-placeholder">
      <h1>404</h1>
      <p>Page not found.</p>
    </section>
  )
}

export default App
