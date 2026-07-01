import type { LanguageCode } from '@/lib/i18n/language'
import type { TourCategory } from '../data/tour-categories'
import type { Tour } from '../types/tour'

type TourText = Partial<
  Pick<Tour, 'bestFor' | 'description' | 'destination' | 'intro' | 'title'>
>

type CategoryText = Pick<TourCategory, 'description' | 'name'>

const durationLabels: Record<LanguageCode, { day: string; days: string }> = {
  EN: { day: 'Day', days: 'Days' },
  DE: { day: 'Tag', days: 'Tage' },
  ES: { day: 'Día', days: 'Días' },
  FR: { day: 'Jour', days: 'Jours' },
}

const privateJourneySuffix: Record<LanguageCode, string> = {
  EN: 'is planned as a private, flexible journey with local guidance and route support.',
  DE: 'wird als private, flexible Reise mit lokaler Begleitung und Routenbetreuung geplant.',
  ES: 'se planifica como un viaje privado y flexible con guía local y apoyo de ruta.',
  FR: 'est conçu comme un voyage privé et flexible avec accompagnement local et soutien d’itinéraire.',
}

const detailTemplates: Record<
  Exclude<LanguageCode, 'EN'>,
  {
    arrivalInfo: string[]
    included: string[]
    importantNote: string
    itineraryActivities: (title: string, destination: string, day: number) => string
    itineraryMeals: string
    itineraryOvernight: (isLast: boolean) => string
    itineraryTitle: (destination: string, day: number) => string
    moment: (destination: string, index: number) => string
  }
> = {
  DE: {
    arrivalInfo: [
      'Ankunft am internationalen Flughafen Addis Abeba Bole und Empfang durch das Ethio Origins Team.',
      'Privater Transfer zum Hotel mit Zeit zum Ausruhen oder für eine leichte Einführung, je nach Ankunftszeit.',
    ],
    included: [
      'Private Routenplanung und Betreuung durch das Ethio Origins Team.',
      'Lokale Guides und Fahrer entsprechend der bestätigten Route.',
      'Ausgewählte Besuche, kulturelle Stopps und flexible Tagesgestaltung.',
      'Unterstützung bei Timing, Komfortniveau und praktischen Reisedetails.',
    ],
    importantNote:
      'Der genaue Ablauf wird nach Saison, lokalen Bedingungen, Verfügbarkeit und gewünschtem Komfort bestätigt.',
    itineraryActivities: (title, destination, day) =>
      `Tag ${day} wird rund um ${title} gestaltet, mit privater Begleitung, lokalem Kontext und einem angenehmen Reiserhythmus in der Region ${destination}.`,
    itineraryMeals: 'Nach bestätigtem Tagesplan',
    itineraryOvernight: (isLast) =>
      isLast ? 'Abreise oder Anschlussprogramm' : 'Flexibel nach bestätigter Route',
    itineraryTitle: (destination, day) => `Tag ${day}: Geführtes Erlebnis in ${destination}`,
    moment: (destination, index) =>
      `Ausgewählter Höhepunkt ${index + 1} der privaten Reise in ${destination}`,
  },
  ES: {
    arrivalInfo: [
      'Llegada al Aeropuerto Internacional Bole de Addis Abeba y bienvenida por el equipo de Ethio Origins.',
      'Traslado privado al hotel con tiempo para descansar o una introducción ligera, según la hora de llegada.',
    ],
    included: [
      'Planificación privada de ruta y apoyo del equipo de Ethio Origins.',
      'Guías locales y conductor según la ruta confirmada.',
      'Visitas seleccionadas, paradas culturales y ritmo flexible del día.',
      'Apoyo con tiempos, nivel de comodidad y detalles prácticos del viaje.',
    ],
    importantNote:
      'El orden exacto se confirma según temporada, condiciones locales, disponibilidad y nivel de comodidad deseado.',
    itineraryActivities: (title, destination, day) =>
      `El día ${day} se organiza alrededor de ${title}, con acompañamiento privado, contexto local y un ritmo cómodo en la zona de ${destination}.`,
    itineraryMeals: 'Según el plan diario confirmado',
    itineraryOvernight: (isLast) =>
      isLast ? 'Salida o extensión del viaje' : 'Flexible según la ruta confirmada',
    itineraryTitle: (destination, day) => `Día ${day}: Experiencia guiada en ${destination}`,
    moment: (destination, index) =>
      `Momento destacado ${index + 1} del viaje privado en ${destination}`,
  },
  FR: {
    arrivalInfo: [
      'Arrivée à l’aéroport international Bole d’Addis-Abeba et accueil par l’équipe Ethio Origins.',
      'Transfert privé vers l’hôtel avec temps de repos ou première introduction légère selon l’heure d’arrivée.',
    ],
    included: [
      'Planification privée de l’itinéraire et accompagnement par l’équipe Ethio Origins.',
      'Guides locaux et chauffeur selon la route confirmée.',
      'Visites sélectionnées, pauses culturelles et rythme de journée flexible.',
      'Soutien pour le timing, le niveau de confort et les détails pratiques du voyage.',
    ],
    importantNote:
      'L’ordre exact est confirmé selon la saison, les conditions locales, les disponibilités et le niveau de confort souhaité.',
    itineraryActivities: (title, destination, day) =>
      `Le jour ${day} est organisé autour de ${title}, avec accompagnement privé, contexte local et rythme confortable dans la région de ${destination}.`,
    itineraryMeals: 'Selon le programme journalier confirmé',
    itineraryOvernight: (isLast) =>
      isLast ? 'Départ ou extension du voyage' : 'Flexible selon l’itinéraire confirmé',
    itineraryTitle: (destination, day) => `Jour ${day}: Expérience guidée à ${destination}`,
    moment: (destination, index) =>
      `Temps fort ${index + 1} du voyage privé à ${destination}`,
  },
}

