// server/api/payment-received.post.ts
// Sends both admin notification and user confirmation directly via Brevo SMTP API.


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { name, email, phone, formation, mount, billingAddress } = body

  if (!name || !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nom et email sont requis.',
    })
  }

  const amount = mount ? `${(mount / 100).toFixed(2)}€` : '0€'

  // Admin notification (fire-and-forget)
  notifyAdmin(config.sendinblueApiKey, ADMIN_TEMPLATES.PAIEMENT, {
    NAME: name,
    EMAIL: email,
    PHONE: phone || 'N/A',
    FORMATION: formation || 'N/A',
    AMOUNT: amount,
    CITY: billingAddress?.city || 'N/A',
    POSTCODE: billingAddress?.postcode || 'N/A',
  })

  // User confirmation email (fire-and-forget)
  sendUserEmail(
    config.sendinblueApiKey,
    USER_TEMPLATES.PAIEMENT,
    { email, name },
    {
      NAME: name,
      FORMATION: formation || 'Formation',
      AMOUNT: amount,
    },
  )

  return { message: 'Notification de paiement envoyée.' }
})
