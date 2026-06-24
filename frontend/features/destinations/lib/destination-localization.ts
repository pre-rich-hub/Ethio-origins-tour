import type { LanguageCode } from '@/lib/i18n/language'
import type {
  Destination,
  DestinationCategory,
} from '../types/destination'

type LocalText = {
  bestFor: (name: string) => string
  categoryLabel: string
  description: (name: string, region: string) => string
  duration: string
  highlights: (name: string, region: string) => string[]
  intro: (name: string, region: string) => string
  itinerary: (name: string) => string[]
}

const regionTranslations: Partial<Record<LanguageCode, Record<string, string>>> = {
  DE: {
    'Addis Ababa': 'Addis Abeba',
    'Afar Region': 'Afar-Region',
    'Amhara Highlands': 'Amhara-Hochland',
    'Amhara Region': 'Amhara-Region',
    'Arba Minch': 'Arba Minch',
    'Bahir Dar': 'Bahir Dar',
    'Bale Zone': 'Bale-Zone',
    'Central Ethiopia': 'Zentraläthiopien',
    'Eastern Ethiopia': 'Ostäthiopien',
    Gondar: 'Gondar',
    'Great Rift Valley': 'Großer Afrikanischer Grabenbruch',
    Hawassa: 'Hawassa',
    Lalibela: 'Lalibela',
    'North Shewa': 'Nord-Shewa',
    'Northern Ethiopia': 'Nordäthiopien',
    'Omo Valley': 'Omo-Tal',
    'Oromia Highlands': 'Oromia-Hochland',
    'Simien Mountains': 'Simien-Berge',
    'Southern Ethiopia': 'Südäthiopien',
    'Southwestern Ethiopia': 'Südwestäthiopien',
    Tigray: 'Tigray',
    'Wonchi Crater Lake': 'Wonchi-Kratersee',
  },
  ES: {
    'Addis Ababa': 'Addis Abeba',
    'Afar Region': 'Región Afar',
    'Amhara Highlands': 'Tierras altas de Amhara',
    'Amhara Region': 'Región Amhara',
    'Bale Zone': 'Zona de Bale',
    'Central Ethiopia': 'Etiopía central',
    'Eastern Ethiopia': 'Etiopía oriental',
    'Great Rift Valley': 'Gran Valle del Rift',
    'North Shewa': 'Norte de Shewa',
    'Northern Ethiopia': 'Norte de Etiopía',
    'Omo Valley': 'Valle del Omo',
    'Oromia Highlands': 'Tierras altas de Oromia',
    'Simien Mountains': 'Montañas Simien',
    'Southern Ethiopia': 'Sur de Etiopía',
    'Southwestern Ethiopia': 'Suroeste de Etiopía',
    'Wonchi Crater Lake': 'Lago del cráter Wonchi',
  },
  FR: {
    'Addis Ababa': 'Addis-Abeba',
    'Afar Region': 'Région Afar',
    'Amhara Highlands': 'Hauts plateaux amharas',
    'Amhara Region': 'Région Amhara',
    'Bale Zone': 'Zone de Bale',
    'Central Ethiopia': 'Éthiopie centrale',
    'Eastern Ethiopia': 'Éthiopie orientale',
    'Great Rift Valley': 'Grande vallée du Rift',
    'North Shewa': 'Nord Shewa',
    'Northern Ethiopia': 'Nord de l’Éthiopie',
    'Omo Valley': 'Vallée de l’Omo',
    'Oromia Highlands': 'Hauts plateaux d’Oromia',
    'Simien Mountains': 'Monts Simien',
    'Southern Ethiopia': 'Sud de l’Éthiopie',
    'Southwestern Ethiopia': 'Sud-ouest de l’Éthiopie',
    'Wonchi Crater Lake': 'Lac de cratère Wonchi',
  },
}

const localizedText: Record<
  Exclude<LanguageCode, 'EN'>,
  Record<DestinationCategory, LocalText>