const categoryTranslations: Partial<
  Record<LanguageCode, Record<string, CategoryText>>
> = {
  DE: {
    'day-tours': {
      name: 'Äthiopien Tagestouren',
      description:
        'Kurze geführte Tagestouren und Ausflüge ab Addis Abeba und anderen Ausgangspunkten mit Fokus auf Kultur, Geschichte, Natur und nahe Sehenswürdigkeiten.',
    },
    'cultural-tours': {
      name: 'Äthiopien Kulturreisen',
      description:
        'Kulturreisen mit lokalen Gemeinschaften, Märkten, lebendigen Traditionen, Essen, Musik und Begegnungen mit dem Kulturerbe.',
    },
    'omo-valley-tours': {
      name: 'Omo-Tal Touren',
      description:
        'Verantwortungsvolle Kulturreisen durch Gemeinschaften im Süden Äthiopiens, Flusslandschaften, Märkte und lokale Kulturrouten.',
    },
    'historical-tours': {
      name: 'Äthiopien Geschichtsreisen',
      description:
        'Kulturerbe-Pakete durch alte Städte, sakrale Architektur, Felsenkirchen und historische Routen im Norden.',
    },
    'religious-pilgrimage-tours': {
      name: 'Religiöse und Pilgerreisen',
      description:
        'Glaubensorientierte Reisen zu heiligen Stätten, Pilgerrouten, orthodoxen Traditionen und religiösem Erbe.',
    },
    'ethiopia-holiday-packages': {
      name: 'Äthiopien Urlaubspakete',
      description:
        'Kuratierte Urlaubspakete mit Geschichte, Kultur, religiösem Erbe, Landschaften und privater Reisebetreuung.',
    },
    'festival-tours': {
      name: 'Äthiopien Festivalreisen',
      description:
        'Festivalreisen rund um kulturelle Feiern, religiöse Zeremonien, saisonale Versammlungen und lebendige Traditionen.',
    },
    'nature-adventure-tours': {
      name: 'Äthiopien Abenteuerreisen',
      description:
        'Aktive Naturreisen durch Berge, Vulkanlandschaften, Nationalparks, Wildtiergebiete und Outdoor-Routen.',
    },
    'southern-ethiopia-tours': {
      name: 'Südäthiopien Reisen',
      description:
        'Reisen durch Südäthiopien mit Omo-Tal-Kulturen, Rift-Valley-Seen, Dorze-Dörfern, Konso-Erbe und Bale-Mountains-Wildnis.',
    },
    'nature-tours': {
      name: 'Äthiopien Naturreisen',
      description:
        'Naturreisen mit Hochlandlandschaften, Schluchten, Wasserfällen, Vogelwelt, Wildtierblickpunkten und leichten Wanderwegen.',
    },
    'nature-geological-tours': {
      name: 'Natur- und Geologiereisen',
      description:
        'Geführte Reisen zu geologischen Wundern, Vulkanlandschaften, geothermalen Feldern, Salzebenen und dramatischen Naturformen.',
    },
    'trekking-hiking-tours': {
      name: 'Äthiopien Trekking- und Wanderreisen',
      description:
        'Geführte Trekking- und Wanderrouten im äthiopischen Hochland, in Bergen und Nationalparks.',
    },
    'wildlife-tours': {
      name: 'Äthiopien Wildtierreisen',
      description:
        'Naturreisen mit endemischer Tierwelt, Vogelwelt, Nationalparks und Berghabitaten.',
    },
    'coffee-tours': {
      name: 'Äthiopien Kaffeereisen',
      description:
        'Reisen zum Ursprung des Kaffees mit Zeremonien, Farmgemeinschaften, regionalem Essen und Kaffeeerbe.',
    },
    'photography-tours': {
      name: 'Äthiopien Fotoreisen',
      description:
        'Fotobewusste Routen für Landschaften, Kulturerbestätten, Wildtiere und respektvolle kulturelle Geschichten.',
    },
    'birdwatching-tours': {
      name: 'Äthiopien Vogelbeobachtungsreisen',
      description:
        'Geführte Vogelbeobachtungs- und Naturreisen mit Seen, Hochlandhabitaten, endemischen Arten und fotofreundlichen Routen.',
    },
    'city-tours': {
      name: 'Äthiopien Stadttouren',
      description:
        'Geführte Stadterlebnisse mit Museen, Märkten, historischen Wahrzeichen, Kaffee und lokaler Küche.',
    },
    'addis-ababa-excursions': {
      name: 'Ausflüge ab Addis Abeba',
      description:
        'Private Ausflüge ab Addis Abeba zu naher Natur, Kultur, Geschichte und landschaftlichen Hochlandzielen.',
    },
    'unesco-heritage-tours': {
      name: 'UNESCO-Kulturerbereisen',
      description:
        'Äthiopienreisen zu UNESCO-Welterbestätten, historischen Städten, heiligen Monumenten, Kulturlandschaften und bewahrten Traditionen.',
    },
    'ethiopia-historic-route-tours': {
      name: 'Historische Route Äthiopien',
      description:
        'Nordäthiopische Kulturerbereisen, die Bahir Dar, Lake Tana, Gondar, Lalibela, Axum und weitere historische Höhepunkte verbinden.',
    },
    'private-customized-tours': {
      name: 'Private und maßgeschneiderte Reisen in Äthiopien',
      description:
        'Private Äthiopienreisen, gestaltet nach Reisedaten, Tempo, Interessen und gewünschtem Komfort.',
    },
  },
  ES: {
    'day-tours': {
      name: 'Tours de un día por Etiopía',
      description:
        'Tours guiados cortos y excursiones desde Addis Abeba y otros puntos de entrada, centrados en cultura, historia, naturaleza y lugares cercanos.',
    },
    'cultural-tours': {
      name: 'Tours culturales por Etiopía',
      description:
        'Viajes culturales centrados en comunidades locales, mercados, tradiciones vivas, gastronomía, música y encuentros patrimoniales.',
    },
    'omo-valley-tours': {
      name: 'Tours por el Valle del Omo',
      description:
        'Tours culturales responsables por comunidades del sur de Etiopía, paisajes fluviales, mercados y rutas de patrimonio local.',
    },
    'historical-tours': {
      name: 'Tours históricos por Etiopía',
      description:
        'Paquetes patrimoniales por ciudades antiguas, arquitectura sagrada, iglesias excavadas en roca y rutas históricas del norte.',
    },
    'religious-pilgrimage-tours': {
      name: 'Tours religiosos y de peregrinación',
      description:
        'Viajes de fe por sitios sagrados, rutas de peregrinación, tradiciones ortodoxas y patrimonio religioso.',
    },
    'ethiopia-holiday-packages': {
      name: 'Paquetes vacacionales por Etiopía',
      description:
        'Paquetes seleccionados que combinan historia, cultura, patrimonio religioso, paisajes y apoyo de viaje privado.',
    },
    'festival-tours': {
      name: 'Tours de festivales por Etiopía',
      description:
        'Viajes centrados en celebraciones culturales, ceremonias religiosas, encuentros de temporada y tradiciones vivas.',
    },
    'nature-adventure-tours': {
      name: 'Tours de aventura por Etiopía',
      description:
        'Viajes activos por montañas, paisajes volcánicos, parques nacionales, zonas de fauna y rutas al aire libre.',
    },
    'southern-ethiopia-tours': {
      name: 'Tours por el sur de Etiopía',
      description:
        'Viajes por el sur con culturas del Omo, lagos del Rift Valley, aldeas Dorze, patrimonio Konso y fauna de Bale Mountains.',
    },
    'nature-tours': {
      name: 'Tours de naturaleza por Etiopía',
      description:
        'Tours de naturaleza con paisajes de tierras altas, gargantas, cascadas, aves, miradores de fauna y rutas escénicas.',
    },
    'nature-geological-tours': {
      name: 'Tours de naturaleza y geología',
      description:
        'Tours guiados por maravillas geológicas, volcanes, campos geotérmicos, salares y formaciones naturales dramáticas.',
    },
    'trekking-hiking-tours': {
      name: 'Trekking y senderismo en Etiopía',
      description:
        'Rutas guiadas de trekking y senderismo en las tierras altas, montañas y parques nacionales escénicos de Etiopía.',
    },
    'wildlife-tours': {
      name: 'Tours de fauna por Etiopía',
      description:
        'Viajes de naturaleza con fauna endémica, aves, parques nacionales y hábitats de montaña.',
    },
    'coffee-tours': {
      name: 'Tours de café por Etiopía',
      description:
        'Viajes al origen del café con ceremonias, comunidades agrícolas, comida regional y patrimonio cafetero.',
    },
    'photography-tours': {
      name: 'Tours fotográficos por Etiopía',
      description:
        'Rutas pensadas para fotografía de paisajes, patrimonio, fauna y narrativas culturales con consentimiento.',
    },
    'birdwatching-tours': {
      name: 'Tours de observación de aves',
      description:
        'Tours guiados de aves y naturaleza con lagos, hábitats de tierras altas, especies endémicas y rutas aptas para fotografía.',
    },
    'city-tours': {
      name: 'Tours urbanos por Etiopía',
      description:
        'Experiencias urbanas guiadas con museos, mercados, monumentos históricos, café y comida local.',
    },
    'addis-ababa-excursions': {
      name: 'Excursiones desde Addis Abeba',
      description:
        'Excursiones privadas desde Addis Abeba a destinos cercanos de naturaleza, cultura, historia y paisajes de altura.',
    },
    'unesco-heritage-tours': {
      name: 'Tours de patrimonio UNESCO',
      description:
        'Tours por sitios UNESCO, ciudades históricas, monumentos sagrados, paisajes culturales y tradiciones vivas preservadas.',
    },
    'ethiopia-historic-route-tours': {
      name: 'Tours por la ruta histórica de Etiopía',
      description:
        'Tours patrimoniales del norte que conectan Bahir Dar, Lake Tana, Gondar, Lalibela, Axum y otros hitos históricos.',
    },
    'private-customized-tours': {
      name: 'Tours privados y personalizados en Etiopía',
      description:
        'Tours privados y a medida diseñados según fechas, ritmo, intereses y nivel de comodidad.',
    },
  },
  FR: {
    'day-tours': {
      name: 'Excursions d’une journée en Éthiopie',
      description:
        'Courtes visites guidées et excursions depuis Addis-Abeba et d’autres portes d’entrée, axées sur culture, histoire, nature et sites proches.',
    },
    'cultural-tours': {
      name: 'Circuits culturels en Éthiopie',
      description:
        'Voyages culturels autour des communautés locales, marchés, traditions vivantes, cuisine, musique et rencontres patrimoniales.',
    },
    'omo-valley-tours': {
      name: 'Circuits dans la vallée de l’Omo',
      description:
        'Circuits culturels responsables dans le sud de l’Éthiopie, entre communautés, paysages fluviaux, marchés et itinéraires patrimoniaux.',
    },
    'historical-tours': {
      name: 'Circuits historiques en Éthiopie',
      description:
        'Forfaits patrimoniaux à travers villes anciennes, architecture sacrée, églises rupestres et routes historiques du nord.',
    },
    'religious-pilgrimage-tours': {
      name: 'Circuits religieux et pèlerinages',
      description:
        'Voyages spirituels vers sites sacrés, routes de pèlerinage, traditions orthodoxes et patrimoine religieux.',
    },
    'ethiopia-holiday-packages': {
      name: 'Forfaits vacances en Éthiopie',
      description:
        'Forfaits sélectionnés combinant histoire, culture, patrimoine religieux, paysages et accompagnement privé.',
    },
    'festival-tours': {
      name: 'Circuits festivals en Éthiopie',
      description:
        'Voyages centrés sur célébrations culturelles, cérémonies religieuses, rassemblements saisonniers et traditions vivantes.',
    },
    'nature-adventure-tours': {
      name: 'Circuits aventure en Éthiopie',
      description:
        'Voyages actifs entre montagnes, paysages volcaniques, parcs nationaux, zones de faune et itinéraires de plein air.',
    },
    'southern-ethiopia-tours': {
      name: 'Circuits dans le sud de l’Éthiopie',
      description:
        'Voyages combinant cultures de l’Omo, lacs du Rift, villages Dorze, patrimoine Konso et faune des Bale Mountains.',
    },
    'nature-tours': {
      name: 'Circuits nature en Éthiopie',
      description:
        'Voyages nature avec hauts plateaux, gorges, cascades, oiseaux, points d’observation de la faune et promenades panoramiques.',
    },
    'nature-geological-tours': {
      name: 'Circuits nature et géologie',
      description:
        'Circuits guidés autour de merveilles géologiques, paysages volcaniques, champs géothermiques, salines et formations naturelles.',
    },
    'trekking-hiking-tours': {
      name: 'Trekking et randonnée en Éthiopie',
      description:
        'Itinéraires guidés de trekking et de randonnée dans les hauts plateaux, montagnes et parcs nationaux.',
    },
    'wildlife-tours': {
      name: 'Circuits faune en Éthiopie',
      description:
        'Voyages nature avec faune endémique, oiseaux, parcs nationaux et habitats de montagne.',
    },
    'coffee-tours': {
      name: 'Circuits café en Éthiopie',
      description:
        'Voyages à l’origine du café avec cérémonies, communautés agricoles, cuisine régionale et patrimoine caféier.',
    },
    'photography-tours': {
      name: 'Circuits photo en Éthiopie',
      description:
        'Itinéraires pensés pour paysages, sites patrimoniaux, faune et récits culturels avec respect du consentement.',
    },
    'birdwatching-tours': {
      name: 'Circuits ornithologiques en Éthiopie',
      description:
        'Circuits guidés d’observation des oiseaux avec lacs, habitats d’altitude, espèces endémiques et routes propices à la photo.',
    },
    'city-tours': {
      name: 'Visites de villes en Éthiopie',
      description:
        'Expériences urbaines guidées avec musées, marchés, monuments historiques, café et cuisine locale.',
    },
    'addis-ababa-excursions': {
      name: 'Excursions depuis Addis-Abeba',
      description:
        'Excursions privées depuis Addis-Abeba vers nature proche, culture, histoire et paysages de hauts plateaux.',
    },
    'unesco-heritage-tours': {
      name: 'Circuits patrimoine UNESCO',
      description:
        'Circuits autour des sites UNESCO, villes historiques, monuments sacrés, paysages culturels et traditions préservées.',
    },
    'ethiopia-historic-route-tours': {
      name: 'Circuits de la route historique d’Éthiopie',
      description:
        'Circuits patrimoniaux du nord reliant Bahir Dar, Lake Tana, Gondar, Lalibela, Axum et d’autres temps forts historiques.',
    },
    'private-customized-tours': {
      name: 'Circuits privés et sur mesure en Éthiopie',
      description:
        'Circuits privés et personnalisés selon dates, rythme, intérêts et niveau de confort.',
    },
  },
}

