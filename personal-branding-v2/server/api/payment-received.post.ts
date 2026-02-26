// server/api/payment-received.post.ts

import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);
  const { first_name, last_name, company, subject, message, email } = body;

  // Vérifie que toutes les informations nécessaires sont présentes
  if (!first_name || !last_name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tous les champs requis doivent être remplis.',
    });
  }

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: `${first_name} ${last_name}`,
          email: 'kevin@cuspide.fr', // L'email de l'expéditeur (remplacer avec le vôtre)
        },
        to: [
          {
            email: 'asathoud16@gmail.com', // L'email du destinataire
            name: 'Recipient Name',
          },
        ],
        subject: subject || 'Message depuis le formulaire de contact',
        htmlContent: `
          <html>
            <body>
              <p><strong>Nom :</strong> ${first_name} ${last_name}</p>
              <p><strong>Société :</strong> ${company || 'N/A'}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Message :</strong></p>
              <p>${message}</p>
            </body>
          </html>
        `,
      },
      {
        headers: {
          accept: 'application/json',
          'api-key': config.sendinblueApiKey, // Clé API Brevo depuis runtimeConfig
          'content-type': 'application/json',
        },
      }
    );

    return { message: 'Message envoyé avec succès !', data: response.data };
  } catch (error: any) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi du message.",
      data: { message: "Erreur lors de l'envoi du message.", error: error.message },
    });
  }
});
