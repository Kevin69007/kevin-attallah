import axios from 'axios'
import { notifyAdmin, ADMIN_TEMPLATES } from '~/server/utils/admin-notify'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { firstName, lastName, email, phone } = body

  if (!firstName || !lastName || !email || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tous les champs sont obligatoires.',
    })
  }

  try {
    await axios.post(
      'https://api.brevo.com/v3/contacts',
      {
        email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          SMS: phone,
          LEAD_SOURCE: 'formation_gratuite',
        },
        listIds: [98],
        updateEnabled: true,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'api-key': config.sendinblueApiKey,
        },
      },
    )

    // Admin notification (fire-and-forget)
    notifyAdmin(config.sendinblueApiKey, ADMIN_TEMPLATES.FORMATION_GRATUITE, {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      EMAIL: email,
      PHONE: phone,
    })

    return { success: true, message: 'Inscription enregistrée avec succès' }
  } catch (error: any) {
    console.error('Erreur free-formation-lead:', error)
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'enregistrement",
      data: { error: error.message },
    })
  }
})
