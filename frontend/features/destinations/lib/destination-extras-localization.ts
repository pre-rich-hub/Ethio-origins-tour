import type { LanguageCode } from '@/lib/i18n/language'
import {
  topAdventureExperiences,
  topFestivals,
} from '../data/destination-extras'

type ExtraItem = {
  name: string
  slug: string
}

const festivalTranslations: Partial<Record<LanguageCode, Record<string, string>>> =
  {
    DE: {
      'timkat-festival': 'Timkat-Festival',
      'meskel-festival': 'Meskel-Festival',
      'genna-in-lalibela': 'Genna in Lalibela',
      irreecha: 'Irreecha',
      'ashenda-festival': 'Ashenda-Festival',
    },
    ES: {
      'timkat-festival': 'Festival Timkat',
      'meskel-festival': 'Festival Meskel',
      'genna-in-lalibela': 'Genna en Lalibela',
      irreecha: 'Irreecha',
      'ashenda-festival': 'Festival Ashenda',
    },
    FR: {
      'timkat-festival': 'Festival Timkat',
      'meskel-festival': 'Festival Meskel',
      'genna-in-lalibela': 'Genna à Lalibela',
      irreecha: 'Irreecha',
      'ashenda-festival': 'Festival Ashenda',
    },
  }

const adventureTranslations: Partial<
  Record<LanguageCode, Record<string, string>>
> = {
  DE: {
    'simien-mountains-trekking': 'Trekking in den Simien-Bergen',
    'danakil-depression-erta-ale-volcano':
      'Danakil-Senke und Vulkan Erta Ale',
    'bale-mountains-wildlife-trekking':
      'Wildtier-Trekking in den Bale Mountains',
    'gheralta-mountains-rock-churches':
      'Gheralta-Berge und Felsenkirchen',
    'omo-valley-cultural-adventure': 'Kulturabenteuer im Omo-Tal',
  },
  ES: {
    'simien-mountains-trekking': 'Trekking en las montañas Simien',
    'danakil-depression-erta-ale-volcano':
      'Depresión de Danakil y volcán Erta Ale',
    'bale-mountains-wildlife-trekking':
      'Trekking de fauna en Bale Mountains',
    'gheralta-mountains-rock-churches':
      'Montañas Gheralta e iglesias rupestres',
    'omo-valley-cultural-adventure': 'Aventura cultural en el Valle del Omo',
  },
  FR: {
    'simien-mountains-trekking': 'Trekking dans les monts Simien',
    'danakil-depression-erta-ale-volcano':
      'Dépression du Danakil et volcan Erta Ale',
    'bale-mountains-wildlife-trekking':
      'Trekking faune dans les Bale Mountains',
    'gheralta-mountains-rock-churches':
      'Montagnes du Gheralta et églises rupestres',
    'omo-valley-cultural-adventure': 'Aventure culturelle dans la vallée de l’Omo',
  },
}

function localizeItems(
  items: ExtraItem[],
  language: LanguageCode,
  translations: Partial<Record<LanguageCode, Record<string, string>>>,
) {
  return items.map((item) => ({
    ...item,
    name: translations[language]?.[item.slug] ?? item.name,
  }))
}

export function getLocalizedTopFestivals(language: LanguageCode) {
  return localizeItems(topFestivals, language, festivalTranslations)
}

export function getLocalizedTopAdventureExperiences(language: LanguageCode) {
  return localizeItems(topAdventureExperiences, language, adventureTranslations)
}
