import { Router } from 'express';
import { createTransport } from 'nodemailer';

const router = Router();

router.post('/', (req, res, next) => {
  const {
    user, pass,
    from, to, subject, text
  } = req.body;

  const transporter = createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

  const mailOptions = { from, to, subject, text };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) next(error);
    res.json({ message: info.response });
  });
});

export default router;
