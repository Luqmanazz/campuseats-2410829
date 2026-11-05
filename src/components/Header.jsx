
// NavLink digunakan untuk pautan navigasi yang mengetahui laluan aktif.
import { NavLink } from 'react-router'
// useCart menyediakan maklumat troli untuk dipaparkan dalam header.
import { useCart } from '../hooks/useCart.js'

// Komponen header memaparkan nama aplikasi dan pautan navigasi utama.
function Header() {
  // Ambil bilangan item dalam troli daripada hook useCart.
  const { count } = useCart()

  return (
    // Bahagian atas halaman yang mengandungi logo dan navigasi.
    <header className="header">
      {/* Nama aplikasi yang berfungsi sebagai logo teks. */}
      <h1 className="logo">CampusEats</h1>

      {/* Kumpulkan pautan ke halaman utama, pesanan, dan troli. */}
      <nav className="nav">
        {/* end memastikan pautan ini aktif hanya pada laluan utama yang tepat. */}
        <NavLink to="/" end className="link">
          Vendors
        </NavLink>

        {/* Pautan ke halaman yang menyenaraikan pesanan pengguna. */}
        <NavLink to="/orders" className="link">
          My Orders
        </NavLink>

        {/* Pautan ke troli dengan lencana yang memaparkan bilangan item. */}
        <NavLink to="/cart" className="link cart">
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  )
}

// Export supaya header boleh digunakan dalam komponen atau susun atur aplikasi.
export default Header
