import type { Metadata } from 'next'
import { LegalPage, type LegalSection } from '@/components/legal/legal-page'
import { createMetadata } from '@/lib/seo/create-metadata'

export const metadata: Metadata = createMetadata({
  title: 'Terms and Conditions',
  description: 'Read the terms and conditions for using Ethio Origins Tour services and booking travel in Ethiopia.',
  canonicalPath: '/terms',
  primaryKeyword: 'Ethio Origins Tour Terms and Conditions',
})

const sections: LegalSection[] = [
  { title: 'About these terms', paragraphs: ['These terms govern your use of the Ethio Origins Tour website and any inquiry, proposal, reservation, or travel service arranged with us. By using the website or confirming a booking, you agree to these terms and any written conditions included in your final proposal.'] },
  { title: 'Inquiries and bookings', paragraphs: ['Submitting an inquiry does not create a confirmed booking. A booking becomes binding only after we issue written confirmation and receive any required deposit or payment. Your final itinerary, price, inclusions, exclusions, and payment schedule will be stated in your proposal or booking confirmation.'] },
  { title: 'Prices and payment', paragraphs: ['Quoted prices are based on the itinerary, group size, exchange rates, taxes, permits, and supplier costs available when the quote is prepared. We will explain any material price change before confirmation. Payments must be made using the method and schedule shown in your booking documents. Bank or card charges may be payable by the traveler.'] },
  { title: 'Changes and cancellations', paragraphs: ['Cancellation and amendment terms vary by journey because hotels, flights, permits, guides, and local suppliers apply different rules. The applicable fees and refundable amounts will be shown before you confirm. We may adjust an itinerary when safety, weather, road conditions, government action, supplier availability, or events beyond our reasonable control require it, while making reasonable efforts to provide a suitable alternative.'] },
  { title: 'Traveler responsibilities', paragraphs: ['Travelers are responsible for providing accurate information and obtaining valid passports, visas, vaccinations, travel insurance, and any medical advice required for their journey. You must disclose relevant mobility, dietary, or health needs early enough for us to assess suitable arrangements. Travelers must respect local laws, communities, guides, wildlife, and cultural practices.'] },
  { title: 'Travel risk and insurance', paragraphs: ['Travel in Ethiopia may involve remote areas, altitude, variable roads, wildlife, climate, and limited medical facilities. We strongly recommend comprehensive insurance covering medical treatment, evacuation, cancellation, baggage, and the activities in your itinerary. Participation in any activity is subject to the traveler’s judgment and the instructions of guides and local authorities.'] },
  { title: 'Third-party services', paragraphs: ['We coordinate services supplied by independent hotels, airlines, transport operators, guides, parks, and other providers. We select suppliers with care but do not control every act or omission of an independent provider. Nothing in these terms excludes liability that cannot lawfully be excluded.'] },
  { title: 'Website and intellectual property', paragraphs: ['Website text, branding, itineraries, photographs, graphics, and design are owned by Ethio Origins Tour or used with permission. They may not be copied, republished, sold, or commercially exploited without written permission. You must not misuse the website, interfere with its operation, or attempt unauthorized access.'] },
  { title: 'Liability and force majeure', paragraphs: ['To the extent permitted by law, we are not responsible for losses caused by events outside our reasonable control, including severe weather, natural disaster, epidemic, conflict, government restrictions, transport disruption, or supplier failure. Our responsibility will be assessed under the booking agreement and applicable law.'] },
  { title: 'Governing law and contact', paragraphs: ['These terms are governed by the laws of Ethiopia. We encourage you to contact us first so concerns can be resolved promptly and fairly. Questions may be sent through our Contact Us page or to info@ethiooriginstour.com.'] },
]

export default function TermsPage() {
  return <LegalPage eyebrow="Travel with clarity" title="Terms & Conditions" introduction="Clear expectations help create better journeys. These terms explain how inquiries, bookings, payments, changes, and travel responsibilities are handled." sections={sections} />
}
