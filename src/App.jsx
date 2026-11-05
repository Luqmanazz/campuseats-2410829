
// Komponen penghala untuk aplikasi pelayar.
import { BrowserRouter, Routes, Route } from 'react-router'
// Provider membolehkan semua halaman mengakses state troli dan pesanan.
import { CartProvider } from './context/CartProvider.jsx'
// Layout bersama untuk header, kandungan halaman, dan footer.
import Layout from './components/Layout.jsx'
// Import halaman yang dipetakan kepada laluan aplikasi.
import HomePage from './pages/HomePage.jsx'
import VendorPage from './pages/VendorPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// Komponen akar yang mengatur navigasi dan konteks aplikasi.
function App() {
  return (
    // Aktifkan navigasi berasaskan URL untuk aplikasi pelayar.
    <BrowserRouter>
      {/* Kongsi state troli dan pesanan dengan semua halaman di dalam provider. */}
      <CartProvider>
        {/* Senaraikan laluan aplikasi dan komponen yang perlu dipaparkan. */}
        <Routes>
          {/* Semua laluan bersarang menggunakan layout yang sama. */}
          <Route path="/" element={<Layout />}>
            {/* Halaman utama dipaparkan pada laluan akar. */}
            <Route index element={<HomePage />} />
            {/* Halaman vendor menggunakan ID daripada URL. */}
            <Route path="vendor/:id" element={<VendorPage />} />
            {/* Laluan untuk melihat troli dan membuat checkout. */}
            <Route path="cart" element={<CartPage />} />
            {/* Laluan untuk melihat sejarah pesanan. */}
            <Route path="orders" element={<OrdersPage />} />
            {/* Laluan tangkapan untuk URL lain yang tidak dikenali. */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

// Export supaya aplikasi boleh dipasang sebagai komponen akar React.
export default App
