
// useState digunakan untuk menyimpan nilai borang dan mesej ralat dalam komponen.
import { useState } from 'react'

// Senarai pilihan Mahallah yang dipaparkan dalam menu pilihan.
const MAHALLAHS = [
  'Ali',
  'Aminah',
  'Faruq',
  'Asiah',
  'Bilal',
  'Hafsa',
  'Uthman',
  'Zubair',
]

// Semak nilai borang dan pulangkan objek yang mengandungi ralat bagi medan tidak sah.
function validate(values) {
  // Objek ini bermula kosong; medan ralat hanya ditambah jika semakan gagal.
  const errors = {}

  // Buang ruang kosong di awal dan akhir sebelum menyemak panjang nama.
  if (values.name.trim().length < 3) {
    errors.name = 'Enter your name (at least 3 characters).'
  }

  // Pastikan pengguna telah memilih satu Mahallah.
  if (!values.mahallah) {
    errors.mahallah = 'Please select your mahallah.'
  }

  // Pastikan masa diisi dan berada dalam julat waktu pengambilan yang dibenarkan.
  if (
    !values.pickupTime ||
    values.pickupTime < '07:00' ||
    values.pickupTime > '22:00'
  ) {
    errors.pickupTime =
      'Choose a pickup time between 07:00 and 22:00.'
  }

  // Pulangkan semua ralat supaya boleh dipaparkan berhampiran medan berkaitan.
  return errors
}

// Borang checkout menerima fungsi untuk menghantar pesanan daripada komponen induk.
function CheckoutForm({ onPlaceOrder }) {
  // Simpan nilai semasa bagi setiap medan borang.
  const [values, setValues] = useState({
    name: '',
    mahallah: '',
    pickupTime: '',
  })

  // Simpan ralat validasi yang perlu dipaparkan kepada pengguna.
  const [errors, setErrors] = useState({})

  // Kemas kini nilai medan yang berubah tanpa memadam nilai medan lain.
  function handleChange(event) {
    // Ambil nama medan dan nilai baharu daripada input yang mencetuskan acara.
    const { name, value } = event.target

    // Salin nilai sedia ada, kemudian kemas kini medan yang sepadan dengan name.
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }))
  }

  // Urus penghantaran borang dan jalankan validasi sebelum membuat pesanan.
  function handleSubmit(event) {
    // Halang pelayar daripada memuat semula halaman secara automatik.
    event.preventDefault()

    // Semak semua nilai borang dan simpan ralat untuk dipaparkan.
    const foundErrors = validate(values)
    setErrors(foundErrors)

    // Hantar pesanan hanya jika tiada medan yang gagal validasi.
    if (Object.keys(foundErrors).length === 0) {
      onPlaceOrder(values)
    }
  }

  // noValidate mematikan validasi lalai pelayar supaya validasi kita digunakan.
  return (
    <form
      className="card form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2>Checkout</h2>

      {/* Input nama dikawal oleh state values dan dikemas kini melalui handleChange. */}
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
      />
      {/* Paparkan ralat nama hanya apabila validasi menghasilkan ralat. */}
      {errors.name && (
        <p className="field-error">{errors.name}</p>
      )}

      {/* Menu ini membolehkan pengguna memilih Mahallah daripada senarai yang ditetapkan. */}
      <label htmlFor="mahallah">Mahallah</label>
      <select
        id="mahallah"
        name="mahallah"
        value={values.mahallah}
        onChange={handleChange}
      >
        <option value="">Select...</option>
        {/* Hasilkan satu pilihan untuk setiap nama Mahallah. */}
        {MAHALLAHS.map((mahallah) => (
          <option key={mahallah} value={mahallah}>
            {mahallah}
          </option>
        ))}
      </select>
      {/* Paparkan ralat pilihan Mahallah jika pengguna belum memilihnya. */}
      {errors.mahallah && (
        <p className="field-error">{errors.mahallah}</p>
      )}

      {/* Input masa untuk pengguna menetapkan waktu mengambil pesanan. */}
      <label htmlFor="pickupTime">Pickup time</label>
      <input
        id="pickupTime"
        name="pickupTime"
        type="time"
        value={values.pickupTime}
        onChange={handleChange}
      />
      {/* Paparkan ralat jika masa kosong atau di luar julat yang dibenarkan. */}
      {errors.pickupTime && (
        <p className="field-error">{errors.pickupTime}</p>
      )}

      {/* Klik butang ini akan mencetuskan handleSubmit pada borang. */}
      <button type="submit" className="btn">
        Place order
      </button>
    </form>
  )
}

// Export supaya borang checkout boleh digunakan dalam komponen lain.
export default CheckoutForm
