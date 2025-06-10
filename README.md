# Order Form Lisensi Template (Vercel + Nodemailer)

## Fitur
- Pilih jenis lisensi: Personal, Developer, Commercial
- Form order: nama, email, WA, alamat, catatan, upload bukti transfer
- Kirim email ke admin dengan attachment (bukti transfer)
- Redirect ke WhatsApp setelah submit

## Cara Pakai & Deploy
1. **Fork/clone** repo ini ke GitHub Anda.
2. **Deploy ke [Vercel](https://vercel.com/new)** (Next.js project, walau hanya pakai API + HTML static).
3. **Set environment variable** di dashboard Vercel:
   - `EMAIL_FROM` : Gmail pengirim
   - `EMAIL_PASS` : App Password Gmail (lihat https://myaccount.google.com/apppasswords)
   - `EMAIL_ADMIN` : Email tujuan admin
4. **Ganti** `62ADMINWA` di `index.html` ke nomor WA admin (tanpa tanda +, misal `6281234567890`).
5. **Selesai!** Form bisa diakses, email order akan masuk ke admin.

## Catatan
- Attachment max 10MB (limit Gmail SMTP).
- Jika ingin ganti SMTP lain, edit code di `api/order.js`.
- Jika ada error, cek log di dashboard Vercel.

---

Lisensi template dan harga sesuai gambar pada halaman utama.