import formidable from "formidable";
import nodemailer from "nodemailer";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const form = new formidable.IncomingForm();
  form.uploadDir = "/tmp";
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form parse error" });

    // Extract data
    const { nama, email, wa, alamat, lisensi, catatan } = fields;
    const bukti = files.bukti;

    // Set harga sesuai lisensi
    let harga = "Rp 120.000";
    if (lisensi === "developer") harga = "Rp 225.000";
    if (lisensi === "commercial") harga = "Rp 300.000";

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Attach file if exists
    const attachments = bukti
      ? [{
          filename: bukti.originalFilename,
          path: bukti.filepath,
        }]
      : [];

    // Email content
    await transporter.sendMail({
      from: `"Order Template" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_ADMIN,
      subject: `Order ${lisensi} license - ${nama}`,
      html: `
        <h2>Order Baru</h2>
        <ul>
          <li><b>Nama:</b> ${nama}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>WhatsApp:</b> ${wa}</li>
          <li><b>Alamat:</b> ${alamat}</li>
          <li><b>Lisensi:</b> ${lisensi} (${harga})</li>
          <li><b>Catatan:</b> ${catatan || '-'}</li>
        </ul>
        <p><b>Bukti transfer terlampir.</b></p>
      `,
      attachments,
    });

    // Hapus file temp (Vercel: /tmp)
    if (attachments.length && fs.existsSync(bukti.filepath)) {
      fs.unlinkSync(bukti.filepath);
    }

    res.json({ ok: true });
  });
      }
