import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

function buatStringAcak(panjang) {
  let hasil = "";
  const karakter =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const karakterPanjang = karakter.length;
  for (let i = 0; i < panjang; i++) {
    const randomIndex = Math.floor(Math.random() * karakterPanjang);
    hasil += karakter.charAt(randomIndex);
  }
  return hasil;
}

export const userAuthentication = (req, res) => {
  try {
    const { username, phone, email } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const otp = Math.floor(100000 + Math.random() * 900000);
    var mailOptions = {
      from: "'Gercep Team' <no-reply@gmail.com>",
      to: email,
      subject: "User Authentication",
      html: `
                  <div class="container" style="padding:10px 2%;background:#eaeaea;">
                      <div class="contain" style="max-width:600px;border-radius:5px;padding:0 10px;background:#ffff;">
                          <div class="body" style="padding-left:10px;padding-top:10px;">
                              <p>Masukan Code OTP Ini Pada Halaman Authentikasi Di Aplikasi Anda</p>
                              <div style="line-height:normal">
                                  <h2>Code OTP Anda :</h2><h1 style="font-weight:bold;">${otp}</h1>
                              </div>
                              <div>
                                  <p>Pastikan Anda Tidak Membagi Code Ini Ke Siapapun.</p>
                              </div>
                              <p>Terima kasih.</p>
                              <br>
                              <p>Gercep Team</p>
                              <div style="text-align:center;padding-top:20px;padding-bottom:10px;">
                                  <p style="color: #c7c7c7;">Pesan ini resmi telah dikirim dari Gercep, Inc.</p>
                              </div>
                          </div>
                      </div>
                  </div>
            `,
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Gagal mengirim OTP", error: err });
      } else {
        let arrayOTP = [...String(otp)];
        const authUrl = `https://authorization-server-url/auth-path?username=${username}&client_id=${
          arrayOTP[0]
        }${buatStringAcak(17)}${arrayOTP[1]}&redirect_uri=https://gercep.${
          arrayOTP[2]
        }${buatStringAcak(17)}${arrayOTP[3]}.com&state=${
          arrayOTP[4]
        }${buatStringAcak(17)}${arrayOTP[5]}&tachydromio=${email}&phonology=${phone}`;
        res
          .status(200)
          .json({
            success: true,
            message: "Authentication Prosess",
            authUrl: authUrl,
          });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Terjadi kesalahan pada server",
        error: error,
      });
  }
};
