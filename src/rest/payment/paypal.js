// // @flow

// import { Router } from 'express';
// import paypal from 'paypal-rest-sdk';  // eslint-disable-line

// import document from '~/document';

// const router = Router();

// paypal.configure({
//   mode: 'sandbox',
//   client_id: 'AW7PzIc4hmQ8X9KjTJ1xQHCScIP8yJxwZ2Z0tOPOG8WMZeAWWsxTGanTlPh56ceVfVyvfX20SRa5pr88',
//   client_secret: 'EOQF2A8mvTpqfDt3O8t3Aizr1jGnFKVWaSkeGWmt8D5-JHJ6ycuNoEZue9ZI5DqenizAOS_HxVgaq8LF',
// });

// router.post('/pay', (req: any, res: any) => {
//   // 建立使用 paypal 付款
//   const paymentPaypal: any = {
//     intent: 'sale', // 銷售
//     payer: {
//       payment_method: 'paypal', // paypal 付款
//     },
//     redirect_urls: {
//       return_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cancel',
//     },
//     transactions: [{
//       amount: {
//         total: req.body.total, // 後續商品從模型抓取
//         currency: req.body.currency, // 後續商品從模型抓取
//       },
//       description: req.body.description, // 後續商品從模型抓取
//     }],
//   };

//   paypal.payment.create(paymentPaypal, (error: any, paymentRes: any) => {
//     if (error) throw error;

//     // 如果付款方式是 paypal 才執行 (另一種付款方式是 credit_card)
//     if (paymentRes.payer.payment_method === 'paypal') {
//       req.paymentId = paymentRes.id;
//       let redirectUrl: string;

//       for (let i = 0; i < paymentRes.links.length; i++) {
//         const link = paymentRes.links[i];

//         // rel: 'approval_url'
//         if (link.method === 'REDIRECT') {
//           redirectUrl = link.href;
//           res.redirect(redirectUrl);
//         }
//       }
//     }
//   });
// });

// router.get('/success', (req: any, res: any) => {
//   const payer = { payer_id: req.query.PayerID };

//   paypal.payment.execute(req.query.paymentId, payer, (err: any, paymentRes: any) => {
//     if (err) throw err;

//     const account: any = {
//       state: paymentRes.state,
//       description: paymentRes.transactions[0].description,
//       amount: Number(paymentRes.transactions[0].amount.total),
//       create_time: paymentRes.create_time,
//     };

//     document.Account.create(account, (accountError: any) => {
//       if (accountError) throw accountError;
//       res.render('success', account);
//     });
//   });
// });

// router.get('/cancel', (req: any, res: any) => {
//   res.send('Cancel');
// });

// export default router;
