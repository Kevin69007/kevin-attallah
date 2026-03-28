// server/api/submit-form.post.ts

import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);
  const { first_name, last_name, company, subject, message, email } = body;

  try {
    // Configuration de l'API Brevo pour ajouter un contact
    const response = await axios.post(
      'https://api.brevo.com/v3/contacts', // URL de l'API Brevo pour ajouter un contact
      {
        email: email,
        attributes: {
          FIRSTNAME: first_name,
          LASTNAME: last_name,
          COMPANY_NAME: company || 'Non précisé',
          SUBJECT: subject || 'Non précisé',
          OBSERVATION: message || 'Non précisé',
        },
        listIds: [52],
        updateEnabled: true,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'api-key': config.sendinblueApiKey, // Clé API Brevo depuis runtimeConfig
        },
      }
    );

    // Répondre avec un message de succès
    return { message: 'Formulaire soumis avec succès', data: response.data };
  } catch (error: any) {
    console.error("Erreur lors de l'envoi du formulaire:", error);
    // Répondre avec une erreur si l'API échoue
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi du formulaire",
      data: { message: "Erreur lors de l'envoi du formulaire", error: error.message },
    });
  }
});
