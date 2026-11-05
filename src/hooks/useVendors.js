
// useEffect menjalankan permintaan apabila hook dipasang atau perlu dimuat semula.
import { useEffect, useState } from 'react'

// Hook ini memuatkan senarai vendor dan menyediakan status pemuatan, ralat, serta fungsi cuba semula.
export function useVendors() {
  // Simpan data vendor yang berjaya diterima daripada API.
  const [vendors, setVendors] = useState([])
  // Tandakan sama ada permintaan vendor sedang berjalan.
  const [loading, setLoading] = useState(true)
  // Simpan mesej ralat jika permintaan atau data tidak sah.
  const [error, setError] = useState(null)
  // Perubahan nilai ini mencetuskan useEffect untuk memuatkan semula data.
  const [reloadKey, setReloadKey] = useState(0)

  // Jalankan permintaan baharu setiap kali hook dipasang atau reloadKey berubah.
  useEffect(() => {
    // Controller membolehkan permintaan dibatalkan apabila kesannya dibersihkan.
    const controller = new AbortController()

    // Ambil data vendor secara tidak segerak daripada endpoint aplikasi.
    async function fetchVendors() {
      // Tetapkan status permintaan dan kosongkan ralat terdahulu.
      setLoading(true)
      setError(null)

      try {
        // Hantar isyarat pembatalan supaya permintaan boleh dihentikan jika perlu.
        const response = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })

        // Anggap respons HTTP yang gagal sebagai ralat.
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        // Baca isi respons sebagai JSON.
        const data = await response.json()

        // Pastikan data yang diterima berbentuk array sebelum disimpan sebagai senarai vendor.
        if (!Array.isArray(data)) {
          throw new Error('Vendor data must be an array')
        }

        // Simpan senarai vendor yang telah disahkan.
        setVendors(data)
      } catch (err) {
        // Pembatalan bukan ralat yang perlu dipaparkan; ralat lain disimpan untuk UI.
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        // Jangan ubah status pemuatan selepas permintaan dibatalkan.
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    // Mulakan permintaan vendor.
    fetchVendors()

    // Batalkan permintaan apabila kesan dibersihkan atau komponen tidak lagi aktif.
    return () => controller.abort()
  }, [reloadKey])

  // Naikkan kunci supaya useEffect berjalan semula dan memuatkan data terkini.
  function reload() {
    setReloadKey((current) => current + 1)
  }

  // Pulangkan data, status, dan tindakan muat semula kepada komponen pemanggil.
  return { vendors, loading, error, reload }
}
