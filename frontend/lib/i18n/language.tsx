'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type LanguageCode = 'EN' | 'DE' | 'ES' | 'FR'

export const languages = [
  { code: 'EN', label: 'English', displayName: 'English' },
  { code: 'DE', label: 'German', displayName: 'Deutsch' },
  { code: 'ES', label: 'Spanish', displayName: 'Español' },
  { code: 'FR', label: 'French', displayName: 'Français' },
] as const

const storageKey = 'ethio-origins-language'

export const translations = {
  EN: {
    nav: {
      home: 'Home',
      destinations: 'Destinations',
      tours: 'Tours',
      gallery: 'Gallery',
      blog: 'Blog',
      contact: 'Contact Us',
      contactShort: 'Contact',
      plan: 'Plan Your Journey',
      seeMoreDestinations: 'See more destinations',
      seeMoreTours: 'See more tours',
      all: 'All',
      language: 'Language',
      changeLanguage: 'Change language',
    },
    hero: {
      eyebrow: 'The Land of Origins',
      title: 'Explore Ethiopia with Local Travel Experts',
      description:
        'Expertly crafted journeys through ancient history, vibrant cultures, and extraordinary landscapes.',
      primaryCta: 'Explore Tours',
      secondaryCta: 'Plan Your Journey',
      scroll: 'Scroll down',
    },
    trust: [
      'Travelers Hosted',
      'Curated Experiences',
      'Guest Satisfaction',
      'Local Expertise',
    ],
    experiences: {
      eyebrow: 'Signature Journeys',
      title: 'Exceptional Journeys, Expertly Crafted',
      description:
        'Discover Ethiopia through carefully curated experiences that blend culture, history, nature, and authentic local connections.',
      discover: 'Discover Journey',
      exploreMore: 'Explore More',
    },
    destinations: {
      eyebrow: 'Where to Explore',
      title: "Discover Ethiopia's Remarkable Regions",
      description:
        "Journey through historic wonders, dramatic landscapes, and authentic cultural experiences across one of Africa's most diverse destinations.",
      exploreDestinations: 'Explore Destinations',
      exploreTrip: 'Explore Trip',
      exploreMore: 'Explore More',
    },
    why: {
      eyebrow: 'Why Ethiopia',
      title: 'Why Ethiopia Captivates Travelers',
      description:
        "Few destinations offer such a remarkable blend of history, culture, nature, and authenticity. Ethiopia is home to ancient civilizations, UNESCO World Heritage Sites, unique wildlife, vibrant traditions, and some of Africa's most spectacular landscapes.",
      facts: [
        ['Ancient', 'History'],
        ['Living', 'Cultures'],
        ['Epic', 'Landscapes'],
        ['Local', 'Experiences'],
      ],
    },
    custom: {
      eyebrow: 'Why Travel With Ethio Origins',
      title: 'Why Travelers Choose Ethio Origins',
      description:
        'Local expertise, private planning, and authentic access come together to create journeys that feel personal, polished, and deeply connected to place.',
      features: [
        [
          '15+',
          'Years Local Expertise',
          'Deep regional knowledge shaped by years of planning and guiding journeys across Ethiopia.',
        ],
        [
          '100%',
          'Tailor-Made Journeys',
          'Every itinerary is carefully designed around your pace, interests, comfort, and travel style.',
        ],
        [
          'Expert',
          'Guides Across Ethiopia',
          'Travel with knowledgeable local guides who bring history, culture, and landscapes to life.',
        ],
        [
          'Authentic',
          'Cultural Access',
          'Meaningful encounters with communities, traditions, and stories beyond ordinary sightseeing.',
        ],
      ],
      promiseEyebrow: 'Our Promise',
      promise:
        "We don't just show Ethiopia. We help you experience it through meaningful encounters, expert guidance, and carefully crafted journeys.",
    },
    gallery: {
      reel: 'Ethio Origins / Visual Reel',
      eyebrow: 'A Visual Diary',
      title: 'Moments That Define Ethiopia',
      description:
        'A collection of landscapes, traditions, wildlife, architecture, and human connections shown as a cinematic photo reel.',
      notes: ['Landscapes', 'Traditions', 'Human Connections'],
      view: 'View Full Gallery',
      pause: 'Pause gallery reel',
      play: 'Play gallery reel',
      show: 'Show',
    },
    testimonials: {
      eyebrow: 'Guest Experiences',
      title: 'Experiences Shared By Our Guests',
      description:
        'Travelers from around the world choose Ethio Origins Tours to experience Ethiopia in a deeper, more meaningful way. Their stories reflect the unforgettable moments, personal connections, and extraordinary discoveries that define our journeys.',
      items: [
        'The most profound trip of my life. Every detail was flawless, and our guide felt like family by the end.',
        'Ethio Origins gave us access and stories no other operator could. The Omo Valley left us speechless.',
        'From the Simien sunrises to the coffee ceremonies, it was cinematic, authentic, and deeply moving.',
      ],
    },
    story: {
      eyebrow: 'Our Story',
      title: 'Travel With Purpose',
      paragraphs: [
        'Ethio Origins Tours was founded with a simple mission: to share the richness of Ethiopia with the world through authentic, responsible, and unforgettable travel experiences.',
        'Our team combines local knowledge, professional expertise, and a genuine passion for Ethiopian culture, history, and nature. We go beyond sightseeing to create journeys that foster connection, understanding, and discovery.',
        'Our journeys support local businesses, promote cultural preservation, encourage responsible travel practices, and contribute to sustainable tourism development across Ethiopia.',
      ],
      quote:
        "We don't just guide journeys. We create meaningful connections between travelers and the soul of Ethiopia.",
    },
    footer: {
      description:
        'Expertly crafted Ethiopian journeys inspired by culture, heritage, nature, and discovery. Creating meaningful travel experiences through authentic local expertise and responsible tourism.',
      journeys: 'Journeys',
      allTours: 'All Tours',
      signatureJourneys: 'Signature Journeys',
      privateTrips: 'Private Custom Trips',
      plan: 'Plan Your Journey',
      destinations: 'Destinations',
      allDestinations: 'All Destinations',
      historicNorth: 'Historic North',
      omoValley: 'Omo Valley',
      danakil: 'Danakil & Rift Valley',
      company: 'Company',
      about: 'About Us',
      philosophy: 'Our Philosophy',
      responsibleTourism: 'Responsible Tourism',
      gallery: 'Gallery',
      contact: 'Contact',
      response: 'Your email address',
      subscribe: 'Subscribe',
      platforms: 'Trusted Travel Platforms',
      platformTitle: 'Find us where discerning travelers plan.',
      platformDescription:
        'Explore our presence across selected global travel platforms for reviews, curated experiences, stays, and planning inspiration.',
      rights: 'All rights reserved.',
      terms: 'Terms',
      privacy: 'Privacy',
    },
    destinationsPage: {
      heroBack: 'Back Home',
      heroEyebrow: 'Dedicated Destinations',
      heroTitle: "Explore Ethiopia's Top Travel Destinations",
      heroDescription:
        'Every destination below opens its own dedicated page with a premium overview, highlights, sample flow, and private planning options.',
      filters: [
        'All',
        'Historical & Religious',
        'Lakes & Scenic',
        'Mountains & Wildlife',
        'Adventure & Geological',
        'Tribal & Cultural',
      ],
      openPage: 'Open dedicated page',
      detailBack: 'Back to Destinations',
      planTrip: 'Plan This Trip',
      viewSample: 'View Sample Flow',
      snapshot: 'Journey Snapshot',
      planning: 'Planning',
      region: 'Region',
      travelStyle: 'Travel Style',
      travelStyleText: 'Private, flexible, locally guided, and tailored around your pace.',
      requestProposal: 'Request Proposal',
      overviewEyebrow: 'Destination Overview',
      overviewTitle: 'A journey shaped around place, pace, and story.',
      overviewSuffix:
        'Every route is refined around season, access, travel style, and the level of comfort you want on the road.',
      curatorNote: 'Curator Note',
      curatorTitle: 'Leave room for light, local rhythm, and the unexpected.',
      curatorText:
        'We build space for markets, roadside coffee, shifting weather, and personal introductions that make Ethiopia feel intimate.',
      pace: 'Pace',
      private: 'Private',
      route: 'Route',
      tailored: 'Tailored',
      sampleEyebrow: 'Sample Flow',
      sampleTitle: 'A polished route with room to breathe',
      sampleDescription:
        'The order below is a sample framework. We adjust timing, lodges, driving rhythm, and special access after we understand the season and your travel style.',
      sampleCardText:
        'The exact timing is adjusted around weather, local access, your interests, and the rhythm of the route.',
      designedEyebrow: 'Designed Around You',
      designedTitle: 'Make this destination your own.',
      personalizationText:
        'Selected and adjusted after we understand how you want the journey to feel.',
      personalizationItems: ['Private guides', 'Flexible lodges', 'Seasonal timing'],
      relatedToursEyebrow: 'Related Tour Packages',
      toursFeaturing: 'Tours featuring',
      viewAllTours: 'View All Tours',
      continueExploring: 'Continue Exploring',
      moreDestinations: 'More destinations to consider',
      allDestinations: 'All destinations',
      exploreTrip: 'Explore Trip',
      ctaEyebrow: 'Begin Planning',
      ctaTitlePrefix: 'Let us shape the right route for',
      ctaDescription:
        'Tell us your dates, interests, comfort level, and pace. We will design a private itinerary around the way you want to travel.',
      ctaButton: 'Start a Private Journey',
      extrasEyebrow: 'Festivals and Adventure',
      extrasTitle: 'Seasonal culture and signature experiences',
      topFestivals: 'Top Festivals',
      topAdventure: 'Top Adventure Experiences',
      breadcrumbsHome: 'Home',
      breadcrumbsDestinations: 'Destinations',
    },
    toursPage: {
      heroBack: 'Back Home',
      heroEyebrow: 'Dedicated Tours',
      heroTitle: 'Ethiopia Tour Packages',
      heroDescription:
        'Every tour below opens its own dedicated page with route details, highlights, sample itinerary, and private planning options.',
      categories: 'Tour Categories',
      openTourPage: 'Open tour page',
      openDedicatedPageFor: 'Open dedicated page for',
      detailBack: 'Back to Tours',
      privateTourPackage: 'Private Tour Package',
      duration: 'Duration',
      region: 'Region',
      style: 'Style',
      private: 'Private',
      selectedPackage: 'Selected Package',
      craftedAroundDates: 'crafted around your dates.',
      bookThisTour: 'Book This Tour',
      overview: 'Overview',
      itinerary: 'Itinerary',
      practicalInfo: 'Practical Info',
      privateJourney: 'Private Journey',
      arrival: 'Arrival',
      beforeDayOne: 'Before Day 1',
      importantNote: 'Important Note',
      sampleRouteTitle: 'A polished sample route',
      day: 'Day',
      overnight: 'Overnight',
      meals: 'Meals',
      includedTitle: 'What is included',
      asideTitle: 'Built around your dates, pace, and comfort level.',
      asideDescription:
        'We refine the route after learning how you want the journey to feel.',
      requestProposal: 'Request Proposal',
      relatedDestinations: 'Related Destinations',
      relatedTourStyles: 'Related Tour Styles',
      morePrivatePackages: 'More Private Packages',
      relatedTitle: 'Other journeys you may like',
      viewAllTours: 'View All Tours',
      categoryEyebrow: 'Tour Category',
      relatedPackages: 'Related Packages',
      planPrefix: 'Plan',
      requestCustomTour: 'Request a Custom Tour',
      breadcrumbsHome: 'Home',
      breadcrumbsTours: 'Tours',
    },
    blogPage: {
      heroBack: 'Back Home',
      heroEyebrow: 'Ethio Origins Journal',
      heroTitle: 'Ethiopia Travel Guide',
      heroDescription:
        'Refined guides and field notes for travelers planning meaningful journeys across Ethiopia.',
      cta: 'Plan with this insight',
      fallbackCategory: 'Travel Insight',
      fallbackDate: 'Travel Guide',
      fallbackExcerpt: 'Read the latest Ethio Origins travel insight.',
      posts: {
        'How to Experience Ethiopia Beyond the Highlights': {
          title: 'How to Experience Ethiopia Beyond the Highlights',
          category: 'Travel Insight',
          date: 'June 2026',
          excerpt:
            'A thoughtful guide to pairing iconic landmarks with slower, more personal cultural encounters.',
        },
        'The Art of Planning a Private Ethiopian Journey': {
          title: 'The Art of Planning a Private Ethiopian Journey',
          category: 'Private Travel',
          date: 'June 2026',
          excerpt:
            'What makes a tailor-made itinerary feel seamless, meaningful, and deeply connected to place.',
        },
        'Landscapes That Shape the Ethiopian Story': {
          title: 'Landscapes That Shape the Ethiopian Story',
          category: 'Nature & Culture',
          date: 'June 2026',
          excerpt:
            'From highland escarpments to volcanic terrain, Ethiopia rewards travelers who look closely.',
        },
      },
    },
    contactPage: {
      heroBack: 'Back Home',
      eyebrow: 'Contact Us',
      title: 'Plan Your Ethiopian Journey',
      description:
        'Speak with our Addis Ababa-based travel designers about private cultural routes, nature escapes, heritage journeys, and fully bespoke itineraries across Ethiopia.',
      privatePlanning: 'Private Planning',
      replyWindow: 'Reply Window',
      tailorMade: 'Tailor Made',
      form: {
        fullName: 'Full Name',
        namePlaceholder: 'Your name',
        email: 'Email Address',
        phone: 'Phone or WhatsApp',
        month: 'Preferred Month',
        monthPlaceholder: 'October 2026',
        journeyStyle: 'Journey Style',
        travelers: 'Travelers',
        groupPlaceholder: 'Select group size',
        travelerOptions: ['Solo traveler', '2 travelers', '3-5 travelers', '6+ travelers'],
        tripLength: 'Trip Length',
        durationPlaceholder: 'Select duration',
        durationOptions: ['3-5 days', '6-9 days', '10-14 days', '15+ days'],
        message: 'Tell Us What You Imagine',
        messagePlaceholder:
          'Interests, comfort level, must-see places, dietary needs, celebration details, or anything else we should know.',
        sending: 'Sending...',
        submit: 'Send Inquiry',
        success: 'Thanks. Your inquiry was sent successfully.',
        error: 'Could not submit the inquiry.',
        notProvided: 'Not provided',
        notSelected: 'Not selected',
      },
      tripStyles: [
        'Historic North',
        'Omo Valley Culture',
        'Danakil Expedition',
        'Bale Mountains',
        'Rift Valley',
        'Custom Journey',
      ],
      direct: {
        eyebrow: 'Direct Contact',
        title: 'Prefer to speak now?',
        description:
          'Our team responds quickly during Ethiopia business hours and follows up with a clear next step.',
        methods: {
          'Call or WhatsApp': 'Call or WhatsApp',
          Email: 'Email',
          Office: 'Office',
        },
        responseTitle: 'Response Time',
        responseText:
          'New inquiries receive a personal response within one business day. Urgent travelers can reach us by WhatsApp.',
      },
      planning: {
        eyebrow: 'How Planning Works',
        title: 'From first note to final route',
        step: 'Step',
        steps: [
          [
            'Share the Dream',
            'Tell us when you want to travel, who is coming, and what kind of Ethiopia you want to experience.',
          ],
          [
            'Shape the Route',
            'We refine pacing, regions, guides, lodging style, and meaningful cultural access around your priorities.',
          ],
          [
            'Travel With Care',
            'Your private guide, driver, local hosts, and support team stay close from arrival to departure.',
          ],
        ],
      },
    },
    finalCta: {
      eyebrow: 'Begin the Journey',
      title: 'Your Ethiopian Story Starts Here',
      description:
        "Whether you're seeking adventure, culture, wildlife, or history, we'll create a journey you'll never forget.",
      primary: 'Plan Your Journey',
      secondary: 'Contact Us',
    },
  },
  DE: {
    nav: {
      home: 'Startseite',
      destinations: 'Reiseziele',
      tours: 'Touren',
      gallery: 'Galerie',
      blog: 'Blog',
      contact: 'Kontakt',
      contactShort: 'Kontakt',
      plan: 'Reise planen',
      seeMoreDestinations: 'Weitere Reiseziele ansehen',
      seeMoreTours: 'Weitere Touren ansehen',
      all: 'Alle',
      language: 'Sprache',
      changeLanguage: 'Sprache ändern',
    },
    hero: {
      eyebrow: 'Das Land der Ursprünge',
      title: 'Entdecken Sie Äthiopien mit lokalen Reiseexperten',
      description:
        'Sorgfältig gestaltete Reisen durch alte Geschichte, lebendige Kulturen und außergewöhnliche Landschaften.',
      primaryCta: 'Touren entdecken',
      secondaryCta: 'Reise planen',
      scroll: 'Nach unten scrollen',
    },
    trust: [
      'Betreute Reisende',
      'Kuratierte Erlebnisse',
      'Gästezufriedenheit',
      'Lokale Expertise',
    ],
    experiences: {
      eyebrow: 'Signature-Reisen',
      title: 'Außergewöhnliche Reisen, fachkundig gestaltet',
      description:
        'Entdecken Sie Äthiopien durch sorgfältig kuratierte Erlebnisse, die Kultur, Geschichte, Natur und authentische lokale Begegnungen verbinden.',
      discover: 'Reise entdecken',
      exploreMore: 'Mehr entdecken',
    },
    destinations: {
      eyebrow: 'Wohin reisen',
      title: 'Entdecken Sie Äthiopiens bemerkenswerte Regionen',
      description:
        'Reisen Sie durch historische Wunder, dramatische Landschaften und authentische Kulturerlebnisse in einem der vielfältigsten Reiseziele Afrikas.',
      exploreDestinations: 'Reiseziele entdecken',
      exploreTrip: 'Reise ansehen',
      exploreMore: 'Mehr entdecken',
    },
    why: {
      eyebrow: 'Warum Äthiopien',
      title: 'Warum Äthiopien Reisende fasziniert',
      description:
        'Nur wenige Reiseziele bieten eine so besondere Verbindung aus Geschichte, Kultur, Natur und Authentizität. Äthiopien ist Heimat alter Zivilisationen, UNESCO-Welterbestätten, einzigartiger Tierwelt, lebendiger Traditionen und spektakulärer Landschaften.',
      facts: [
        ['Alte', 'Geschichte'],
        ['Lebendige', 'Kulturen'],
        ['Epische', 'Landschaften'],
        ['Lokale', 'Erlebnisse'],
      ],
    },
    custom: {
      eyebrow: 'Warum mit Ethio Origins reisen',
      title: 'Warum Reisende Ethio Origins wählen',
      description:
        'Lokale Expertise, private Planung und authentischer Zugang schaffen Reisen, die persönlich, hochwertig und tief mit dem Ort verbunden sind.',
      features: [
        [
          '15+',
          'Jahre lokale Expertise',
          'Tiefes regionales Wissen aus Jahren der Planung und Reiseleitung in ganz Äthiopien.',
        ],
        [
          '100%',
          'Maßgeschneiderte Reisen',
          'Jede Route wird sorgfältig auf Tempo, Interessen, Komfort und Reisestil abgestimmt.',
        ],
        [
          'Experten',
          'Guides in ganz Äthiopien',
          'Reisen Sie mit kundigen lokalen Guides, die Geschichte, Kultur und Landschaften lebendig machen.',
        ],
        [
          'Authentisch',
          'Kultureller Zugang',
          'Bedeutungsvolle Begegnungen mit Gemeinschaften, Traditionen und Geschichten jenseits gewöhnlicher Besichtigungen.',
        ],
      ],
      promiseEyebrow: 'Unser Versprechen',
      promise:
        'Wir zeigen Äthiopien nicht nur. Wir helfen Ihnen, es durch bedeutungsvolle Begegnungen, fachkundige Begleitung und sorgfältig gestaltete Reisen zu erleben.',
    },
    gallery: {
      reel: 'Ethio Origins / Visuelle Reise',
      eyebrow: 'Ein visuelles Tagebuch',
      title: 'Momente, die Äthiopien prägen',
      description:
        'Eine Sammlung von Landschaften, Traditionen, Tierwelt, Architektur und menschlichen Begegnungen als filmische Fotoreise.',
      notes: ['Landschaften', 'Traditionen', 'Menschliche Begegnungen'],
      view: 'Galerie ansehen',
      pause: 'Galerie pausieren',
      play: 'Galerie abspielen',
      show: 'Anzeigen',
    },
    testimonials: {
      eyebrow: 'Gästeerlebnisse',
      title: 'Erlebnisse unserer Gäste',
      description:
        'Reisende aus aller Welt wählen Ethio Origins Tours, um Äthiopien tiefer und bedeutungsvoller zu erleben. Ihre Geschichten zeigen die unvergesslichen Momente, persönlichen Begegnungen und außergewöhnlichen Entdeckungen unserer Reisen.',
      items: [
        'Die tiefgründigste Reise meines Lebens. Jedes Detail war perfekt, und unser Guide fühlte sich am Ende wie Familie an.',
        'Ethio Origins gab uns Zugang und Geschichten, die kein anderer Anbieter bieten konnte. Das Omo-Tal hat uns sprachlos gemacht.',
        'Von den Sonnenaufgängen in den Simien-Bergen bis zu den Kaffeezeremonien war alles filmisch, authentisch und tief bewegend.',
      ],
    },
    story: {
      eyebrow: 'Unsere Geschichte',
      title: 'Reisen mit Sinn',
      paragraphs: [
        'Ethio Origins Tours wurde mit einer einfachen Mission gegründet: den Reichtum Äthiopiens durch authentische, verantwortungsvolle und unvergessliche Reiseerlebnisse mit der Welt zu teilen.',
        'Unser Team verbindet lokales Wissen, professionelle Expertise und echte Leidenschaft für äthiopische Kultur, Geschichte und Natur. Wir gehen über Besichtigungen hinaus und schaffen Reisen, die Verbindung, Verständnis und Entdeckung fördern.',
        'Unsere Reisen unterstützen lokale Unternehmen, fördern kulturelle Bewahrung, ermutigen verantwortungsbewusstes Reisen und tragen zur nachhaltigen Tourismusentwicklung in Äthiopien bei.',
      ],
      quote:
        'Wir führen nicht nur Reisen. Wir schaffen bedeutungsvolle Verbindungen zwischen Reisenden und der Seele Äthiopiens.',
    },
    footer: {
      description:
        'Fachkundig gestaltete Äthiopienreisen, inspiriert von Kultur, Erbe, Natur und Entdeckung. Wir schaffen bedeutungsvolle Reiseerlebnisse durch authentische lokale Expertise und verantwortungsvollen Tourismus.',
      journeys: 'Reisen',
      allTours: 'Alle Touren',
      signatureJourneys: 'Signature-Reisen',
      privateTrips: 'Private Maßreisen',
      plan: 'Reise planen',
      destinations: 'Reiseziele',
      allDestinations: 'Alle Reiseziele',
      historicNorth: 'Historischer Norden',
      omoValley: 'Omo-Tal',
      danakil: 'Danakil & Rift Valley',
      company: 'Unternehmen',
      about: 'Über uns',
      philosophy: 'Unsere Philosophie',
      responsibleTourism: 'Verantwortlicher Tourismus',
      gallery: 'Galerie',
      contact: 'Kontakt',
      response: 'Ihre E-Mail-Adresse',
      subscribe: 'Abonnieren',
      platforms: 'Vertrauenswürdige Reiseplattformen',
      platformTitle: 'Dort präsent, wo anspruchsvolle Reisende planen.',
      platformDescription:
        'Entdecken Sie unsere Präsenz auf ausgewählten globalen Reiseplattformen für Bewertungen, kuratierte Erlebnisse, Aufenthalte und Inspiration.',
      rights: 'Alle Rechte vorbehalten.',
      terms: 'Bedingungen',
      privacy: 'Datenschutz',
    },
    destinationsPage: {
      heroBack: 'Zurück zur Startseite',
      heroEyebrow: 'Ausgewählte Reiseziele',
      heroTitle: 'Entdecken Sie Äthiopiens wichtigste Reiseziele',
      heroDescription:
        'Jedes Reiseziel unten öffnet eine eigene Seite mit hochwertigem Überblick, Höhepunkten, Beispielablauf und privaten Planungsoptionen.',
      filters: [
        'Alle',
        'Historisch & religiös',
        'Seen & Landschaft',
        'Berge & Wildtiere',
        'Abenteuer & Geologie',
        'Stämme & Kultur',
      ],
      openPage: 'Detailseite öffnen',
      detailBack: 'Zurück zu den Reisezielen',
      planTrip: 'Diese Reise planen',
      viewSample: 'Beispielablauf ansehen',
      snapshot: 'Reiseüberblick',
      planning: 'Planung',
      region: 'Region',
      travelStyle: 'Reisestil',
      travelStyleText: 'Privat, flexibel, lokal geführt und auf Ihr Tempo abgestimmt.',
      requestProposal: 'Angebot anfragen',
      overviewEyebrow: 'Überblick zum Reiseziel',
      overviewTitle: 'Eine Reise, geprägt von Ort, Tempo und Geschichte.',
      overviewSuffix:
        'Jede Route wird nach Saison, Zugang, Reisestil und gewünschtem Komfort verfeinert.',
      curatorNote: 'Kuratorischer Hinweis',
      curatorTitle: 'Lassen Sie Raum für Licht, lokalen Rhythmus und Unerwartetes.',
      curatorText:
        'Wir schaffen Raum für Märkte, Kaffee am Straßenrand, wechselndes Wetter und persönliche Begegnungen, die Äthiopien nahbar machen.',
      pace: 'Tempo',
      private: 'Privat',
      route: 'Route',
      tailored: 'Maßgeschneidert',
      sampleEyebrow: 'Beispielablauf',
      sampleTitle: 'Eine ausgefeilte Route mit Raum zum Atmen',
      sampleDescription:
        'Die folgende Reihenfolge ist ein Beispielrahmen. Timing, Lodges, Fahrtrhythmus und besonderer Zugang werden nach Saison und Reisestil angepasst.',
      sampleCardText:
        'Das genaue Timing wird an Wetter, lokale Zugänge, Ihre Interessen und den Rhythmus der Route angepasst.',
      designedEyebrow: 'Rund um Sie gestaltet',
      designedTitle: 'Machen Sie dieses Reiseziel zu Ihrem eigenen.',
      personalizationText:
        'Ausgewählt und angepasst, nachdem wir verstanden haben, wie sich die Reise anfühlen soll.',
      personalizationItems: ['Private Guides', 'Flexible Lodges', 'Saisonales Timing'],
      relatedToursEyebrow: 'Passende Reisepakete',
      toursFeaturing: 'Touren mit',
      viewAllTours: 'Alle Touren ansehen',
      continueExploring: 'Weiter entdecken',
      moreDestinations: 'Weitere Reiseziele zum Erwägen',
      allDestinations: 'Alle Reiseziele',
      exploreTrip: 'Reise entdecken',
      ctaEyebrow: 'Planung beginnen',
      ctaTitlePrefix: 'Lassen Sie uns die passende Route gestalten für',
      ctaDescription:
        'Nennen Sie uns Ihre Daten, Interessen, Komfortwünsche und Ihr Tempo. Wir gestalten eine private Route passend zu Ihrer Art zu reisen.',
      ctaButton: 'Private Reise starten',
      extrasEyebrow: 'Festivals und Abenteuer',
      extrasTitle: 'Saisonale Kultur und besondere Erlebnisse',
      topFestivals: 'Top-Festivals',
      topAdventure: 'Top-Abenteuererlebnisse',
      breadcrumbsHome: 'Startseite',
      breadcrumbsDestinations: 'Reiseziele',
    },
    toursPage: {
      heroBack: 'Zurück zur Startseite',
      heroEyebrow: 'Ausgewählte Touren',
      heroTitle: 'Äthiopien Reisepakete',
      heroDescription:
        'Jede Tour unten öffnet eine eigene Seite mit Routendetails, Höhepunkten, Beispielroute und privaten Planungsoptionen.',
      categories: 'Tour-Kategorien',
      openTourPage: 'Tourseite öffnen',
      openDedicatedPageFor: 'Detailseite öffnen für',
      detailBack: 'Zurück zu den Touren',
      privateTourPackage: 'Privates Reisepaket',
      duration: 'Dauer',
      region: 'Region',
      style: 'Stil',
      private: 'Privat',
      selectedPackage: 'Ausgewähltes Paket',
      craftedAroundDates: 'rund um Ihre Reisedaten gestaltet.',
      bookThisTour: 'Diese Tour buchen',
      overview: 'Überblick',
      itinerary: 'Route',
      practicalInfo: 'Praktische Infos',
      privateJourney: 'Private Reise',
      arrival: 'Anreise',
      beforeDayOne: 'Vor Tag 1',
      importantNote: 'Wichtiger Hinweis',
      sampleRouteTitle: 'Eine ausgefeilte Beispielroute',
      day: 'Tag',
      overnight: 'Übernachtung',
      meals: 'Mahlzeiten',
      includedTitle: 'Was enthalten ist',
      asideTitle: 'Gestaltet rund um Ihre Daten, Ihr Tempo und Ihren Komfort.',
      asideDescription:
        'Wir verfeinern die Route, nachdem wir verstanden haben, wie sich Ihre Reise anfühlen soll.',
      requestProposal: 'Angebot anfragen',
      relatedDestinations: 'Passende Reiseziele',
      relatedTourStyles: 'Passende Reisestile',
      morePrivatePackages: 'Weitere private Pakete',
      relatedTitle: 'Andere Reisen, die Ihnen gefallen könnten',
      viewAllTours: 'Alle Touren ansehen',
      categoryEyebrow: 'Tour-Kategorie',
      relatedPackages: 'Passende Pakete',
      planPrefix: 'Planen Sie',
      requestCustomTour: 'Maßgeschneiderte Tour anfragen',
      breadcrumbsHome: 'Startseite',
      breadcrumbsTours: 'Touren',
    },
    blogPage: {
      heroBack: 'Zurück zur Startseite',
      heroEyebrow: 'Ethio Origins Journal',
      heroTitle: 'Äthiopien Reiseführer',
      heroDescription:
        'Ausgewählte Guides und Notizen aus der Praxis für Reisende, die bedeutungsvolle Reisen durch Äthiopien planen.',
      cta: 'Mit dieser Inspiration planen',
      fallbackCategory: 'Reiseeinblick',
      fallbackDate: 'Reiseführer',
      fallbackExcerpt: 'Lesen Sie den neuesten Reiseeinblick von Ethio Origins.',
      posts: {
        'How to Experience Ethiopia Beyond the Highlights': {
          title: 'Äthiopien jenseits der Höhepunkte erleben',
          category: 'Reiseeinblick',
          date: 'Juni 2026',
          excerpt:
            'Ein durchdachter Guide, der berühmte Sehenswürdigkeiten mit langsameren, persönlichen Kulturbegegnungen verbindet.',
        },
        'The Art of Planning a Private Ethiopian Journey': {
          title: 'Die Kunst, eine private Äthiopienreise zu planen',
          category: 'Private Reise',
          date: 'Juni 2026',
          excerpt:
            'Was eine maßgeschneiderte Route nahtlos, bedeutungsvoll und tief mit dem Ort verbunden macht.',
        },
        'Landscapes That Shape the Ethiopian Story': {
          title: 'Landschaften, die Äthiopiens Geschichte prägen',
          category: 'Natur und Kultur',
          date: 'Juni 2026',
          excerpt:
            'Von Hochlandabbrüchen bis zu vulkanischem Terrain belohnt Äthiopien Reisende, die genau hinsehen.',
        },
      },
    },
    contactPage: {
      heroBack: 'Zurück zur Startseite',
      eyebrow: 'Kontakt',
      title: 'Planen Sie Ihre Äthiopienreise',
      description:
        'Sprechen Sie mit unseren Reiseplanern in Addis Abeba über private Kulturrouten, Naturauszeiten, Kulturerbereisen und vollständig maßgeschneiderte Routen durch Äthiopien.',
      privatePlanning: 'Private Planung',
      replyWindow: 'Antwortfenster',
      tailorMade: 'Maßgeschneidert',
      form: {
        fullName: 'Vollständiger Name',
        namePlaceholder: 'Ihr Name',
        email: 'E-Mail-Adresse',
        phone: 'Telefon oder WhatsApp',
        month: 'Bevorzugter Monat',
        monthPlaceholder: 'Oktober 2026',
        journeyStyle: 'Reisestil',
        travelers: 'Reisende',
        groupPlaceholder: 'Gruppengröße auswählen',
        travelerOptions: ['Alleinreisend', '2 Reisende', '3-5 Reisende', '6+ Reisende'],
        tripLength: 'Reisedauer',
        durationPlaceholder: 'Dauer auswählen',
        durationOptions: ['3-5 Tage', '6-9 Tage', '10-14 Tage', '15+ Tage'],
        message: 'Erzählen Sie uns, was Sie sich vorstellen',
        messagePlaceholder:
          'Interessen, Komfortniveau, Wunschorte, Ernährungsbedürfnisse, Anlass oder alles, was wir wissen sollten.',
        sending: 'Wird gesendet...',
        submit: 'Anfrage senden',
        success: 'Danke. Ihre Anfrage wurde erfolgreich gesendet.',
        error: 'Die Anfrage konnte nicht gesendet werden.',
        notProvided: 'Nicht angegeben',
        notSelected: 'Nicht ausgewählt',
      },
      tripStyles: [
        'Historischer Norden',
        'Omo-Tal Kultur',
        'Danakil-Expedition',
        'Bale Mountains',
        'Rift Valley',
        'Maßgeschneiderte Reise',
      ],
      direct: {
        eyebrow: 'Direkter Kontakt',
        title: 'Möchten Sie direkt sprechen?',
        description:
          'Unser Team antwortet schnell während der Geschäftszeiten in Äthiopien und meldet sich mit einem klaren nächsten Schritt.',
        methods: {
          'Call or WhatsApp': 'Anruf oder WhatsApp',
          Email: 'E-Mail',
          Office: 'Büro',
        },
        responseTitle: 'Antwortzeit',
        responseText:
          'Neue Anfragen erhalten innerhalb eines Werktags eine persönliche Antwort. Eilige Reisende erreichen uns per WhatsApp.',
      },
      planning: {
        eyebrow: 'So funktioniert die Planung',
        title: 'Von der ersten Nachricht bis zur finalen Route',
        step: 'Schritt',
        steps: [
          [
            'Teilen Sie Ihren Reisewunsch',
            'Sagen Sie uns, wann Sie reisen möchten, wer mitkommt und welches Äthiopien Sie erleben wollen.',
          ],
          [
            'Route gestalten',
            'Wir verfeinern Tempo, Regionen, Guides, Unterkünfte und kulturelle Zugänge nach Ihren Prioritäten.',
          ],
          [
            'Sorgfältig reisen',
            'Ihr privater Guide, Fahrer, lokale Gastgeber und unser Support-Team bleiben von Ankunft bis Abreise nah dabei.',
          ],
        ],
      },
    },
    finalCta: {
      eyebrow: 'Die Reise beginnen',
      title: 'Ihre äthiopische Geschichte beginnt hier',
      description:
        'Ob Sie Abenteuer, Kultur, Wildtiere oder Geschichte suchen, wir gestalten eine Reise, die Sie nie vergessen werden.',
      primary: 'Reise planen',
      secondary: 'Kontakt',
    },
  },
  ES: {
    nav: {
      home: 'Inicio',
      destinations: 'Destinos',
      tours: 'Tours',
      gallery: 'Galería',
      blog: 'Blog',
      contact: 'Contacto',
      contactShort: 'Contacto',
      plan: 'Planifica tu viaje',
      seeMoreDestinations: 'Ver más destinos',
      seeMoreTours: 'Ver más tours',
      all: 'Todos',
      language: 'Idioma',
      changeLanguage: 'Cambiar idioma',
    },
    hero: {
      eyebrow: 'La tierra de los orígenes',
      title: 'Explora Etiopía con expertos locales',
      description:
        'Viajes diseñados con cuidado a través de historia antigua, culturas vibrantes y paisajes extraordinarios.',
      primaryCta: 'Explorar tours',
      secondaryCta: 'Planifica tu viaje',
      scroll: 'Desplazarse hacia abajo',
    },
    trust: [
      'Viajeros recibidos',
      'Experiencias curadas',
      'Satisfacción de huéspedes',
      'Experiencia local',
    ],
    experiences: {
      eyebrow: 'Viajes destacados',
      title: 'Viajes excepcionales, diseñados por expertos',
      description:
        'Descubre Etiopía mediante experiencias cuidadosamente curadas que combinan cultura, historia, naturaleza y conexiones locales auténticas.',
      discover: 'Descubrir viaje',
      exploreMore: 'Ver más',
    },
    destinations: {
      eyebrow: 'Dónde explorar',
      title: 'Descubre las regiones más notables de Etiopía',
      description:
        'Viaja por maravillas históricas, paisajes dramáticos y experiencias culturales auténticas en uno de los destinos más diversos de África.',
      exploreDestinations: 'Explorar destinos',
      exploreTrip: 'Explorar viaje',
      exploreMore: 'Ver más',
    },
    why: {
      eyebrow: 'Por qué Etiopía',
      title: 'Por qué Etiopía cautiva a los viajeros',
      description:
        'Pocos destinos ofrecen una mezcla tan notable de historia, cultura, naturaleza y autenticidad. Etiopía alberga civilizaciones antiguas, sitios UNESCO, fauna única, tradiciones vibrantes y algunos de los paisajes más espectaculares de África.',
      facts: [
        ['Historia', 'Antigua'],
        ['Culturas', 'Vivas'],
        ['Paisajes', 'Épicos'],
        ['Experiencias', 'Locales'],
      ],
    },
    custom: {
      eyebrow: 'Por qué viajar con Ethio Origins',
      title: 'Por qué los viajeros eligen Ethio Origins',
      description:
        'La experiencia local, la planificación privada y el acceso auténtico se unen para crear viajes personales, cuidados y profundamente conectados con el lugar.',
      features: [
        [
          '15+',
          'Años de experiencia local',
          'Conocimiento regional profundo adquirido tras años de planificar y guiar viajes por Etiopía.',
        ],
        [
          '100%',
          'Viajes a medida',
          'Cada itinerario se diseña cuidadosamente según tu ritmo, intereses, comodidad y estilo de viaje.',
        ],
        [
          'Expertos',
          'Guías por toda Etiopía',
          'Viaja con guías locales expertos que dan vida a la historia, la cultura y los paisajes.',
        ],
        [
          'Auténtico',
          'Acceso cultural',
          'Encuentros significativos con comunidades, tradiciones e historias más allá del turismo común.',
        ],
      ],
      promiseEyebrow: 'Nuestra promesa',
      promise:
        'No solo mostramos Etiopía. Te ayudamos a vivirla mediante encuentros significativos, guía experta y viajes cuidadosamente diseñados.',
    },
    gallery: {
      reel: 'Ethio Origins / Reel visual',
      eyebrow: 'Un diario visual',
      title: 'Momentos que definen Etiopía',
      description:
        'Una colección de paisajes, tradiciones, vida silvestre, arquitectura y conexiones humanas presentada como un reel fotográfico cinematográfico.',
      notes: ['Paisajes', 'Tradiciones', 'Conexiones humanas'],
      view: 'Ver galería completa',
      pause: 'Pausar galería',
      play: 'Reproducir galería',
      show: 'Mostrar',
    },
    testimonials: {
      eyebrow: 'Experiencias de huéspedes',
      title: 'Experiencias compartidas por nuestros huéspedes',
      description:
        'Viajeros de todo el mundo eligen Ethio Origins Tours para vivir Etiopía de una forma más profunda y significativa. Sus historias reflejan momentos inolvidables, conexiones personales y descubrimientos extraordinarios.',
      items: [
        'El viaje más profundo de mi vida. Cada detalle fue impecable y nuestro guía terminó sintiéndose como familia.',
        'Ethio Origins nos dio acceso e historias que ningún otro operador podía ofrecer. El Valle del Omo nos dejó sin palabras.',
        'Desde los amaneceres en Simien hasta las ceremonias del café, fue cinematográfico, auténtico y profundamente conmovedor.',
      ],
    },
    story: {
      eyebrow: 'Nuestra historia',
      title: 'Viajar con propósito',
      paragraphs: [
        'Ethio Origins Tours nació con una misión simple: compartir la riqueza de Etiopía con el mundo mediante experiencias auténticas, responsables e inolvidables.',
        'Nuestro equipo combina conocimiento local, experiencia profesional y una pasión genuina por la cultura, la historia y la naturaleza etíopes. Vamos más allá de las visitas para crear viajes que fomentan conexión, comprensión y descubrimiento.',
        'Nuestros viajes apoyan negocios locales, promueven la preservación cultural, fomentan prácticas responsables y contribuyen al desarrollo sostenible del turismo en Etiopía.',
      ],
      quote:
        'No solo guiamos viajes. Creamos conexiones significativas entre los viajeros y el alma de Etiopía.',
    },
    footer: {
      description:
        'Viajes por Etiopía diseñados con experiencia e inspirados en cultura, patrimonio, naturaleza y descubrimiento. Creamos experiencias significativas mediante conocimiento local auténtico y turismo responsable.',
      journeys: 'Viajes',
      allTours: 'Todos los tours',
      signatureJourneys: 'Viajes destacados',
      privateTrips: 'Viajes privados a medida',
      plan: 'Planifica tu viaje',
      destinations: 'Destinos',
      allDestinations: 'Todos los destinos',
      historicNorth: 'Norte histórico',
      omoValley: 'Valle del Omo',
      danakil: 'Danakil y Rift Valley',
      company: 'Compañía',
      about: 'Sobre nosotros',
      philosophy: 'Nuestra filosofía',
      responsibleTourism: 'Turismo responsable',
      gallery: 'Galería',
      contact: 'Contacto',
      response: 'Tu correo electrónico',
      subscribe: 'Suscribirse',
      platforms: 'Plataformas de viaje confiables',
      platformTitle: 'Encuéntranos donde planifican los viajeros exigentes.',
      platformDescription:
        'Explora nuestra presencia en plataformas globales seleccionadas para reseñas, experiencias curadas, alojamientos e inspiración.',
      rights: 'Todos los derechos reservados.',
      terms: 'Términos',
      privacy: 'Privacidad',
    },
    destinationsPage: {
      heroBack: 'Volver al inicio',
      heroEyebrow: 'Destinos dedicados',
      heroTitle: 'Explora los principales destinos de Etiopía',
      heroDescription:
        'Cada destino abre su propia página con una descripción premium, destacados, flujo de muestra y opciones de planificación privada.',
      filters: [
        'Todos',
        'Históricos y religiosos',
        'Lagos y paisajes',
        'Montañas y fauna',
        'Aventura y geología',
        'Tribal y cultural',
      ],
      openPage: 'Abrir página dedicada',
      detailBack: 'Volver a destinos',
      planTrip: 'Planificar este viaje',
      viewSample: 'Ver flujo de muestra',
      snapshot: 'Resumen del viaje',
      planning: 'Planificación',
      region: 'Región',
      travelStyle: 'Estilo de viaje',
      travelStyleText: 'Privado, flexible, guiado localmente y adaptado a tu ritmo.',
      requestProposal: 'Solicitar propuesta',
      overviewEyebrow: 'Resumen del destino',
      overviewTitle: 'Un viaje definido por el lugar, el ritmo y la historia.',
      overviewSuffix:
        'Cada ruta se ajusta según temporada, acceso, estilo de viaje y nivel de comodidad deseado.',
      curatorNote: 'Nota del curador',
      curatorTitle: 'Deja espacio para la luz, el ritmo local y lo inesperado.',
      curatorText:
        'Creamos espacio para mercados, café en ruta, clima cambiante y presentaciones personales que hacen que Etiopía se sienta cercana.',
      pace: 'Ritmo',
      private: 'Privado',
      route: 'Ruta',
      tailored: 'A medida',
      sampleEyebrow: 'Flujo de muestra',
      sampleTitle: 'Una ruta pulida con espacio para respirar',
      sampleDescription:
        'El orden siguiente es un marco de muestra. Ajustamos tiempos, alojamientos, ritmo de conducción y accesos especiales según la temporada y tu estilo.',
      sampleCardText:
        'El tiempo exacto se ajusta según clima, acceso local, tus intereses y el ritmo de la ruta.',
      designedEyebrow: 'Diseñado alrededor de ti',
      designedTitle: 'Haz tuyo este destino.',
      personalizationText:
        'Seleccionado y ajustado después de comprender cómo quieres que se sienta el viaje.',
      personalizationItems: ['Guías privados', 'Alojamientos flexibles', 'Temporada ideal'],
      relatedToursEyebrow: 'Paquetes relacionados',
      toursFeaturing: 'Tours con',
      viewAllTours: 'Ver todos los tours',
      continueExploring: 'Seguir explorando',
      moreDestinations: 'Más destinos para considerar',
      allDestinations: 'Todos los destinos',
      exploreTrip: 'Explorar viaje',
      ctaEyebrow: 'Comenzar planificación',
      ctaTitlePrefix: 'Permítenos diseñar la ruta adecuada para',
      ctaDescription:
        'Cuéntanos tus fechas, intereses, nivel de comodidad y ritmo. Diseñaremos un itinerario privado según tu forma de viajar.',
      ctaButton: 'Iniciar viaje privado',
      extrasEyebrow: 'Festivales y aventura',
      extrasTitle: 'Cultura de temporada y experiencias destacadas',
      topFestivals: 'Festivales principales',
      topAdventure: 'Experiencias de aventura principales',
      breadcrumbsHome: 'Inicio',
      breadcrumbsDestinations: 'Destinos',
    },
    toursPage: {
      heroBack: 'Volver al inicio',
      heroEyebrow: 'Tours dedicados',
      heroTitle: 'Paquetes turísticos por Etiopía',
      heroDescription:
        'Cada tour abre su propia página con detalles de ruta, destacados, itinerario de muestra y opciones de planificación privada.',
      categories: 'Categorías de tours',
      openTourPage: 'Abrir página del tour',
      openDedicatedPageFor: 'Abrir página dedicada para',
      detailBack: 'Volver a tours',
      privateTourPackage: 'Paquete privado',
      duration: 'Duración',
      region: 'Región',
      style: 'Estilo',
      private: 'Privado',
      selectedPackage: 'Paquete seleccionado',
      craftedAroundDates: 'diseñado según tus fechas.',
      bookThisTour: 'Reservar este tour',
      overview: 'Resumen',
      itinerary: 'Itinerario',
      practicalInfo: 'Información práctica',
      privateJourney: 'Viaje privado',
      arrival: 'Llegada',
      beforeDayOne: 'Antes del día 1',
      importantNote: 'Nota importante',
      sampleRouteTitle: 'Una ruta de muestra bien pulida',
      day: 'Día',
      overnight: 'Noche en',
      meals: 'Comidas',
      includedTitle: 'Qué está incluido',
      asideTitle: 'Diseñado según tus fechas, ritmo y nivel de comodidad.',
      asideDescription:
        'Ajustamos la ruta después de entender cómo quieres que se sienta el viaje.',
      requestProposal: 'Solicitar propuesta',
      relatedDestinations: 'Destinos relacionados',
      relatedTourStyles: 'Estilos de tour relacionados',
      morePrivatePackages: 'Más paquetes privados',
      relatedTitle: 'Otros viajes que te pueden gustar',
      viewAllTours: 'Ver todos los tours',
      categoryEyebrow: 'Categoría de tour',
      relatedPackages: 'Paquetes relacionados',
      planPrefix: 'Planificar',
      requestCustomTour: 'Solicitar tour a medida',
      breadcrumbsHome: 'Inicio',
      breadcrumbsTours: 'Tours',
    },
    blogPage: {
      heroBack: 'Volver al inicio',
      heroEyebrow: 'Diario de Ethio Origins',
      heroTitle: 'Guía de viaje de Etiopía',
      heroDescription:
        'Guías refinadas y notas de campo para viajeros que planifican viajes significativos por Etiopía.',
      cta: 'Planificar con esta idea',
      fallbackCategory: 'Consejo de viaje',
      fallbackDate: 'Guía de viaje',
      fallbackExcerpt: 'Lee la última inspiración de viaje de Ethio Origins.',
      posts: {
        'How to Experience Ethiopia Beyond the Highlights': {
          title: 'Cómo vivir Etiopía más allá de los lugares destacados',
          category: 'Consejo de viaje',
          date: 'Junio de 2026',
          excerpt:
            'Una guía pensada para combinar sitios icónicos con encuentros culturales más lentos y personales.',
        },
        'The Art of Planning a Private Ethiopian Journey': {
          title: 'El arte de planificar un viaje privado por Etiopía',
          category: 'Viaje privado',
          date: 'Junio de 2026',
          excerpt:
            'Qué hace que un itinerario a medida se sienta fluido, significativo y profundamente conectado con el lugar.',
        },
        'Landscapes That Shape the Ethiopian Story': {
          title: 'Paisajes que dan forma a la historia etíope',
          category: 'Naturaleza y cultura',
          date: 'Junio de 2026',
          excerpt:
            'Desde escarpes de tierras altas hasta terrenos volcánicos, Etiopía recompensa a quienes observan con atención.',
        },
      },
    },
    contactPage: {
      heroBack: 'Volver al inicio',
      eyebrow: 'Contacto',
      title: 'Planifica tu viaje por Etiopía',
      description:
        'Habla con nuestros diseñadores de viaje en Addis Abeba sobre rutas culturales privadas, escapadas de naturaleza, viajes de patrimonio e itinerarios totalmente a medida por Etiopía.',
      privatePlanning: 'Planificación privada',
      replyWindow: 'Tiempo de respuesta',
      tailorMade: 'A medida',
      form: {
        fullName: 'Nombre completo',
        namePlaceholder: 'Tu nombre',
        email: 'Correo electrónico',
        phone: 'Teléfono o WhatsApp',
        month: 'Mes preferido',
        monthPlaceholder: 'Octubre de 2026',
        journeyStyle: 'Estilo de viaje',
        travelers: 'Viajeros',
        groupPlaceholder: 'Selecciona tamaño del grupo',
        travelerOptions: ['Viajero solo', '2 viajeros', '3-5 viajeros', '6+ viajeros'],
        tripLength: 'Duración del viaje',
        durationPlaceholder: 'Selecciona duración',
        durationOptions: ['3-5 días', '6-9 días', '10-14 días', '15+ días'],
        message: 'Cuéntanos qué imaginas',
        messagePlaceholder:
          'Intereses, nivel de comodidad, lugares imprescindibles, necesidades alimentarias, detalles de celebración o cualquier cosa que debamos saber.',
        sending: 'Enviando...',
        submit: 'Enviar consulta',
        success: 'Gracias. Tu consulta se envió correctamente.',
        error: 'No se pudo enviar la consulta.',
        notProvided: 'No proporcionado',
        notSelected: 'No seleccionado',
      },
      tripStyles: [
        'Norte histórico',
        'Cultura del Valle del Omo',
        'Expedición Danakil',
        'Bale Mountains',
        'Rift Valley',
        'Viaje a medida',
      ],
      direct: {
        eyebrow: 'Contacto directo',
        title: '¿Prefieres hablar ahora?',
        description:
          'Nuestro equipo responde rápido durante el horario laboral de Etiopía y continúa con un siguiente paso claro.',
        methods: {
          'Call or WhatsApp': 'Llamada o WhatsApp',
          Email: 'Correo',
          Office: 'Oficina',
        },
        responseTitle: 'Tiempo de respuesta',
        responseText:
          'Las nuevas consultas reciben una respuesta personal en un día laborable. Los viajeros urgentes pueden contactarnos por WhatsApp.',
      },
      planning: {
        eyebrow: 'Cómo funciona la planificación',
        title: 'De la primera nota a la ruta final',
        step: 'Paso',
        steps: [
          [
            'Comparte el sueño',
            'Cuéntanos cuándo quieres viajar, quién viene y qué tipo de Etiopía quieres vivir.',
          ],
          [
            'Diseñamos la ruta',
            'Ajustamos ritmo, regiones, guías, alojamiento y acceso cultural según tus prioridades.',
          ],
          [
            'Viaja con cuidado',
            'Tu guía privado, conductor, anfitriones locales y equipo de apoyo estarán cerca desde la llegada hasta la salida.',
          ],
        ],
      },
    },
    finalCta: {
      eyebrow: 'Comenzar el viaje',
      title: 'Tu historia etíope comienza aquí',
      description:
        'Ya busques aventura, cultura, fauna o historia, crearemos un viaje que nunca olvidarás.',
      primary: 'Planifica tu viaje',
      secondary: 'Contacto',
    },
  },
  FR: {
    nav: {
      home: 'Accueil',
      destinations: 'Destinations',
      tours: 'Circuits',
      gallery: 'Galerie',
      blog: 'Blog',
      contact: 'Contact',
      contactShort: 'Contact',
      plan: 'Planifier votre voyage',
      seeMoreDestinations: 'Voir plus de destinations',
      seeMoreTours: 'Voir plus de circuits',
      all: 'Tous',
      language: 'Langue',
      changeLanguage: 'Changer de langue',
    },
    hero: {
      eyebrow: 'La terre des origines',
      title: "Explorez l'Éthiopie avec des experts locaux",
      description:
        'Des voyages conçus avec soin à travers une histoire ancienne, des cultures vivantes et des paysages extraordinaires.',
      primaryCta: 'Explorer les circuits',
      secondaryCta: 'Planifier votre voyage',
      scroll: 'Faire défiler',
    },
    trust: [
      'Voyageurs accueillis',
      'Expériences sélectionnées',
      'Satisfaction des invités',
      'Expertise locale',
    ],
    experiences: {
      eyebrow: 'Voyages signature',
      title: 'Des voyages exceptionnels, conçus avec expertise',
      description:
        "Découvrez l'Éthiopie à travers des expériences soigneusement sélectionnées qui mêlent culture, histoire, nature et rencontres locales authentiques.",
      discover: 'Découvrir le voyage',
      exploreMore: 'Voir plus',
    },
    destinations: {
      eyebrow: 'Où explorer',
      title: "Découvrez les régions remarquables de l'Éthiopie",
      description:
        "Parcourez des merveilles historiques, des paysages spectaculaires et des expériences culturelles authentiques dans l'une des destinations les plus diverses d'Afrique.",
      exploreDestinations: 'Explorer les destinations',
      exploreTrip: 'Explorer le voyage',
      exploreMore: 'Voir plus',
    },
    why: {
      eyebrow: "Pourquoi l'Éthiopie",
      title: "Pourquoi l'Éthiopie captive les voyageurs",
      description:
        "Peu de destinations offrent un mélange aussi remarquable d'histoire, de culture, de nature et d'authenticité. L'Éthiopie abrite des civilisations anciennes, des sites UNESCO, une faune unique, des traditions vivantes et certains des paysages les plus spectaculaires d'Afrique.",
      facts: [
        ['Histoire', 'Ancienne'],
        ['Cultures', 'Vivantes'],
        ['Paysages', 'Épiques'],
        ['Expériences', 'Locales'],
      ],
    },
    custom: {
      eyebrow: 'Pourquoi voyager avec Ethio Origins',
      title: 'Pourquoi les voyageurs choisissent Ethio Origins',
      description:
        'Expertise locale, planification privée et accès authentique se combinent pour créer des voyages personnels, raffinés et profondément liés au lieu.',
      features: [
        [
          '15+',
          "Années d'expertise locale",
          "Une connaissance régionale approfondie acquise au fil des années de planification et d'accompagnement de voyages en Éthiopie.",
        ],
        [
          '100%',
          'Voyages sur mesure',
          'Chaque itinéraire est conçu selon votre rythme, vos intérêts, votre confort et votre style de voyage.',
        ],
        [
          'Experts',
          "Guides dans toute l'Éthiopie",
          "Voyagez avec des guides locaux compétents qui donnent vie à l'histoire, à la culture et aux paysages.",
        ],
        [
          'Authentique',
          'Accès culturel',
          'Des rencontres significatives avec des communautés, traditions et histoires au-delà des visites ordinaires.',
        ],
      ],
      promiseEyebrow: 'Notre promesse',
      promise:
        "Nous ne montrons pas seulement l'Éthiopie. Nous vous aidons à la vivre grâce à des rencontres significatives, un accompagnement expert et des voyages soigneusement conçus.",
    },
    gallery: {
      reel: 'Ethio Origins / Carnet visuel',
      eyebrow: 'Un journal visuel',
      title: "Les moments qui définissent l'Éthiopie",
      description:
        'Une collection de paysages, traditions, faune, architecture et liens humains présentée comme un récit photographique cinématographique.',
      notes: ['Paysages', 'Traditions', 'Liens humains'],
      view: 'Voir toute la galerie',
      pause: 'Mettre la galerie en pause',
      play: 'Lire la galerie',
      show: 'Afficher',
    },
    testimonials: {
      eyebrow: 'Expériences des invités',
      title: 'Expériences partagées par nos invités',
      description:
        "Des voyageurs du monde entier choisissent Ethio Origins Tours pour découvrir l'Éthiopie de manière plus profonde et plus significative. Leurs histoires reflètent les moments inoubliables, les liens personnels et les découvertes extraordinaires de nos voyages.",
      items: [
        'Le voyage le plus profond de ma vie. Chaque détail était parfait et notre guide faisait partie de la famille à la fin.',
        "Ethio Origins nous a donné accès à des histoires qu'aucun autre opérateur ne pouvait offrir. La vallée de l'Omo nous a laissés sans voix.",
        "Des levers de soleil dans le Simien aux cérémonies du café, c'était cinématographique, authentique et profondément émouvant.",
      ],
    },
    story: {
      eyebrow: 'Notre histoire',
      title: 'Voyager avec sens',
      paragraphs: [
        "Ethio Origins Tours a été fondé avec une mission simple : partager la richesse de l'Éthiopie avec le monde grâce à des expériences authentiques, responsables et inoubliables.",
        "Notre équipe associe connaissance locale, expertise professionnelle et passion sincère pour la culture, l'histoire et la nature éthiopiennes. Nous allons au-delà des visites pour créer des voyages qui favorisent connexion, compréhension et découverte.",
        "Nos voyages soutiennent les entreprises locales, favorisent la préservation culturelle, encouragent les pratiques responsables et contribuent au développement durable du tourisme en Éthiopie.",
      ],
      quote:
        "Nous ne guidons pas seulement des voyages. Nous créons des liens significatifs entre les voyageurs et l'âme de l'Éthiopie.",
    },
    footer: {
      description:
        "Des voyages en Éthiopie conçus avec expertise, inspirés par la culture, le patrimoine, la nature et la découverte. Nous créons des expériences significatives grâce à une expertise locale authentique et un tourisme responsable.",
      journeys: 'Voyages',
      allTours: 'Tous les circuits',
      signatureJourneys: 'Voyages signature',
      privateTrips: 'Voyages privés sur mesure',
      plan: 'Planifier votre voyage',
      destinations: 'Destinations',
      allDestinations: 'Toutes les destinations',
      historicNorth: 'Nord historique',
      omoValley: "Vallée de l'Omo",
      danakil: 'Danakil et Rift Valley',
      company: 'Entreprise',
      about: 'À propos',
      philosophy: 'Notre philosophie',
      responsibleTourism: 'Tourisme responsable',
      gallery: 'Galerie',
      contact: 'Contact',
      response: 'Votre adresse e-mail',
      subscribe: "S'abonner",
      platforms: 'Plateformes de voyage fiables',
      platformTitle: 'Retrouvez-nous là où les voyageurs exigeants planifient.',
      platformDescription:
        'Découvrez notre présence sur des plateformes mondiales sélectionnées pour les avis, les expériences, les séjours et l’inspiration.',
      rights: 'Tous droits réservés.',
      terms: 'Conditions',
      privacy: 'Confidentialité',
    },
    destinationsPage: {
      heroBack: "Retour à l'accueil",
      heroEyebrow: 'Destinations dédiées',
      heroTitle: "Explorez les plus belles destinations d'Éthiopie",
      heroDescription:
        'Chaque destination ouvre sa propre page avec un aperçu premium, des points forts, un exemple de parcours et des options de planification privée.',
      filters: [
        'Toutes',
        'Historiques et religieuses',
        'Lacs et paysages',
        'Montagnes et faune',
        'Aventure et géologie',
        'Tribal et culturel',
      ],
      openPage: 'Ouvrir la page dédiée',
      detailBack: 'Retour aux destinations',
      planTrip: 'Planifier ce voyage',
      viewSample: 'Voir le parcours type',
      snapshot: 'Aperçu du voyage',
      planning: 'Planification',
      region: 'Région',
      travelStyle: 'Style de voyage',
      travelStyleText: 'Privé, flexible, guidé localement et adapté à votre rythme.',
      requestProposal: 'Demander une proposition',
      overviewEyebrow: 'Aperçu de la destination',
      overviewTitle: 'Un voyage façonné par le lieu, le rythme et l’histoire.',
      overviewSuffix:
        'Chaque itinéraire est affiné selon la saison, l’accès, le style de voyage et le niveau de confort souhaité.',
      curatorNote: 'Note du créateur',
      curatorTitle: 'Laissez de la place à la lumière, au rythme local et à l’inattendu.',
      curatorText:
        'Nous prévoyons du temps pour les marchés, le café en route, la météo changeante et les rencontres personnelles qui rendent l’Éthiopie intime.',
      pace: 'Rythme',
      private: 'Privé',
      route: 'Itinéraire',
      tailored: 'Sur mesure',
      sampleEyebrow: 'Parcours type',
      sampleTitle: 'Un itinéraire soigné avec de l’espace pour respirer',
      sampleDescription:
        'L’ordre ci-dessous est un cadre de départ. Nous ajustons horaires, lodges, rythme de route et accès spéciaux selon la saison et votre style.',
      sampleCardText:
        'Le timing exact est ajusté selon la météo, les accès locaux, vos intérêts et le rythme de l’itinéraire.',
      designedEyebrow: 'Conçu autour de vous',
      designedTitle: 'Faites de cette destination la vôtre.',
      personalizationText:
        'Sélectionné et ajusté après avoir compris le ressenti que vous souhaitez donner au voyage.',
      personalizationItems: ['Guides privés', 'Lodges flexibles', 'Timing saisonnier'],
      relatedToursEyebrow: 'Circuits associés',
      toursFeaturing: 'Circuits avec',
      viewAllTours: 'Voir tous les circuits',
      continueExploring: 'Continuer à explorer',
      moreDestinations: 'Autres destinations à considérer',
      allDestinations: 'Toutes les destinations',
      exploreTrip: 'Explorer le voyage',
      ctaEyebrow: 'Commencer la planification',
      ctaTitlePrefix: 'Laissez-nous créer le bon itinéraire pour',
      ctaDescription:
        'Indiquez-nous vos dates, intérêts, niveau de confort et rythme. Nous concevrons un itinéraire privé selon votre manière de voyager.',
      ctaButton: 'Commencer un voyage privé',
      extrasEyebrow: 'Festivals et aventure',
      extrasTitle: 'Culture saisonnière et expériences signature',
      topFestivals: 'Festivals incontournables',
      topAdventure: 'Meilleures expériences d’aventure',
      breadcrumbsHome: 'Accueil',
      breadcrumbsDestinations: 'Destinations',
    },
    toursPage: {
      heroBack: "Retour à l'accueil",
      heroEyebrow: 'Circuits dédiés',
      heroTitle: 'Circuits et forfaits en Éthiopie',
      heroDescription:
        'Chaque circuit ci-dessous ouvre sa propre page avec les détails de route, les temps forts, un itinéraire type et des options de planification privée.',
      categories: 'Catégories de circuits',
      openTourPage: 'Ouvrir la page du circuit',
      openDedicatedPageFor: 'Ouvrir la page dédiée pour',
      detailBack: 'Retour aux circuits',
      privateTourPackage: 'Forfait privé',
      duration: 'Durée',
      region: 'Région',
      style: 'Style',
      private: 'Privé',
      selectedPackage: 'Forfait sélectionné',
      craftedAroundDates: 'conçu autour de vos dates.',
      bookThisTour: 'Réserver ce circuit',
      overview: 'Aperçu',
      itinerary: 'Itinéraire',
      practicalInfo: 'Infos pratiques',
      privateJourney: 'Voyage privé',
      arrival: 'Arrivée',
      beforeDayOne: 'Avant le jour 1',
      importantNote: 'Note importante',
      sampleRouteTitle: 'Un itinéraire type soigné',
      day: 'Jour',
      overnight: 'Nuit',
      meals: 'Repas',
      includedTitle: 'Ce qui est inclus',
      asideTitle: 'Conçu autour de vos dates, de votre rythme et de votre confort.',
      asideDescription:
        'Nous affinons l’itinéraire après avoir compris le ressenti que vous souhaitez donner au voyage.',
      requestProposal: 'Demander une proposition',
      relatedDestinations: 'Destinations associées',
      relatedTourStyles: 'Styles de circuits associés',
      morePrivatePackages: 'Autres forfaits privés',
      relatedTitle: 'Autres voyages qui pourraient vous plaire',
      viewAllTours: 'Voir tous les circuits',
      categoryEyebrow: 'Catégorie de circuit',
      relatedPackages: 'Forfaits associés',
      planPrefix: 'Planifier',
      requestCustomTour: 'Demander un circuit sur mesure',
      breadcrumbsHome: 'Accueil',
      breadcrumbsTours: 'Circuits',
    },
    blogPage: {
      heroBack: "Retour à l'accueil",
      heroEyebrow: 'Journal Ethio Origins',
      heroTitle: 'Guide de voyage en Éthiopie',
      heroDescription:
        'Guides soignés et notes de terrain pour les voyageurs qui préparent des voyages porteurs de sens en Éthiopie.',
      cta: 'Planifier avec cette inspiration',
      fallbackCategory: 'Conseil de voyage',
      fallbackDate: 'Guide de voyage',
      fallbackExcerpt: 'Lisez la dernière inspiration de voyage d’Ethio Origins.',
      posts: {
        'How to Experience Ethiopia Beyond the Highlights': {
          title: 'Comment vivre l’Éthiopie au-delà des incontournables',
          category: 'Conseil de voyage',
          date: 'Juin 2026',
          excerpt:
            'Un guide réfléchi pour associer sites emblématiques et rencontres culturelles plus lentes et personnelles.',
        },
        'The Art of Planning a Private Ethiopian Journey': {
          title: 'L’art de planifier un voyage privé en Éthiopie',
          category: 'Voyage privé',
          date: 'Juin 2026',
          excerpt:
            'Ce qui rend un itinéraire sur mesure fluide, porteur de sens et profondément lié au lieu.',
        },
        'Landscapes That Shape the Ethiopian Story': {
          title: 'Les paysages qui façonnent le récit éthiopien',
          category: 'Nature et culture',
          date: 'Juin 2026',
          excerpt:
            'Des escarpements d’altitude aux terrains volcaniques, l’Éthiopie récompense les voyageurs attentifs.',
        },
      },
    },
    contactPage: {
      heroBack: "Retour à l'accueil",
      eyebrow: 'Contact',
      title: 'Planifier votre voyage en Éthiopie',
      description:
        'Échangez avec nos créateurs de voyages basés à Addis-Abeba sur des routes culturelles privées, des escapades nature, des voyages patrimoniaux et des itinéraires entièrement sur mesure en Éthiopie.',
      privatePlanning: 'Planification privée',
      replyWindow: 'Délai de réponse',
      tailorMade: 'Sur mesure',
      form: {
        fullName: 'Nom complet',
        namePlaceholder: 'Votre nom',
        email: 'Adresse e-mail',
        phone: 'Téléphone ou WhatsApp',
        month: 'Mois préféré',
        monthPlaceholder: 'Octobre 2026',
        journeyStyle: 'Style de voyage',
        travelers: 'Voyageurs',
        groupPlaceholder: 'Sélectionner la taille du groupe',
        travelerOptions: ['Voyageur solo', '2 voyageurs', '3-5 voyageurs', '6+ voyageurs'],
        tripLength: 'Durée du voyage',
        durationPlaceholder: 'Sélectionner la durée',
        durationOptions: ['3-5 jours', '6-9 jours', '10-14 jours', '15+ jours'],
        message: 'Dites-nous ce que vous imaginez',
        messagePlaceholder:
          'Intérêts, niveau de confort, lieux incontournables, besoins alimentaires, détails de célébration ou toute autre information utile.',
        sending: 'Envoi...',
        submit: 'Envoyer la demande',
        success: 'Merci. Votre demande a bien été envoyée.',
        error: 'Impossible d’envoyer la demande.',
        notProvided: 'Non indiqué',
        notSelected: 'Non sélectionné',
      },
      tripStyles: [
        'Nord historique',
        'Culture de la vallée de l’Omo',
        'Expédition Danakil',
        'Bale Mountains',
        'Rift Valley',
        'Voyage sur mesure',
      ],
      direct: {
        eyebrow: 'Contact direct',
        title: 'Vous préférez parler maintenant ?',
        description:
          'Notre équipe répond rapidement pendant les horaires ouvrés en Éthiopie et revient avec une prochaine étape claire.',
        methods: {
          'Call or WhatsApp': 'Appel ou WhatsApp',
          Email: 'E-mail',
          Office: 'Bureau',
        },
        responseTitle: 'Délai de réponse',
        responseText:
          'Les nouvelles demandes reçoivent une réponse personnelle sous un jour ouvré. Les voyageurs pressés peuvent nous joindre par WhatsApp.',
      },
      planning: {
        eyebrow: 'Comment fonctionne la planification',
        title: 'Du premier message à l’itinéraire final',
        step: 'Étape',
        steps: [
          [
            'Partager le rêve',
            'Dites-nous quand vous souhaitez voyager, qui vient et quelle Éthiopie vous voulez découvrir.',
          ],
          [
            'Façonner la route',
            'Nous affinons rythme, régions, guides, hébergements et accès culturels selon vos priorités.',
          ],
          [
            'Voyager avec soin',
            'Votre guide privé, chauffeur, hôtes locaux et équipe de soutien restent proches de l’arrivée au départ.',
          ],
        ],
      },
    },
    finalCta: {
      eyebrow: 'Commencer le voyage',
      title: 'Votre histoire éthiopienne commence ici',
      description:
        'Que vous recherchiez aventure, culture, faune ou histoire, nous créerons un voyage que vous n’oublierez jamais.',
      primary: 'Planifier votre voyage',
      secondary: 'Contact',
    },
  },
} as const

type Translation = (typeof translations)[LanguageCode]

const LanguageContext = createContext<{
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  t: Translation
} | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('EN')

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey)
    if (saved === 'EN' || saved === 'DE' || saved === 'ES' || saved === 'FR') {
      setLanguageState(saved)
    }
  }, [])

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: LanguageCode) => {
        setLanguageState(nextLanguage)
        window.localStorage.setItem(storageKey, nextLanguage)
      },
      t: translations[language],
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }

  return context
}
