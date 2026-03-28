// server/api/subscribe.post.ts

import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);
  const { email } = body;

  try {
    // Envoi des données à l'API Brevo pour ajouter l'email à la liste
    const response = await axios.post(
      'https://api.brevo.com/v3/contacts', // URL de l'API Brevo pour ajouter un contact
      {
        email: email,
        attributes: {
          EMAIL: email,
        },
        listIds: [55],
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

    // Réponse de succès
    return { message: 'Formulaire soumis avec succès', data: response.data };
  } catch (error: any) {
    console.error("Erreur lors de l'envoi à Brevo:", error);
    // Réponse d'erreur
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi du formulaire",
      data: { message: "Erreur lors de l'envoi du formulaire", error: error.message },
    });
  }
});