> = {
  DE: {
    'historical-religious': {
      categoryLabel: 'Historische und religiöse Reiseziele',
      duration: 'Maßgeschneidert',
      description: (name, region) =>
        `${name} ist ein historisch und religiös geprägtes Reiseziel in ${region}, ideal für private Reisen mit Kultur, Glaubenserbe und lokaler Begleitung.`,
      intro: (name, region) =>
        `Erkunden Sie ${name} in ${region} mit einer flexibel geplanten Route, die Geschichte, heilige Orte, lokale Geschichten und angenehmes Reisetempo verbindet.`,
      highlights: (name, region) => [
        `Privat geführte Erkundung von ${name}`,
        `Historische und religiöse Höhepunkte in ${region}`,
        'Lokale Einblicke, Fotostopps und flexible Zeitplanung',
        'Route angepasst an Saison, Komfort und Interessen',
      ],
      itinerary: (name) => [
        `Anreise und Einführung in ${name}`,
        'Geführte Besuche der wichtigsten Kulturerbestätten',
        'Lokale Begegnungen und ruhige Fotostopps',
        'Weiterreise oder Rückkehr nach Wunsch',
      ],
      bestFor: () =>
        'Geschichte, religiöses Erbe, Architektur, Kultur und private Entdeckungsreisen',
    },
    'lakes-scenic': {
      categoryLabel: 'Seen, Wasserfälle und landschaftliche Reiseziele',
      duration: 'Maßgeschneidert',
      description: (name, region) =>
        `${name} ist ein landschaftliches Reiseziel in ${region}, passend für entspannte Naturtage, Seeblicke, Wasserfälle und private Routen.`,
      intro: (name, region) =>
        `Verlangsamen Sie das Tempo rund um ${name} in ${region}, mit sanften Naturerlebnissen, Aussichtspunkten und flexibler Reiseplanung.`,
      highlights: (name, region) => [
        `Landschaftliche Erkundung von ${name}`,
        `Natur- und Aussichtspunkte in ${region}`,
        'Flexible Stopps für Fotos, Spaziergänge und lokale Begegnungen',
        'Ruhiger Ablauf passend zu Wetter und Reisezeit',
      ],
      itinerary: (name) => [
        `Anreise nach ${name}`,
        'Aussichtspunkte und leichte Naturzeit',
        'Lokale Stopps, See- oder Wasserfallroute',
        'Rückkehr oder Verlängerung nach Wunsch',
      ],
      bestFor: () =>
        'Natur, Seeblicke, Wasserfälle, Familien, sanfte Spaziergänge und kurze Auszeiten',
    },
    'mountains-wildlife': {
      categoryLabel: 'Berge, Parks und Wildtiere',
      duration: 'Maßgeschneidert',
      description: (name, region) =>
        `${name} ist ein Natur- und Wildtierreiseziel in ${region}, ideal für Hochlandlandschaften, Nationalparks und private Outdoor-Erlebnisse.`,
      intro: (name, region) =>
        `Erleben Sie ${name} in ${region} mit einer Naturroute, die Aussicht, Wildtierchancen, lokale Guides und angenehmes Tempo verbindet.`,
      highlights: (name, region) => [
        `Naturerlebnis rund um ${name}`,
        `Hochland-, Park- oder Wildtierlandschaften in ${region}`,
        'Lokale Guides, flexible Stopps und saisonale Planung',
        'Routenrhythmus angepasst an Wetter, Höhe und Komfort',
      ],
      itinerary: (name) => [
        `Anreise in die Region ${name}`,
        'Geführte Natur- oder Parkerkundung',
        'Aussichtspunkte, leichte Wanderungen oder Wildtierbeobachtung',
        'Rückfahrt oder Weiterreise nach Wunsch',
      ],
      bestFor: () =>
        'Wildtiere, Vogelbeobachtung, Berge, Naturfotografie und sanftes Abenteuer',
    },
    'adventure-geological': {
      categoryLabel: 'Abenteuer und geologische Wunder',
      duration: 'Maßgeschneidert',
      description: (name, region) =>
        `${name} ist ein abenteuerliches geologisches Reiseziel in ${region}, geprägt von dramatischen Landschaften, Naturkräften und sorgfältiger privater Planung.`,
      intro: (name, region) =>
        `Reisen Sie nach ${name} in ${region} mit einer sicher abgestimmten Route für Landschaft, Geologie, lokale Begleitung und robuste Logistik.`,
      highlights: (name, region) => [
        `Abenteuerroute nach ${name}`,
        `Geologische und landschaftliche Höhepunkte in ${region}`,
        'Lokale Genehmigungen, Guides und flexible Logistik',
        'Planung nach Saison, Sicherheit, Zugang und Komfort',
      ],
      itinerary: (name) => [
        `Anreise Richtung ${name}`,
        'Geführte geologische und landschaftliche Erkundung',
        'Sonnenaufgangs-, Aussichtspunkt- oder Kulturstopps',
        'Rückkehr oder Weiterreise nach Planung',
      ],
      bestFor: () =>
        'Abenteuer, Geologie, Wüstenlandschaften, Vulkanrouten, Fotografie und private Expeditionen',
    },
    'tribal-cultural': {
      categoryLabel: 'Stammes- und Kulturreiseziele',
      duration: 'Maßgeschneidert',
      description: (name, region) =>
        `${name} ist ein kulturelles Reiseziel in ${region}, ideal für respektvolle Begegnungen, lokale Traditionen, Märkte und private Kulturrouten.`,
      intro: (name, region) =>
        `Entdecken Sie ${name} in ${region} mit einer sensibel geplanten Kulturroute, die Begegnungen, lokale Geschichten und verantwortungsvolles Reisen verbindet.`,
      highlights: (name, region) => [
        `Kulturelle Erkundung von ${name}`,
        `Gemeinschaften, Märkte oder Traditionen in ${region}`,
        'Respektvolle lokale Begleitung und flexible Zeitplanung',
        'Route abgestimmt auf Kultur, Saison und lokale Verfügbarkeit',
      ],
      itinerary: (name) => [
        `Anreise nach ${name}`,
        'Geführte Kultur- und Gemeindebesuche',
        'Lokale Märkte, Handwerk oder Alltagserlebnisse',
        'Weiterreise mit verantwortungsvollem Tempo',
      ],
      bestFor: () =>
        'Kultur, lokale Gemeinschaften, Märkte, Fotografie, verantwortungsvolle Begegnungen und private Reisen',
    },
  },
  ES: {
    'historical-religious': {
      categoryLabel: 'Destinos históricos y religiosos',
      duration: 'A medida',
      description: (name, region) =>
        `${name} es un destino histórico y religioso en ${region}, ideal para viajes privados con cultura, patrimonio de fe y guía local.`,
      intro: (name, region) =>
        `Explora ${name} en ${region} con una ruta flexible que combina historia, lugares sagrados, relatos locales y un ritmo cómodo.`,
      highlights: (name, region) => [
        `Visita privada guiada de ${name}`,
        `Puntos históricos y religiosos destacados en ${region}`,
        'Perspectiva local, paradas fotográficas y ritmo flexible',
        'Ruta ajustada a temporada, comodidad e intereses',
      ],
      itinerary: (name) => [
        `Llegada e introducción a ${name}`,
        'Visitas guiadas a los principales sitios patrimoniales',
        'Encuentros locales y paradas fotográficas tranquilas',
        'Continuación o regreso según tu plan',
      ],
      bestFor: () =>
        'Historia, patrimonio religioso, arquitectura, cultura y descubrimiento privado',
    },
    'lakes-scenic': {
      categoryLabel: 'Lagos, cascadas y destinos escénicos',
      duration: 'A medida',
      description: (name, region) =>
        `${name} es un destino escénico en ${region}, perfecto para días de naturaleza, vistas de lago, cascadas y rutas privadas relajadas.`,
      intro: (name, region) =>
        `Disfruta ${name} en ${region} con experiencias suaves de naturaleza, miradores y planificación flexible.`,
      highlights: (name, region) => [
        `Exploración escénica de ${name}`,
        `Naturaleza y miradores en ${region}`,
        'Paradas flexibles para fotos, caminatas y encuentros locales',
        'Ritmo tranquilo según clima y temporada',
      ],
      itinerary: (name) => [
        `Viaje hacia ${name}`,
        'Miradores y tiempo suave en la naturaleza',
        'Paradas locales, ruta de lago o cascada',
        'Regreso o extensión según tu plan',
      ],
      bestFor: () =>
        'Naturaleza, vistas de lago, cascadas, familias, caminatas suaves y escapadas cortas',
    },
    'mountains-wildlife': {
      categoryLabel: 'Montañas, parques y fauna',
      duration: 'A medida',
      description: (name, region) =>
        `${name} es un destino de naturaleza y fauna en ${region}, ideal para paisajes de altura, parques nacionales y experiencias privadas al aire libre.`,
      intro: (name, region) =>
        `Vive ${name} en ${region} con una ruta natural que combina vistas, fauna, guías locales y ritmo cómodo.`,
      highlights: (name, region) => [
        `Experiencia de naturaleza en ${name}`,
        `Paisajes de montaña, parque o fauna en ${region}`,
        'Guías locales, paradas flexibles y planificación de temporada',
        'Ruta ajustada al clima, la altitud y tu comodidad',
      ],
      itinerary: (name) => [
        `Llegada a la zona de ${name}`,
        'Exploración guiada de naturaleza o parque',
        'Miradores, caminatas suaves u observación de fauna',
        'Regreso o continuación según el itinerario',
      ],
      bestFor: () =>
        'Fauna, aves, montañas, fotografía de naturaleza y aventura suave',
    },
    'adventure-geological': {
      categoryLabel: 'Aventura y maravillas geológicas',
      duration: 'A medida',
      description: (name, region) =>
        `${name} es un destino geológico y de aventura en ${region}, marcado por paisajes dramáticos, fuerzas naturales y planificación privada cuidadosa.`,
      intro: (name, region) =>
        `Viaja a ${name} en ${region} con una ruta coordinada para paisaje, geología, guía local y logística sólida.`,
      highlights: (name, region) => [
        `Ruta de aventura hacia ${name}`,
        `Puntos geológicos y paisajísticos en ${region}`,
        'Permisos, guías locales y logística flexible',
        'Planificación según temporada, seguridad, acceso y comodidad',
      ],
      itinerary: (name) => [
        `Salida hacia ${name}`,
        'Exploración geológica y paisajística guiada',
        'Paradas de amanecer, miradores o cultura local',
        'Regreso o continuación según la planificación',
      ],
      bestFor: () =>
        'Aventura, geología, desiertos, rutas volcánicas, fotografía y expediciones privadas',
    },
    'tribal-cultural': {
      categoryLabel: 'Destinos tribales y culturales',
      duration: 'A medida',
      description: (name, region) =>
        `${name} es un destino cultural en ${region}, ideal para encuentros respetuosos, tradiciones locales, mercados y rutas privadas.`,
      intro: (name, region) =>
        `Descubre ${name} en ${region} con una ruta cultural sensible que une encuentros, historias locales y viaje responsable.`,
      highlights: (name, region) => [
        `Exploración cultural de ${name}`,
        `Comunidades, mercados o tradiciones en ${region}`,
        'Acompañamiento local respetuoso y tiempo flexible',
        'Ruta adaptada a cultura, temporada y disponibilidad local',
      ],
      itinerary: (name) => [
        `Llegada a ${name}`,
        'Visitas culturales y comunitarias guiadas',
        'Mercados locales, artesanía o vida cotidiana',
        'Continuación con ritmo responsable',
      ],
      bestFor: () =>
        'Cultura, comunidades locales, mercados, fotografía, encuentros responsables y viajes privados',
    },
  },
  FR: {
    'historical-religious': {
      categoryLabel: 'Destinations historiques et religieuses',
      duration: 'Sur mesure',
      description: (name, region) =>
        `${name} est une destination historique et religieuse en ${region}, idéale pour un voyage privé mêlant culture, patrimoine spirituel et guidage local.`,
      intro: (name, region) =>
        `Explorez ${name} en ${region} avec un itinéraire flexible qui relie histoire, lieux sacrés, récits locaux et rythme confortable.`,
      highlights: (name, region) => [
        `Visite privée guidée de ${name}`,
        `Temps forts historiques et religieux en ${region}`,
        'Regards locaux, pauses photo et rythme flexible',
        'Itinéraire adapté à la saison, au confort et aux intérêts',
      ],
      itinerary: (name) => [
        `Arrivée et introduction à ${name}`,
        'Visites guidées des principaux sites patrimoniaux',
        'Rencontres locales et pauses photo tranquilles',
        'Continuation ou retour selon votre programme',
      ],
      bestFor: () =>
        'Histoire, patrimoine religieux, architecture, culture et découverte privée',
    },
    'lakes-scenic': {
      categoryLabel: 'Lacs, cascades et destinations panoramiques',
      duration: 'Sur mesure',
      description: (name, region) =>
        `${name} est une destination panoramique en ${region}, parfaite pour la nature douce, les vues sur les lacs, les cascades et les itinéraires privés détendus.`,
      intro: (name, region) =>
        `Prenez le temps autour de ${name} en ${region}, avec nature douce, points de vue et planification flexible.`,
      highlights: (name, region) => [
        `Exploration panoramique de ${name}`,
        `Nature et points de vue en ${region}`,
        'Arrêts flexibles pour photos, promenades et rencontres locales',
        'Rythme tranquille selon météo et saison',
      ],
      itinerary: (name) => [
        `Route vers ${name}`,
        'Points de vue et temps nature en douceur',
        'Arrêts locaux, itinéraire lac ou cascade',
        'Retour ou extension selon votre plan',
      ],
      bestFor: () =>
        'Nature, vues de lac, cascades, familles, promenades faciles et courtes escapades',
    },
    'mountains-wildlife': {
      categoryLabel: 'Montagnes, parcs et faune',
      duration: 'Sur mesure',
      description: (name, region) =>
        `${name} est une destination nature et faune en ${region}, idéale pour les hauts plateaux, les parcs nationaux et les expériences privées en plein air.`,
      intro: (name, region) =>
        `Découvrez ${name} en ${region} avec un itinéraire nature mêlant vues, faune, guides locaux et rythme confortable.`,
      highlights: (name, region) => [
        `Expérience nature autour de ${name}`,
        `Paysages de montagne, parc ou faune en ${region}`,
        'Guides locaux, pauses flexibles et planification saisonnière',
        'Rythme adapté à la météo, à l’altitude et au confort',
      ],
      itinerary: (name) => [
        `Arrivée dans la région de ${name}`,
        'Exploration guidée de nature ou de parc',
        'Points de vue, petites randonnées ou observation de la faune',
        'Retour ou continuation selon l’itinéraire',
      ],
      bestFor: () =>
        'Faune, oiseaux, montagnes, photographie nature et aventure douce',
    },
    'adventure-geological': {
      categoryLabel: 'Aventure et merveilles géologiques',
      duration: 'Sur mesure',
      description: (name, region) =>
        `${name} est une destination géologique et aventure en ${region}, marquée par des paysages spectaculaires, les forces naturelles et une planification privée attentive.`,
      intro: (name, region) =>
        `Voyagez vers ${name} en ${region} avec un itinéraire coordonné pour paysages, géologie, guidage local et logistique solide.`,
      highlights: (name, region) => [
        `Route d’aventure vers ${name}`,
        `Temps forts géologiques et paysagers en ${region}`,
        'Permis, guides locaux et logistique flexible',
        'Planification selon saison, sécurité, accès et confort',
      ],
      itinerary: (name) => [
        `Départ vers ${name}`,
        'Exploration géologique et paysagère guidée',
        'Pauses lever de soleil, points de vue ou culture locale',
        'Retour ou continuation selon la planification',
      ],
      bestFor: () =>
        'Aventure, géologie, déserts, routes volcaniques, photographie et expéditions privées',
    },
    'tribal-cultural': {
      categoryLabel: 'Destinations tribales et culturelles',
      duration: 'Sur mesure',
      description: (name, region) =>
        `${name} est une destination culturelle en ${region}, idéale pour des rencontres respectueuses, traditions locales, marchés et itinéraires privés.`,
      intro: (name, region) =>
        `Découvrez ${name} en ${region} avec un itinéraire culturel sensible, reliant rencontres, récits locaux et voyage responsable.`,
      highlights: (name, region) => [
        `Exploration culturelle de ${name}`,
        `Communautés, marchés ou traditions en ${region}`,
        'Accompagnement local respectueux et timing flexible',
        'Route adaptée à la culture, à la saison et aux disponibilités locales',
      ],
      itinerary: (name) => [
        `Arrivée à ${name}`,
        'Visites culturelles et communautaires guidées',
        'Marchés locaux, artisanat ou vie quotidienne',
        'Continuation avec un rythme responsable',
      ],
      bestFor: () =>
        'Culture, communautés locales, marchés, photographie, rencontres responsables et voyages privés',
    },
  },
}

function localizeRegion(region: string, language: LanguageCode) {
  return regionTranslations[language]?.[region] ?? region
}

export function getLocalizedDestination<T extends Destination>(
  destination: T,
  language: LanguageCode,
): T {
  if (language === 'EN') {
    return destination
  }

  const text = localizedText[language][destination.category]
  const region = localizeRegion(destination.region, language)
  const description = text.description(destination.name, region)
  const intro = text.intro(destination.name, region)

  return {
    ...destination,
    bestFor: text.bestFor(destination.name),
    categoryLabel: text.categoryLabel,
    description,
    duration: text.duration,
    highlights: text.highlights(destination.name, region),
    intro,
    itinerary: text.itinerary(destination.name),
    overview: intro,
    place: region,
    region,
    shortDescription: description,
  }
}

export function getLocalizedDestinations<T extends Destination>(
  destinations: T[],
  language: LanguageCode,
) {
  return destinations.map((destination) =>
    getLocalizedDestination(destination, language),
  )
}
