// server/api/send-data-to-brevo.post.ts

import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Lire le corps de la requête
  const rawBody = await readBody(event);

  // Le body original était parsé via JSON.parse(req.body), on gère les deux cas
  const body = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;

  // Extraire les données envoyées par la requête
  const { name, email, mount, formation, phone, cardholderName, billingAddress } = body;
  const { countryCode, city, postcode } = billingAddress || {};

  // Vérification des données nécessaires
  if (!name || !email || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Données manquantes, veuillez fournir toutes les informations nécessaires.',
    });
  }

  try {
    // Préparer les données à envoyer à Brevo
    const contactData = {
      email,
      attributes: {
        EMAIL: email,
        FIRSTNAME: name,
        PHONE_CABINET: phone,
        JOB_TITLE: formation,
        NOMBRE_DE_CAS_TOTAL: mount,
        VILLE: city,
        CODE_POSTALE: postcode,
        ADRESS: city || '',
      },
      listIds: [53], // Remplacer par l'ID de votre liste dans Brevo
      updateEnabled: true, // Permet la mise à jour des contacts existants
    };

    // Envoyer les données à l'API Brevo
    const response = await axios.post('https://api.brevo.com/v3/contacts', contactData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': config.sendinblueApiKey, // Clé API Brevo depuis runtimeConfig
      },
    });

    // Répondre avec un succès
    return {
      message: 'Contact ajouté ou mis à jour avec succès dans Brevo',
      data: response.data,
    };
  } catch (error: any) {
    console.error("Erreur lors de l'envoi des données à Brevo:", error);

    if (error.response) {
      console.error("Réponse d'erreur de Brevo:");
    } else if (error.request) {
      console.error('Aucune réponse reçue:', error.request);
    } else {
      console.error('Erreur lors de la configuration de la requête:', error.message);
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi des données à Brevo",
      data: {
        message: "Erreur lors de l'envoi des données à Brevo",
        error: error.response ? error.response.data : error.message,
      },
    });
  }
});
