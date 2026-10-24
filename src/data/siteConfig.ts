/**
 * Release Tours — central site configuration.
 *
 * OWNER-EDITABLE: All business information, contact details, pricing, dates,
 * and social links live here. Update this file to change content across the site.
 *
 * Anything marked UNCONFIRMED must not be presented as verified fact in the UI.
 * Replace placeholders with real details as they become final.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface PracticalInfoItem {
  label: string;
  value: string;
  confirmed: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const siteConfig = {
  brand: {
    name: 'Release Tours',
    tagline: 'Release the everyday. Experience Sri Lanka more deeply.',
    supporting: 'Be present. Experience the moment. Take the memories home.',
    footerStatement:
      'Travel beyond sightseeing. Be present for the experience. Take the memories home.',
  },

  contact: {
    // UNCONFIRMED — replace with the real enquiry email before launch.
    email: 'hello@releasetours.com',
    // UNCONFIRMED — replace with a configured WhatsApp/contact URL, or remove.
    whatsappUrl: '',
    // No phone number is published until confirmed by the business.
  },

  social: {
    // UNCONFIRMED — replace with real profile URLs. Empty strings render nothing.
    instagram: '',
    facebook: '',
    youtube: '',
  },

  nav: [
    { label: 'The Journey', href: '/#journey' },
    { label: 'Our Philosophy', href: '/#philosophy' },
    { label: 'The Experience', href: '/#experience' },
    { label: 'Practical Information', href: '/#practical' },
    { label: 'Contact', href: '/contact' },
  ] as NavLink[],

  ctas: {
    primary: 'Explore the 7-Day Journey',
    secondary: 'Enquire About Dates',
    enquiry: 'Enquire About the Journey',
    fullItinerary: 'Ask for the Full Itinerary',
    discoverExperience: 'Discover the Release Tours Experience',
  },

  hero: {
    headline: 'Release the everyday. Experience Sri Lanka more deeply.',
    subheadline:
      'Seven days to step beyond the ordinary, discover the living culture of Sri Lanka, connect through meaningful experiences, and return home with memories made to last.',
  },

  tour: {
    duration: 'Seven days',
    // UNCONFIRMED — replace with the confirmed price and currency.
    price: '',
    currency: '',
    // UNCONFIRMED — replace with confirmed departure dates.
    dates: '',
  },

  practicalInfo: [
    { label: 'Tour duration', value: 'Seven days', confirmed: true },
    {
      label: 'Confirmed travel dates',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'Tour price',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'Currency',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'What the price includes',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'What the price excludes',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'Accommodation',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'Transport arrangements',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'Meals and dietary considerations',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'Activity requirements',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'Group size and minimum departure',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'International flights and airport transfers',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'Booking and cancellation conditions',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'Payment arrangements',
      value: 'Details available on enquiry',
      confirmed: false,
    },
    {
      label: 'How the experience album is delivered',
      value: 'Provided at the end of the tour. Details available on enquiry.',
      confirmed: false,
    },
    {
      label: 'Contact and support',
      value: 'Details available on enquiry',
      confirmed: false,
    },
  ] as PracticalInfoItem[],

  faq: [
    {
      question: 'What is Release Tours?',
      answer:
        'Release Tours is a Sri Lankan travel brand creating immersive seven-day journeys through Sri Lankan culture, nature, movement, community, and meaningful human experiences. Rather than transporting visitors between tourist attractions, Release Tours creates opportunities to experience Sri Lanka through its people, landscapes, cultural practices, and shared moments.',
    },
    {
      question: 'What makes this journey different from a traditional Sri Lankan tour?',
      answer:
        'Release Tours is built around participation rather than sightseeing. Guests are invited to move, connect, share meals, engage with cultural traditions, and be present for each experience. During selected experiences, guests put their personal phones away while the Release Tours team captures appropriate moments, receiving a curated experience album at the end of the journey.',
    },
    {
      question: 'What happens during the seven-day journey?',
      answer:
        'Each day offers a different layer of Sri Lanka — through culture, landscape, movement, and shared experiences. Day 2 is a confirmed signature experience focused on inner wellbeing and community. The full confirmed daily schedule is being finalised. Please enquire for the complete itinerary as it becomes available.',
    },
    {
      question: 'What is the Inner Wellbeing & Community Night experience?',
      answer:
        'On Day 2, guests explore the connection between movement, awareness, cultural expression, and community through a guided experience inspired by Sri Lankan traditional martial arts and dance movement. Through guided body exploration, guests notice movement, rhythm, balance, and how the body responds to a shared cultural experience, followed by a community-focused evening. It is not clinical therapy and makes no guarantee of a therapeutic outcome.',
    },
    {
      question: 'Why do guests put their phones away during selected activities?',
      answer:
        'Some moments are best experienced without a screen between you and the world. During designated experiences, Release Tours asks guests to put their personal phones away and take part fully. The team documents appropriate moments so guests can stay immersed instead of trying to capture everything themselves. This applies only to selected experiences — not the entire journey.',
    },
    {
      question: 'How do I receive my experience album?',
      answer:
        'You receive a curated Release Tours experience album at the end of the journey — a collection of memories from the people, places, and moments that made the journey yours. Further details about the album are available on enquiry.',
    },
    {
      question: 'Where can I find the price and departure dates?',
      answer:
        'Pricing, currency, and confirmed departure dates are being finalised. Please use the enquiry form to request the latest available details, and the Release Tours team will respond with the current information.',
    },
    {
      question: 'Are international flights included?',
      answer:
        'Details about what is included and excluded — including international flights, airport transfers, accommodation, and meals — are being confirmed. Please enquire for the current inclusions and exclusions.',
    },
    {
      question: 'What should I know before participating in movement activities?',
      answer:
        'Movement experiences are designed to be accessible and welcoming, inviting participation rather than requiring a particular fitness level or previous experience. Specific activity requirements are available on enquiry. If you have any health considerations, please mention them when you enquire.',
    },
    {
      question: 'How can I ask questions before booking?',
      answer:
        'Use the enquiry form on the Contact page, or reach out by email. The Release Tours team is happy to help you explore the experience, available dates, and practical details before you decide.',
    },
  ] as FaqItem[],
};

export type SiteConfig = typeof siteConfig;
