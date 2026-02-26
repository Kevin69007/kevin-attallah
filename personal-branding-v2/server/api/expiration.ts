// server/api/expiration.ts

import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Configurez Supabase avec les variables d'environnement via runtimeConfig
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseAnonKey
  );

  const method = event.method;

  // Gestion de la méthode GET pour récupérer l'heure d'expiration
  if (method === 'GET') {
    try {
      const query = getQuery(event);
      const userId = query.userId as string; // Récupérer l'ID utilisateur depuis la query string

      // Requête à Supabase pour récupérer l'heure d'expiration pour cet utilisateur
      const { data, error } = await supabase
        .from('expirations') // Nom de la table dans la base de données
        .select('end_time') // Sélectionner l'heure d'expiration
        .eq('user_id', userId) // Filtrer par ID utilisateur
        .single(); // S'assurer qu'il y a une seule entrée pour cet utilisateur

      // Si une erreur se produit, on renvoie une erreur au client
      if (error) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Erreur de récupération des données',
        });
      }

      // Retourner l'heure d'expiration
      return { endTime: data.end_time };
    } catch (error: any) {
      // Si c'est déjà une erreur createError, la relancer
      if (error.statusCode) {
        throw error;
      }
      // Gestion des erreurs générales
      throw createError({
        statusCode: 500,
        statusMessage: 'Une erreur est survenue lors de la récupération des données',
      });
    }
  }

  // Gestion de la méthode POST pour mettre à jour ou ajouter l'heure d'expiration
  if (method === 'POST') {
    try {
      const body = await readBody(event);
      const { userId, endTime } = body; // Récupérer les données envoyées dans le corps de la requête

      // Ajouter ou mettre à jour l'heure d'expiration pour cet utilisateur
      const { data, error } = await supabase
        .from('expirations')
        .upsert([{ user_id: userId, end_time: endTime }]); // upsert permet de créer ou mettre à jour la ligne

      // Si une erreur se produit, on renvoie une erreur au client
      if (error) {
        throw createError({
          statusCode: 500,
          statusMessage: "Erreur lors de l'ajout de l'expiration",
        });
      }

      // Retourner un message de succès
      return { message: 'Expiration mise à jour avec succès', data };
    } catch (error: any) {
      // Si c'est déjà une erreur createError, la relancer
      if (error.statusCode) {
        throw error;
      }
      // Gestion des erreurs générales
      throw createError({
        statusCode: 500,
        statusMessage: 'Une erreur est survenue lors de la mise à jour des données',
      });
    }
  }

  // Si la méthode HTTP utilisée n'est pas GET ou POST, on renvoie une erreur 405 (Méthode non autorisée)
  throw createError({
    statusCode: 405,
    statusMessage: 'Méthode HTTP non autorisée',
  });
});