const tourTranslations: Partial<Record<LanguageCode, Record<string, TourText>>> = {
  DE: {
    '10-day-omo-valley-bale-mountains-cultural-adventure': {
      title: '10 Tage Omo-Tal und Bale Mountains Kulturabenteuer',
      description:
        'Erkunden Sie Omo-Tal, Mursi, Hamer, Karo, Dassanech, Konso, Dorze, Hawassa und Bale Mountains auf einer zehntägigen Südäthiopien-Reise.',
      destination: 'Omo-Tal',
      bestFor:
        'Kultur Südäthiopiens, Omo-Tal-Gemeinschaften, UNESCO-Erbe, Wildtiere, Vogelbeobachtung, Fotografie und private Überlandabenteuer',
    },
    '8-day-omo-valley-cultural-discovery-tour': {
      title: '8 Tage Omo-Tal Kulturentdeckungsreise',
      description:
        'Entdecken Sie die Kulturen des Omo-Tals, lokale Märkte, Gemeinschaften, Rift-Valley-Landschaften und private Reiseleitung im Süden Äthiopiens.',
      destination: 'Omo-Tal',
      bestFor:
        'Omo-Tal-Kultur, Gemeinschaften Südäthiopiens, UNESCO-Erbe, Rift-Valley-Landschaft, Wildtierbeobachtung, Fotografie und private Kulturreisen',
    },
    '3-day-lalibela-genna-festival-tour': {
      title: '3 Tage Lalibela Weihnachtsfest Genna Tour',
      description:
        'Erleben Sie Lalibelas Felsenkirchen und die äthiopisch-orthodoxe Genna-Feier auf einer kompakten religiösen Kulturerbereise.',
      destination: 'Lalibela',
      bestFor:
        'Religiöse Festivals, Pilgerreisen, äthiopisch-orthodoxe Traditionen, Geschichte, Kultur und erste Lalibela-Besuche',
    },
    '6-day-ethiopia-holiday-package': {
      title: '6 Tage Äthiopien Urlaubspaket',
      description:
        'Eine private Reise durch Addis Abeba, Bahir Dar, Gondar und Lalibela mit Kultur, Geschichte, Kirchen und Landschaften.',
      destination: 'Nordäthiopien',
      bestFor:
        'Geschichtsreisen, Kultururlaub, religiöses Erbe, Lalibela-Kirchen, Gondar-Schlösser, Lake-Tana-Klöster und private Äthiopienferien',
    },
    '4-day-danakil-depression-erta-ale-tour': {
      title: '4 Tage Danakil-Senke und Erta Ale Vulkanabenteuer',
      description:
        'Reisen Sie in die Danakil-Senke zu Dallol, Salzlandschaften, Afar-Kultur und dem aktiven Vulkan Erta Ale.',
      destination: 'Danakil-Senke',
      bestFor:
        'Abenteuerreisende, Geologie, Wüstenlandschaften, Afar-Kultur, Vulkan-Trekking und Fotografie',
    },
    '12-day-historic-north-omo-valley-tour': {
      title: '12 Tage Historischer Norden und Omo-Tal Kulturabenteuer',
      description:
        'Verbinden Sie Nordäthiopiens historische Route mit Omo-Tal-Kulturen, Rift-Valley-Seen und privater Reiseleitung.',
      destination: 'Historischer Norden und Omo-Tal',
      bestFor:
        'Erstbesucher, private Gruppen, Kulturerbe, Kultur, Landschaft, Höhepunkte Nordäthiopiens und Omo-Tal-Gemeinschaften',
    },
    '1-day-debre-libanos-portuguese-bridge-tour': {
      title: '1 Tag Debre Libanos Kloster und Portugiesische Brücke',
      description:
        'Ein Tagesausflug ab Addis Abeba zum Debre Libanos Kloster, zur Portugiesischen Brücke, Hochlandblicken und Natur.',
      destination: 'Debre Libanos',
      bestFor:
        'Addis-Abeba-Tagesausflüge, orthodoxes Erbe, Klostergeschichte, Hochlandlandschaft, Wildtiere, Vogelwelt und Fotografie',
    },
    '3-day-harar-cultural-historical-tour': {
      title: '3 Tage Harar Kultur- und Geschichtsreise',
      description:
        'Entdecken Sie Harars UNESCO-Altstadt, Märkte, islamisches Erbe, Hyänenfütterung und ostäthiopische Kultur.',
      destination: 'Harar',
      bestFor:
        'Kulturreisen, historische Städte, UNESCO-Erbe, islamische Geschichte, Märkte, Fotografie und private Ostäthiopienreisen',
    },
    '5-day-lalibela-danakil-depression-tour': {
      title: '5 Tage Lalibela und Danakil-Senke Abenteuer',
      description:
        'Kombinieren Sie Lalibelas heilige Felsenkirchen mit Danakil-Landschaften, Erta Ale, Dallol und Afar-Kultur.',
      destination: 'Lalibela und Danakil-Senke',
      bestFor:
        'Historische Routen, religiöses Erbe, Abenteuerreisen, Vulkan-Trekking, geologische Landschaften, Afar-Kultur und Fotografie',
    },
    '27-day-ethiopian-history-nature-culture-adventure': {
      title: '27 Tage Äthiopien Abenteuer: Geschichte, Natur und Kultur',
      description:
        'Eine umfassende private Äthiopienreise durch historische Städte, Danakil, Harar, Omo-Tal, Bale Mountains und Kulturregionen.',
      destination: 'Großes Äthiopien-Abenteuer',
      bestFor:
        'Komplette Äthiopienreisen, Geschichte, Kultur, UNESCO-Erbe, Danakil-Vulkanlandschaften, Omo-Tal, Wildtiere, Fotografie und lange private Abenteuer',
    },
    '20-day-ethiopia-historical-cultural-adventure': {
      title: '20 Tage Äthiopien Geschichts- und Kulturabenteuer',
      description:
        'Eine private Route durch Äthiopiens historische Städte, heilige Stätten, UNESCO-Erbe, Harar, Awash und Kulturlandschaften.',
      destination: 'Historische Route Äthiopien',
      bestFor:
        'Historische Routen, Kulturreisen, UNESCO-Erbe, religiöse Stätten, Wildtiere, Fotografie und private Mehrzielreisen',
    },
    'addis-ababa-full-day-city-tour': {
      title: 'Addis Abeba Ganztägige Stadttour',
      description:
        'Entdecken Sie Addis Abeba an einem Tag mit Museen, historischen Kirchen, Märkten, Kaffee und lokaler Kultur.',
      destination: 'Addis Abeba',
      bestFor:
        'Stadttouren, kulturelle Einführung, historische Stätten, Museen, Kirchen, Märkte, private Tagestouren und Erstbesucher',
    },
    'wonchi-crater-lake-day-tour': {
      title: 'Wonchi-Kratersee Tagestour',
      description:
        'Ein privater Tagesausflug zum Wonchi-Kratersee mit Hochlandblicken, Spaziergängen, Bootsfahrtoption und lokaler Kultur.',
      destination: 'Wonchi-Kratersee',
      bestFor:
        'Naturliebhaber, Ausflüge ab Addis Abeba, Wandern, optionales Reiten, Bootsfahrten, Vogelbeobachtung, Fotografie und lokale Kultur',
    },
    '14-day-ethiopia-historic-route-danakil-depression': {
      title: '14 Tage Historische Route Äthiopien und Danakil-Senke',
      description:
        'Eine Nordäthiopien-Reise durch Axum, Tigray, Bahir Dar, Gondar, Simien Mountains, Lalibela und Danakil-Bezüge.',
      destination: 'Historische Route Nordäthiopien',
      bestFor:
        'Nordäthiopische Geschichte, UNESCO-Erbe, Kirchen, Klöster, Simien-Berge, kulturelle Traditionen und private historische Reisen',
    },
    '5-day-ethiopia-historic-route-tour': {
      title: '5 Tage Historische Route Äthiopien',
      description:
        'Eine kompakte private Route durch Bahir Dar, Gondar, Lalibela und Axum mit Kirchen, Klöstern und alten Königreichen.',
      destination: 'Historische Route Äthiopien',
      bestFor:
        'Historische Route, UNESCO-Erbe, Kirchen, Klöster, Schlösser, alte Königreiche, Kulturentdeckung und private Äthiopienferien',
    },
  },
  ES: {
    '10-day-omo-valley-bale-mountains-cultural-adventure': {
      title: '10 días Valle del Omo y Bale Mountains: aventura cultural',
      description:
        'Explora el Valle del Omo, Mursi, Hamer, Karo, Dassanech, Konso, Dorze, Hawassa y Bale Mountains en una aventura de diez días.',
      destination: 'Valle del Omo',
      bestFor:
        'Cultura del sur de Etiopía, comunidades del Omo, patrimonio UNESCO, fauna, aves, fotografía y aventura privada por carretera',
    },
    '8-day-omo-valley-cultural-discovery-tour': {
      title: '8 días de descubrimiento cultural en el Valle del Omo',
      description:
        'Descubre culturas del Valle del Omo, mercados, comunidades, paisajes del Rift Valley y guía privada en el sur de Etiopía.',
      destination: 'Valle del Omo',
      bestFor:
        'Cultura Omo, comunidades del sur, patrimonio UNESCO, paisajes del Rift Valley, fauna, fotografía y viajes culturales privados',
    },
    '3-day-lalibela-genna-festival-tour': {
      title: '3 días Festival de Navidad Genna en Lalibela',
      description:
        'Vive las iglesias excavadas en roca de Lalibela y la celebración ortodoxa Genna en un viaje compacto de patrimonio religioso.',
      destination: 'Lalibela',
      bestFor:
        'Festivales religiosos, peregrinación, tradiciones ortodoxas etíopes, historia, cultura y primera visita a Lalibela',
    },
    '6-day-ethiopia-holiday-package': {
      title: 'Paquete vacacional de 6 días por Etiopía',
      description:
        'Viaje privado por Addis Abeba, Bahir Dar, Gondar y Lalibela con cultura, historia, iglesias y paisajes.',
      destination: 'Norte de Etiopía',
      bestFor:
        'Tours históricos, vacaciones culturales, patrimonio religioso, iglesias de Lalibela, castillos de Gondar, monasterios de Lake Tana y vacaciones privadas',
    },
    '4-day-danakil-depression-erta-ale-tour': {
      title: '4 días Depresión de Danakil y volcán Erta Ale',
      description:
        'Viaja a la Depresión de Danakil para conocer Dallol, paisajes salinos, cultura Afar y el volcán activo Erta Ale.',
      destination: 'Depresión de Danakil',
      bestFor:
        'Viajeros de aventura, geología, paisajes desérticos, cultura Afar, trekking volcánico y fotografía',
    },
    '12-day-historic-north-omo-valley-tour': {
      title: '12 días Norte histórico y Valle del Omo',
      description:
        'Conecta la ruta histórica del norte con culturas del Valle del Omo, lagos del Rift Valley y guía privada.',
      destination: 'Norte histórico y Valle del Omo',
      bestFor:
        'Primeros visitantes, grupos privados, patrimonio, cultura, paisajes, destacados del norte y comunidades del Omo',
    },
    '1-day-debre-libanos-portuguese-bridge-tour': {
      title: '1 día Monasterio Debre Libanos y Puente Portugués',
      description:
        'Excursión de un día desde Addis Abeba al monasterio Debre Libanos, el Puente Portugués, vistas de altura y naturaleza.',
      destination: 'Debre Libanos',
      bestFor:
        'Excursiones desde Addis Abeba, patrimonio ortodoxo, historia monástica, paisajes de altura, fauna, aves y fotografía',
    },
    '3-day-harar-cultural-historical-tour': {
      title: '3 días Harar cultural e histórico',
      description:
        'Descubre la ciudad UNESCO de Harar, mercados, patrimonio islámico, ceremonia de hienas y cultura del este de Etiopía.',
      destination: 'Harar',
      bestFor:
        'Viaje cultural, ciudades históricas, patrimonio UNESCO, historia islámica, mercados, fotografía y tours privados por el este',
    },
    '5-day-lalibela-danakil-depression-tour': {
      title: '5 días Lalibela y Depresión de Danakil',
      description:
        'Combina las iglesias sagradas de Lalibela con paisajes de Danakil, Erta Ale, Dallol y cultura Afar.',
      destination: 'Lalibela y Depresión de Danakil',
      bestFor:
        'Rutas históricas, patrimonio religioso, aventura, trekking volcánico, paisajes geológicos, cultura Afar y fotografía',
    },
    '27-day-ethiopian-history-nature-culture-adventure': {
      title: '27 días Etiopía: historia, naturaleza y cultura',
      description:
        'Gran viaje privado por ciudades históricas, Danakil, Harar, Valle del Omo, Bale Mountains y regiones culturales.',
      destination: 'Gran aventura por Etiopía',
      bestFor:
        'Viaje completo por Etiopía, historia, cultura, UNESCO, volcanes de Danakil, Valle del Omo, fauna, fotografía y aventura privada larga',
    },
    '20-day-ethiopia-historical-cultural-adventure': {
      title: '20 días aventura histórica y cultural por Etiopía',
      description:
        'Ruta privada por ciudades históricas, sitios sagrados, patrimonio UNESCO, Harar, Awash y paisajes culturales.',
      destination: 'Ruta histórica de Etiopía',
      bestFor:
        'Rutas históricas, viaje cultural, patrimonio UNESCO, sitios religiosos, fauna, fotografía y viajes privados multidestino',
    },
    'addis-ababa-full-day-city-tour': {
      title: 'Tour de día completo por Addis Abeba',
      description:
        'Descubre Addis Abeba en un día con museos, iglesias históricas, mercados, café y cultura local.',
      destination: 'Addis Abeba',
      bestFor:
        'Tours urbanos, introducción cultural, sitios históricos, museos, iglesias, mercados, tours privados de un día y primeros visitantes',
    },
    'wonchi-crater-lake-day-tour': {
      title: 'Tour de un día al Lago del Cráter Wonchi',
      description:
        'Excursión privada al Lago del Cráter Wonchi con vistas de altura, caminatas, opción de bote y cultura local.',
      destination: 'Lago del Cráter Wonchi',
      bestFor:
        'Amantes de la naturaleza, excursiones desde Addis Abeba, senderismo, paseo a caballo opcional, bote, aves, fotografía y cultura local',
    },
    '14-day-ethiopia-historic-route-danakil-depression': {
      title: '14 días Ruta histórica de Etiopía y Danakil',
      description:
        'Viaje por el norte con Axum, Tigray, Bahir Dar, Gondar, Simien Mountains, Lalibela y conexión con Danakil.',
      destination: 'Ruta histórica del norte de Etiopía',
      bestFor:
        'Historia del norte, patrimonio UNESCO, iglesias, monasterios, Simien Mountains, tradiciones culturales y viaje privado histórico',
    },
    '5-day-ethiopia-historic-route-tour': {
      title: '5 días Ruta histórica de Etiopía',
      description:
        'Ruta privada compacta por Bahir Dar, Gondar, Lalibela y Axum con iglesias, monasterios y reinos antiguos.',
      destination: 'Ruta histórica de Etiopía',
      bestFor:
        'Ruta histórica, UNESCO, iglesias, monasterios, castillos, reinos antiguos, descubrimiento cultural y vacaciones privadas',
    },
  },
  FR: {
    '10-day-omo-valley-bale-mountains-cultural-adventure': {
      title: '10 jours vallée de l’Omo et Bale Mountains: aventure culturelle',
      description:
        'Explorez la vallée de l’Omo, Mursi, Hamer, Karo, Dassanech, Konso, Dorze, Hawassa et Bale Mountains en dix jours.',
      destination: 'Vallée de l’Omo',
      bestFor:
        'Culture du sud de l’Éthiopie, communautés de l’Omo, patrimoine UNESCO, faune, oiseaux, photographie et aventure privée par la route',
    },
    '8-day-omo-valley-cultural-discovery-tour': {
      title: '8 jours découverte culturelle dans la vallée de l’Omo',
      description:
        'Découvrez les cultures de l’Omo, les marchés, les communautés, les paysages du Rift et un accompagnement privé dans le sud.',
      destination: 'Vallée de l’Omo',
      bestFor:
        'Culture de l’Omo, communautés du sud, patrimoine UNESCO, paysages du Rift, faune, photographie et voyage culturel privé',
    },
    '3-day-lalibela-genna-festival-tour': {
      title: '3 jours Festival de Noël Genna à Lalibela',
      description:
        'Vivez les églises rupestres de Lalibela et la célébration orthodoxe Genna lors d’un court voyage de patrimoine religieux.',
      destination: 'Lalibela',
      bestFor:
        'Festivals religieux, pèlerinage, traditions orthodoxes éthiopiennes, histoire, culture et première visite de Lalibela',
    },
    '6-day-ethiopia-holiday-package': {
      title: 'Forfait vacances de 6 jours en Éthiopie',
      description:
        'Voyage privé par Addis-Abeba, Bahir Dar, Gondar et Lalibela avec culture, histoire, églises et paysages.',
      destination: 'Nord de l’Éthiopie',
      bestFor:
        'Circuits historiques, vacances culturelles, patrimoine religieux, églises de Lalibela, châteaux de Gondar, monastères du lac Tana et voyages privés',
    },
    '4-day-danakil-depression-erta-ale-tour': {
      title: '4 jours dépression du Danakil et volcan Erta Ale',
      description:
        'Voyagez dans la dépression du Danakil avec Dallol, paysages de sel, culture Afar et volcan actif Erta Ale.',
      destination: 'Dépression du Danakil',
      bestFor:
        'Voyageurs d’aventure, géologie, paysages désertiques, culture Afar, trekking volcanique et photographie',
    },
    '12-day-historic-north-omo-valley-tour': {
      title: '12 jours Nord historique et vallée de l’Omo',
      description:
        'Reliez la route historique du nord aux cultures de l’Omo, aux lacs du Rift et à un accompagnement privé.',
      destination: 'Nord historique et vallée de l’Omo',
      bestFor:
        'Premiers visiteurs, groupes privés, patrimoine, culture, paysages, temps forts du nord et communautés de l’Omo',
    },
    '1-day-debre-libanos-portuguese-bridge-tour': {
      title: '1 jour monastère Debre Libanos et pont portugais',
      description:
        'Excursion d’une journée depuis Addis-Abeba vers Debre Libanos, le pont portugais, les vues de hauts plateaux et la nature.',
      destination: 'Debre Libanos',
      bestFor:
        'Excursions depuis Addis-Abeba, patrimoine orthodoxe, histoire monastique, hauts plateaux, faune, oiseaux et photographie',
    },
    '3-day-harar-cultural-historical-tour': {
      title: '3 jours Harar culturel et historique',
      description:
        'Découvrez la ville UNESCO de Harar, ses marchés, son patrimoine islamique, la cérémonie des hyènes et la culture de l’est.',
      destination: 'Harar',
      bestFor:
        'Voyage culturel, villes historiques, patrimoine UNESCO, histoire islamique, marchés, photographie et circuits privés dans l’est',
    },
    '5-day-lalibela-danakil-depression-tour': {
      title: '5 jours Lalibela et dépression du Danakil',
      description:
        'Associez les églises sacrées de Lalibela aux paysages du Danakil, Erta Ale, Dallol et à la culture Afar.',
      destination: 'Lalibela et dépression du Danakil',
      bestFor:
        'Routes historiques, patrimoine religieux, aventure, trekking volcanique, paysages géologiques, culture Afar et photographie',
    },
    '27-day-ethiopian-history-nature-culture-adventure': {
      title: '27 jours Éthiopie: histoire, nature et culture',
      description:
        'Grand voyage privé à travers villes historiques, Danakil, Harar, vallée de l’Omo, Bale Mountains et régions culturelles.',
      destination: 'Grande aventure en Éthiopie',
      bestFor:
        'Voyage complet en Éthiopie, histoire, culture, UNESCO, volcans du Danakil, vallée de l’Omo, faune, photographie et longue aventure privée',
    },
    '20-day-ethiopia-historical-cultural-adventure': {
      title: '20 jours aventure historique et culturelle en Éthiopie',
      description:
        'Route privée par villes historiques, sites sacrés, patrimoine UNESCO, Harar, Awash et paysages culturels.',
      destination: 'Route historique d’Éthiopie',
      bestFor:
        'Routes historiques, voyage culturel, patrimoine UNESCO, sites religieux, faune, photographie et voyages privés multi-destinations',
    },
    'addis-ababa-full-day-city-tour': {
      title: 'Visite d’Addis-Abeba en journée complète',
      description:
        'Découvrez Addis-Abeba en une journée avec musées, églises historiques, marchés, café et culture locale.',
      destination: 'Addis-Abeba',
      bestFor:
        'Visites urbaines, introduction culturelle, sites historiques, musées, églises, marchés, visites privées d’une journée et premiers visiteurs',
    },
    'wonchi-crater-lake-day-tour': {
      title: 'Excursion au lac de cratère Wonchi',
      description:
        'Excursion privée au lac de cratère Wonchi avec vues d’altitude, promenades, option bateau et culture locale.',
      destination: 'Lac de cratère Wonchi',
      bestFor:
        'Amoureux de nature, excursions depuis Addis-Abeba, randonnée, cheval optionnel, bateau, oiseaux, photographie et culture locale',
    },
    '14-day-ethiopia-historic-route-danakil-depression': {
      title: '14 jours route historique d’Éthiopie et Danakil',
      description:
        'Voyage dans le nord avec Axum, Tigray, Bahir Dar, Gondar, Simien Mountains, Lalibela et lien avec le Danakil.',
      destination: 'Route historique du nord de l’Éthiopie',
      bestFor:
        'Histoire du nord, patrimoine UNESCO, églises, monastères, Simien Mountains, traditions culturelles et voyage historique privé',
    },
    '5-day-ethiopia-historic-route-tour': {
      title: '5 jours route historique d’Éthiopie',
      description:
        'Route privée compacte par Bahir Dar, Gondar, Lalibela et Axum avec églises, monastères et royaumes anciens.',
      destination: 'Route historique d’Éthiopie',
      bestFor:
        'Route historique, UNESCO, églises, monastères, châteaux, royaumes anciens, découverte culturelle et vacances privées',
    },
  },
}

