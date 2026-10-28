
function MenuItemCard({
  item,
  onAdd,
  onView,
  disabled = false,
}) {
  return (
    <article className="menu-card card">
      <div>
        <h3
          onClick={() => onView?.(item)}
          title="Click to add to Recently Viewed"
          style={{ cursor: 'pointer' }}
        >
          {item.name}
        </h3>

        {item.description && <p>{item.description}</p>}

        {item.category && (
          <p className="muted">Category: {item.category}</p>
        )}

        {item.popular && <span className="popular">Popular</span>}
      </div>

      <div className="menu-card-bottom">
        <strong>RM {Number(item.price).toFixed(2)}</strong>

        <button
          type="button"
          className="btn"
          disabled={disabled}
          onClick={() => onAdd(item)}
        >
          {disabled ? 'Unavailable' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

export default MenuItemCard
