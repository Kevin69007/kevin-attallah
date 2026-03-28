import axios from 'axios'

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
        listIds: [99],
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
    const brevoError = error?.response?.data || {}
    const brevoCode = brevoError?.code || ''
    const brevoMsg = brevoError?.message || error.message
    console.error('Erreur free-formation-lead:', JSON.stringify(brevoError))

    if (brevoCode === 'invalid_parameter' && brevoMsg?.includes('email')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Adresse email invalide. Veuillez utiliser une adresse email valide.',
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'enregistrement",
      data: { brevoCode, brevoMsg },
    })
  }
})
