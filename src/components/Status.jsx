
// Paparkan status pemuatan yang turut diumumkan kepada teknologi bantuan.
export function Loading() {
  return (
    <p className="muted" role="status">
      Loading menus...
    </p>
  )
}

// Paparkan mesej ralat dan sediakan tindakan untuk mencuba semula.
export function ErrorMessage({ message, onRetry }) {
  // role="alert" membantu pembaca skrin mengesan mesej ralat ini.
  return (
    <div className="card error" role="alert">
      <p>Could not load menus: {message}</p>
      {/* Panggil fungsi cuba semula apabila pengguna menekan butang. */}
      <button type="button" className="btn" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}

// Komponen lalai ini tidak memaparkan kandungan; eksport bernama di atas digunakan untuk status.
function Status() {
  return null
}

// Eksport lalai bagi komponen Status.
export default Status
