/**
 * Update Brevo email templates to light mode.
 * Run: BREVO_API_KEY=xkeysib-... npx tsx scripts/update-brevo-templates.ts
 */

import config from './brevo-config.json'

const API_KEY = process.env.BREVO_API_KEY || process.env.NUXT_SENDINBLUE_API_KEY
if (!API_KEY) {
  console.error('Missing BREVO_API_KEY. Run: BREVO_API_KEY=xkeysib-... npx tsx scripts/update-brevo-templates.ts')
  process.exit(1)
}

const BASE = 'https://api.brevo.com/v3'
const LOGO_URL = 'https://www.kevin-attallah.com/img/logo-2.png'
const SITE_URL = 'https://www.kevin-attallah.com'
const CONTACT_EMAIL = 'contact@kevin-attallah.com'

const PURPLE = '#6C2BD9'
const ORANGE = '#C67651'

const SOCIALS = {
  Facebook: 'https://web.facebook.com/profile.php?id=61563587830934',
  LinkedIn: 'https://www.linkedin.com/in/kevin-a2ta2l',
  YouTube: 'https://www.youtube.com/@kevin-A2ta2l',
  Instagram: 'https://www.instagram.com/kevin_attallah_',
  TikTok: 'https://www.tiktok.com/@kevin_attallah',
}

