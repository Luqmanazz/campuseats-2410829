
import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Return to Vendors</Link>
    </section>
  )
}

export default NotFoundPage
