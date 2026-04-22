import axios from 'axios'

const SENDER = { name: 'Kevin Attallah', email: 'formation@kelaj-company.com' }
const ADMIN_EMAILS = [
  { email: 'kevin.jean1@gmail.com', name: 'Kevin' },
  { email: 'formation@kelaj-company.com', name: 'Kevin' },
]

export async function notifyAdmin(apiKey: string, templateId: number, params: Record<string, string>) {
  return axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender: SENDER,
      to: ADMIN_EMAILS,
      templateId,
      params,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'api-key': apiKey,
      },
    },
  ).catch((err) => console.error('Admin notify error:', err?.response?.data || err.message))
}

// Template IDs (from Brevo)
export const ADMIN_TEMPLATES = {
  KIT_LANCEMENT: 153,
  FORMATION_GRATUITE: 154,
  PAIEMENT: 155,
  ERREUR: 156,
}
