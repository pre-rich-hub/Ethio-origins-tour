import { getPublicEnv } from '@/lib/env'

const publicEnv = getPublicEnv()

export const siteConfig = {
  name: "Ethio Origins Tour",
  alternateName: "Ethio Origin Tours",
  alternateNames: ["Ethio Origin Tour", "Ethio Origin Tours", "Ethio Origin Travel and Tours"],
  shortName: "Ethio Origins",
  description:
    "Explore Ethiopia with a trusted local tour company offering cultural, historical, adventure, trekking, wildlife, coffee, and customized tours.",
  url: publicEnv.siteUrl,
  publicIndexingAllowed: publicEnv.publicIndexingAllowed,
  locale: "en_US",
  language: "en",
  country: "ET",
  location: "Addis Ababa, Ethiopia",
  defaultOgImage: "/brand/ethio-origin-social-transparent-2026.png",
  logo: "/brand/ethio-origin-logo-transparent-2026.png",

  contact: {
    email: "info@ethiooriginstour.com",
    phone: "+251935257197",
    phones: ["+251935257197", "+251707990306"],
    address: "Bole Road, Addis Ababa, Ethiopia",
  },

  social: {
    facebook: "https://www.facebook.com/share/1D7dR4farF/",
    instagram: "https://www.instagram.com/ethio_origin_tour?igsh=NWV1ZjlnaWdrNXc=",
    linkedin: "https://www.linkedin.com/company/ethio-origins-tour/",
    youtube: "https://www.youtube.com/@ethiooriginstour",
    tiktok: "https://www.tiktok.com/@ethio_origin_tour",
    tripadvisor: "https://www.tripadvisor.co.uk/Attraction_Review-g293791-d34400247-Reviews-Ethio_Origins_tour-Addis_Ababa.html",
    tourist: "https://tourist.com/p/39570",
  },
} as const;
