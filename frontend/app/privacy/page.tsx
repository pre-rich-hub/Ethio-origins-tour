import type { Metadata } from 'next'
import { LegalPage, type LegalSection } from '@/components/legal/legal-page'
import { createMetadata } from '@/lib/seo/create-metadata'

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description: 'Learn how Ethio Origins Tour collects, uses, protects, and shares personal information.',
  canonicalPath: '/privacy',
  primaryKeyword: 'Ethio Origins Tour Privacy Policy',
})

const sections: LegalSection[] = [
  { title: 'Information we collect', paragraphs: ['We collect information you choose to provide when requesting an itinerary, contacting us, subscribing, or booking a journey.'], items: ['Name, email address, telephone or WhatsApp number', 'Travel dates, group size, interests, preferences, and additional messages', 'Booking, payment, dietary, accessibility, and emergency details where needed', 'Technical information such as device, browser, IP address, referring page, and website interactions'] },
  { title: 'How we use information', paragraphs: ['We use personal information to respond to inquiries, design itineraries, administer bookings, communicate service updates, provide customer support, protect the website, comply with law, and improve our services. We may send marketing only where permitted, and you can opt out at any time.'] },
  { title: 'Legal grounds', paragraphs: ['Depending on the context, we process information to take steps at your request before a contract, perform a booking contract, meet legal obligations, pursue legitimate business and security interests, or act with your consent.'] },
  { title: 'How information is shared', paragraphs: ['We share only what is reasonably needed with service providers involved in operating the website or delivering your journey.'], items: ['Hotels, guides, transport providers, airlines, parks, and activity operators', 'Email providers such as SendGrid and infrastructure, database, analytics, and security providers', 'Professional advisers, insurers, payment providers, or authorities when legally required', 'A successor organization if the business is reorganized or transferred'] },
  { title: 'Cookies and analytics', paragraphs: ['The website may use essential cookies for security and functionality and analytics technologies to understand visits and performance. Browser settings can limit cookies, though parts of the website may not work as intended. We do not sell personal information.'] },
  { title: 'International processing', paragraphs: ['Some technology and travel providers may process information outside your country. Where applicable, we use reasonable contractual and organizational safeguards. Travel details may also need to be shared with suppliers in Ethiopia or other destinations included in your booking.'] },
  { title: 'Retention', paragraphs: ['We keep inquiry and booking information only as long as reasonably necessary for service delivery, accounting, legal compliance, dispute resolution, security, and legitimate business records. Retention periods vary according to the type of record and applicable obligations.'] },
  { title: 'Security', paragraphs: ['We use reasonable technical and organizational measures to protect personal information. No internet transmission or storage system can be guaranteed completely secure, so please avoid sending unnecessary sensitive information through open message fields.'] },
  { title: 'Your choices and rights', paragraphs: ['Subject to applicable law, you may request access, correction, deletion, restriction, or a copy of your personal information, or object to certain processing. You may withdraw consent where processing relies on consent. We may need to verify your identity before completing a request.'] },
  { title: 'Children, updates, and contact', paragraphs: ['Our website is not directed to children who submit their own travel inquiries. A parent or guardian should provide information for a minor traveler. We may update this policy when our services or legal obligations change and will post the revised date here. Privacy requests may be sent through our Contact Us page or to info@ethiooriginstour.com.'] },
]

export default function PrivacyPage() {
  return <LegalPage eyebrow="Your information matters" title="Privacy Policy" introduction="This policy explains what information Ethio Origins Tour collects, why we use it, who may receive it, and the choices available to you." sections={sections} />
}
