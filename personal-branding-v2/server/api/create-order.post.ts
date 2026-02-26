// server/api/create-order.post.ts

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Lire le corps de la requête
  const body = await readBody(event);

  // Récupérer les données de la requête
  const { amount, currency, description } = body;

  // Validation des données
  if (!amount || !currency) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Champs obligatoires manquants : montant et devise',
    });
  }

  // Données de la commande
  const orderData = JSON.stringify({
    amount: Number(amount) * 100, // Convertir en nombre
    currency: currency.toUpperCase(), // Convertir en majuscules
    description,
    //capture_mode: 'automatic', // Mode de capture automatique
  });

  try {
    // Envoyer la requête à l'API Revolut https://sandbox-merchant.revolut.com/api/orders https://merchant.revolut.com/api/orders
    const response = await fetch('https://merchant.revolut.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${config.revolutApiKey}`,
        'Revolut-Api-Version': '2024-09-01',
      },
      body: orderData,
    });

    // Traiter la réponse
    const data = await response.json();

    if (response.ok) {
      // Retourner les données de la réponse
      return data;
    } else {
      // Retourner les erreurs de l'API Revolut
      throw createError({
        statusCode: response.status,
        statusMessage: 'Impossible de créer la commande',
        data: { error: 'Impossible de créer la commande', details: data },
      });
    }
  } catch (error: any) {
    // Si c'est déjà une erreur createError, la relancer
    if (error.statusCode) {
      throw error;
    }
    // Gestion des erreurs réseau ou autres
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: { error: 'Internal Server Error', details: error.message },
    });
  }
});
