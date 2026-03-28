import { externalLinks } from './external-links'

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', url: externalLinks.social.facebook, icon: 'facebook' },
  { name: 'X (Twitter)', url: externalLinks.social.twitter, icon: 'twitter' },
  { name: 'LinkedIn', url: externalLinks.social.linkedin, icon: 'linkedin' },
  { name: 'TikTok', url: externalLinks.social.tiktok, icon: 'tiktok' },
  { name: 'YouTube', url: externalLinks.social.youtube, icon: 'youtube' },
  { name: 'Instagram', url: externalLinks.social.instagram, icon: 'instagram' },
]

export default socialLinks