function localizeDuration(duration: string, language: LanguageCode) {
  const labels = durationLabels[language]

  return duration
    .replace(/\b1 Day\b/g, `1 ${labels.day}`)
    .replace(/\b(\d+) Days\b/g, `$1 ${labels.days}`)
}

function localizeTourDetails<T extends Tour>(
  tour: T,
  language: LanguageCode,
  title: string,
  destination: string,
) {
  if (language === 'EN') {
    return {}
  }

  const templates = detailTemplates[language]
  const itinerary = tour.itinerary.map((item, index) => {
    const day = item.day ?? index + 1
    const isLast = index === tour.itinerary.length - 1

    return {
      ...item,
      activities: templates.itineraryActivities(title, destination, day),
      meals:
        'meals' in item && item.meals ? templates.itineraryMeals : undefined,
      overnight: templates.itineraryOvernight(isLast),
      title: templates.itineraryTitle(destination, day),
    }
  })

  const localizedDetails: Partial<T> & {
    arrivalInfo?: string[]
    importantNote?: string
  } = {
    included: tour.included.length ? templates.included : [],
    itinerary,
    moments: tour.moments.map((_, index) =>
      templates.moment(destination, index),
    ),
  } as Partial<T>

  if ('arrivalInfo' in tour && Array.isArray(tour.arrivalInfo)) {
    localizedDetails.arrivalInfo = templates.arrivalInfo
  }

  if ('importantNote' in tour && typeof tour.importantNote === 'string') {
    localizedDetails.importantNote = templates.importantNote
  }

  return localizedDetails
}

