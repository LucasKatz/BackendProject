import nodemailer from "nodemailer";
import { deleteCart } from "./cartsRouteDBController.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "l.katz92@gmail.com",
    pass: "wgtmyxoujarkujym",
  },
});

export const sendEmail = async (req, res) => {
  try {
    const { ticketHTML } = req.body;
    const email = req.session.user.email;

    const mailOptions = {
      from: "adminCoder@coder.com",
      to: email,
      subject: "Copia del Ticket de Compra",
      html: ticketHTML,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Correo electrónico enviado a ${email}`);

    res
      .status(200)
      .json({ message: "Correo electrónico enviado con éxito", email });
  } catch (error) {
    console.error(`Error al enviar el correo electrónico: ${error}`);
    res
      .status(500)
      .json({ error: `Error al enviar el correo electrónico` });
  }
};
