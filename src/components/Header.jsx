
function Header({ cartCount }) {
  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>

      <nav className="nav" aria-label="Main navigation">
        <span>
          Cart <span className="badge">{cartCount}</span>
        </span>
      </nav>
    </header>
  )
}

export default Header
