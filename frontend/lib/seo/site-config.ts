export const siteConfig = {
  name: "Ethio Origins Tour",
  alternateName: "Ethio Origin Tours",
  shortName: "Ethio Origins",
  description:
    "Explore Ethiopia with a trusted local tour company offering cultural, historical, adventure, trekking, wildlife, coffee, and customized tours.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://ethiooriginstour.com",
  locale: "en_US",
  language: "en",
  country: "ET",
  location: "Addis Ababa, Ethiopia",
  defaultOgImage: "https://res.cloudinary.com/divimnzxa/image/upload/v1782244137/Ancient_Wonders_The_Monolithic_Rock-Cut_Church_of_Lalibela_Ethiopia_gh7iwx.jpg",
  logo: "https://res.cloudinary.com/divimnzxa/image/upload/v1782246561/40462096650629206_q68ntv.jpg",

  contact: {
    email: "hello@ethioorigins.com",
    phone: "+251 900 000 000",
    address: "Bole Road, Addis Ababa, Ethiopia",
  },

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    tripadvisor: "",
  },
} as const;