function buildTemplate(heading: string, bodyHtml: string, isError = false): string {
  const accentColor = isError ? '#E53E3E' : PURPLE
  const socialLinks = Object.entries(SOCIALS)
    .map(([name, url]) => `<a href="${url}" style="color:${ORANGE};text-decoration:none;font-size:13px;">${name}</a>`)
    .join(' &nbsp;|&nbsp; ')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#F5F5F5;font-family:'Space Grotesk',Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- LOGO -->
<tr><td align="center" style="padding:32px 0 24px;">
  <a href="${SITE_URL}"><img src="${LOGO_URL}" alt="Kevin Attallah" width="150" style="display:block;border:0;max-width:150px;height:auto;"></a>
</td></tr>

<!-- ACCENT LINE -->
<tr><td style="height:3px;background-color:${accentColor};"></td></tr>

<!-- CONTENT CARD -->
<tr><td style="background-color:#FFFFFF;padding:40px 36px;border:1px solid #E5E5E5;border-top:none;">
  <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:${accentColor};font-family:'Space Grotesk',Arial,sans-serif;text-transform:uppercase;">${heading}</h1>
  <div style="font-size:15px;line-height:1.7;color:#333333;font-family:'Space Grotesk',Arial,sans-serif;">
    ${bodyHtml}
  </div>
</td></tr>

<!-- FOOTER -->
<tr><td style="padding:28px 24px;text-align:center;">
  <p style="margin:0 0 12px;font-size:13px;color:#666666;font-family:'Space Mono','Courier New',monospace;">
    ${socialLinks}
  </p>
  <p style="margin:0 0 8px;font-size:12px;color:#888888;font-family:'Space Mono','Courier New',monospace;">
    <a href="mailto:${CONTACT_EMAIL}" style="color:${ORANGE};text-decoration:none;">${CONTACT_EMAIL}</a>
  </p>
  <p style="margin:0;font-size:11px;color:#999999;font-family:'Space Mono','Courier New',monospace;">
    &copy; ${new Date().getFullYear()} Kevin Attallah. Tous droits réservés.
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function ctaButton(text: string, url: string): string {
  return `<table cellpadding="0" cellspacing="0" style="margin:24px 0;">
<tr><td align="center" style="background-color:${PURPLE};border-radius:6px;">
  <a href="${url}" style="display:inline-block;padding:14px 32px;color:#FFFFFF;font-family:'Space Grotesk',Arial,sans-serif;font-size:15px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">${text}</a>
</td></tr>
</table>`
}

function infoRow(label: string, value: string): string {
  return `<tr>
<td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-weight:700;color:#333;width:40%;font-size:14px;">${label}</td>
<td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#555;font-size:14px;">${value}</td>
</tr>`
}

function infoTable(rows: [string, string][]): string {
  const rowsHtml = rows.map(([l, v]) => infoRow(l, v)).join('')
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;margin:16px 0;">
${rowsHtml}
</table>`
}

const templates: Record<string, { subject: string; html: string }> = {
  'kit-lancement-user': {
    subject: 'Votre Kit de Lancement est prêt !',
    html: buildTemplate(
      'Votre Kit de Lancement',
      `<p>Bonjour {{ params.FIRSTNAME }},</p>
<p>Merci pour votre intérêt ! Votre Kit de Lancement pour créer votre entreprise est prêt.</p>
<p>Cliquez sur le bouton ci-dessous pour le télécharger :</p>
${ctaButton('Télécharger mon Kit', '{{ params.DOWNLOAD_LINK }}')}
<p style="font-size:13px;color:#777;">Ce lien est valable pour une durée limitée. Pensez à télécharger votre kit rapidement.</p>
<p>À très vite,<br><strong>Kevin Attallah</strong></p>`
    ),
  },
  'kit-lancement-admin': {
    subject: 'Nouveau lead Kit : {{ params.FIRSTNAME }}',
    html: buildTemplate(
      'Nouvelle demande de Kit Lancement',
      `<p>Un nouveau lead a demandé le Kit de Lancement :</p>
${infoTable([['Prénom', '{{ params.FIRSTNAME }}'], ['Email', '{{ params.EMAIL }}']])}`
    ),
  },
  'formation-gratuite-user': {
    subject: 'Votre demande a bien été reçue',
    html: buildTemplate(
      'Demande bien reçue !',
      `<p>Bonjour {{ params.FIRSTNAME }},</p>
<p>Nous avons bien reçu votre demande de formation gratuite.</p>
<p>Notre équipe va traiter votre inscription et vous recevrez vos accès <strong>sous 48h ouvrées</strong>.</p>
<p>En attendant, n'hésitez pas à nous contacter à <a href="mailto:${CONTACT_EMAIL}" style="color:${PURPLE};text-decoration:none;font-weight:700;">${CONTACT_EMAIL}</a> si vous avez des questions.</p>
<p>À très vite,<br><strong>Kevin Attallah</strong></p>`
    ),
  },
  'formation-gratuite-admin': {
    subject: 'Nouveau lead Formation : {{ params.FIRSTNAME }}',
    html: buildTemplate(
      'Nouvelle demande de formation gratuite',
      `<p>Un nouveau lead a demandé une formation gratuite :</p>
${infoTable([
  ['Prénom', '{{ params.FIRSTNAME }}'],
  ['Nom', '{{ params.LASTNAME }}'],
  ['Email', '{{ params.EMAIL }}'],
  ['Téléphone', '{{ params.PHONE }}'],
])}`
    ),
  },
  'paiement-user': {
    subject: 'Confirmation de votre commande',
    html: buildTemplate(
      'Merci pour votre achat !',
      `<p>Bonjour {{ params.NAME }},</p>
<p>Nous confirmons la réception de votre paiement :</p>
${infoTable([
  ['Formation', '{{ params.FORMATION }}'],
  ['Montant', '{{ params.AMOUNT }}'],
])}
<p>Notre équipe vous contactera prochainement pour vous accompagner dans les prochaines étapes.</p>
<p>Pour toute question, contactez-nous à <a href="mailto:${CONTACT_EMAIL}" style="color:${PURPLE};text-decoration:none;font-weight:700;">${CONTACT_EMAIL}</a>.</p>
<p>À très vite,<br><strong>Kevin Attallah</strong></p>`
    ),
  },
  'paiement-admin': {
    subject: 'Nouveau paiement : {{ params.FORMATION }}',
    html: buildTemplate(
      'Nouveau paiement reçu',
      `<p>Un paiement a été reçu :</p>
${infoTable([
  ['Formation', '{{ params.FORMATION }}'],
  ['Montant', '{{ params.AMOUNT }}'],
  ['Nom', '{{ params.NAME }}'],
  ['Email', '{{ params.EMAIL }}'],
  ['Téléphone', '{{ params.PHONE }}'],
  ['Ville', '{{ params.CITY }}'],
  ['Code postal', '{{ params.POSTCODE }}'],
])}`
    ),
  },
  'erreur-admin': {
    subject: '[ERREUR] {{ params.ERROR_TYPE }}',
    html: buildTemplate(
      'Erreur détectée',
      `<p style="color:#E53E3E;font-weight:700;font-size:16px;">{{ params.ERROR_TYPE }}</p>
${infoTable([
  ['Page', '{{ params.PAGE }}'],
  ['Utilisateur', '{{ params.USER_NAME }}'],
  ['Email', '{{ params.USER_EMAIL }}'],
  ['Formation', '{{ params.FORMATION }}'],
  ["Message d'erreur", '{{ params.ERROR_MESSAGE }}'],
])}`,
      true
    ),
  },
}

async function main() {
  console.log('Updating Brevo templates to light mode...\n')

  for (const [name, templateId] of Object.entries(config.templateIds)) {
    const tpl = templates[name]
    if (!tpl) {
      console.log(`  ? ${name}: no template definition found, skipping`)
      continue
    }

    try {
      const res = await fetch(`${BASE}/smtp/templates/${templateId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': API_KEY!,
        },
        body: JSON.stringify({
          htmlContent: tpl.html,
          subject: tpl.subject,
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        console.log(`  ! ${name} (ID ${templateId}): failed (${res.status}) ${text}`)
      } else {
        console.log(`  + ${name} (ID ${templateId}): updated`)
      }
    } catch (e: any) {
      console.log(`  ! ${name} (ID ${templateId}): ${e.message}`)
    }
  }

  console.log('\nDone! All templates updated to light mode.')
}

main().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
