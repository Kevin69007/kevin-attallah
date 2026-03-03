// server/api/payment-received.post.ts

import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);
  const { name, email, phone, formation, mount, billingAddress } = body;

  if (!name || !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nom et email sont requis.',
    });
  }

  const city = billingAddress?.city || '';
  const postcode = billingAddress?.postcode || '';
  const amount = mount ? (mount / 100).toFixed(2) : '0';

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'Kevin Attallah',
          email: 'kevin@cuspide.fr',
        },
        to: [
          {
            email: 'asathoud16@gmail.com',
            name: 'Kevin Attallah',
          },
        ],
        subject: `Nouveau paiement : ${formation || 'Formation'}`,
        htmlContent: `
          <html>
            <body>
              <h2>Nouveau paiement reçu</h2>
              <p><strong>Formation :</strong> ${formation || 'N/A'}</p>
              <p><strong>Montant :</strong> ${amount}€</p>
              <hr/>
              <p><strong>Nom :</strong> ${name}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Téléphone :</strong> ${phone || 'N/A'}</p>
              <p><strong>Ville :</strong> ${city || 'N/A'}</p>
              <p><strong>Code postal :</strong> ${postcode || 'N/A'}</p>
            </body>
          </html>
        `,
      },
      {
        headers: {
          accept: 'application/json',
          'api-key': config.sendinblueApiKey,
          'content-type': 'application/json',
        },
      }
    );

    return { message: 'Notification de paiement envoyée.', data: response.data };
  } catch (error: any) {
    console.error('Payment notification error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi de la notification.",
      data: { error: error.message },
    });
  }
});
