import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { lastName, firstName, email, phone } = body

  if (!lastName || !firstName || !email || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tous les champs sont obligatoires.',
    })
  }

  const normalizedPhone = normalizePhone(phone)
  if (!normalizedPhone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Numéro de téléphone invalide.',
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
          PHONE: normalizedPhone,
          LEAD_SOURCE: 'kit_lancement',
          DOWNLOAD_LINK: 'https://www.swisstransfer.com/d/fe0f0fd8-6680-4704-bac7-524bc6370da5',
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
    notifyAdmin(config.sendinblueApiKey, ADMIN_TEMPLATES.KIT_LANCEMENT, {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      EMAIL: email,
      PHONE: normalizedPhone,
    })

    return { success: true, message: 'Inscription enregistrée avec succès' }
  } catch (error: any) {
    const brevoError = error?.response?.data || {}
    const brevoCode = brevoError?.code || ''
    const brevoMsg = brevoError?.message || error.message
    console.error('Erreur kit-lancement:', JSON.stringify(brevoError))

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
