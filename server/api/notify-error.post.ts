import { notifyAdmin, ADMIN_TEMPLATES } from '~/server/utils/admin-notify'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { type, userName, userEmail, userPhone, formation, amount, errorMessage, page } = body

  if (!type) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le type d\'erreur est requis.',
    })
  }

  // Admin notification (fire-and-forget)
  notifyAdmin(config.sendinblueApiKey, ADMIN_TEMPLATES.ERREUR, {
    ERROR_TYPE: type === 'payment_error' ? 'Erreur de paiement' : 'Erreur creation commande',
    USER_NAME: userName || 'Inconnu',
    USER_EMAIL: userEmail || 'N/A',
    FORMATION: formation || 'Non specifiee',
    ERROR_MESSAGE: errorMessage || 'Aucun detail',
    PAGE: page || 'Inconnue',
  })

  return { success: true, message: 'Notification d\'erreur envoyee' }
})
