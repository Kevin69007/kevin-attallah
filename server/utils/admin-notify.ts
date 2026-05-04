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

export async function sendUserEmail(
  apiKey: string,
  templateId: number,
  to: { email: string; name?: string },
  params: Record<string, string>,
) {
  return axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender: SENDER,
      to: [to],
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
  ).catch((err) => console.error('User email error:', err?.response?.data || err.message))
}

// Template IDs (from Brevo)
export const ADMIN_TEMPLATES = {
  KIT_LANCEMENT: 153,
  FORMATION_GRATUITE: 154,
  PAIEMENT: 155,
  ERREUR: 156,
}

export const USER_TEMPLATES = {
  KIT_LANCEMENT: 129,
  FORMATION_GRATUITE: 131,
  PAIEMENT: 133,
}