export function getLocalizedTour<T extends Tour>(
  tour: T,
  language: LanguageCode,
): T {
  const translation = tourTranslations[language]?.[tour.slug]

  if (!translation && language === 'EN') {
    return tour
  }

  const title = translation?.title ?? tour.title
  const description = translation?.description ?? tour.description
  const destination = translation?.destination ?? tour.destination

  return {
    ...tour,
    ...translation,
    ...localizeTourDetails(tour, language, title, destination),
    description,
    duration: localizeDuration(tour.duration, language),
    intro:
      translation?.intro ??
      (translation?.description
        ? `${description} ${title} ${privateJourneySuffix[language]}`
        : tour.intro),
    title,
  }
}

export function getLocalizedTours<T extends Tour>(
  tours: T[],
  language: LanguageCode,
) {
  return tours.map((tour) => getLocalizedTour(tour, language))
}

export function getLocalizedTourCategory<T extends TourCategory>(
  category: T,
  language: LanguageCode,
): T {
  const translation = categoryTranslations[language]?.[category.slug]

  return translation ? { ...category, ...translation } : category
}

export function getLocalizedTourCategories<T extends TourCategory>(
  categories: T[],
  language: LanguageCode,
) {
  return categories.map((category) =>
    getLocalizedTourCategory(category, language),
  )
}
