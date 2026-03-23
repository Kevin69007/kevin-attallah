// server/api/payment-received.post.ts
// User email handled by Brevo workflow (list 53). Admin notification sent here via SMTP API.


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

  return { message: 'Notification de paiement envoyée.' }
})
