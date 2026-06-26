import { getPublicEnv } from '@/lib/env'

const publicEnv = getPublicEnv()

export const siteConfig = {
  name: "Ethio Origins Tour",
  alternateName: "Ethio Origin Tours",
  shortName: "Ethio Origins",
  description:
    "Explore Ethiopia with a trusted local tour company offering cultural, historical, adventure, trekking, wildlife, coffee, and customized tours.",
  url: publicEnv.siteUrl,
  publicIndexingAllowed: publicEnv.publicIndexingAllowed,
  locale: "en_US",
  language: "en",
  country: "ET",
  location: "Addis Ababa, Ethiopia",
  defaultOgImage: "/brand/social-profile.png",
  logo: "/brand/logo-primary.png",

  contact: {
    email: "hello@ethioorigins.com",
    phone: "",
    address: "Bole Road, Addis Ababa, Ethiopia",
  },

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    tripadvisor: "",
  },
} as const;
