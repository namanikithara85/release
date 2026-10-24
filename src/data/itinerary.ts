/**
 * Release Tours — seven-day itinerary data source.
 *
 * This is the single place to edit day-by-day content. Day 2 is a confirmed
 * signature experience. All other days use provisional editorial copy and must
 * NOT be presented as verified facts — replace with confirmed details as they
 * arrive from the business.
 *
 * Fields:
 *  - day:         day number
 *  - title:       short memorable title
 *  - confirmed:   whether the day's details are confirmed
 *  - headline:    featured editorial headline (optional)
 *  - intro:       one-sentence introduction
 *  - description: longer supporting copy
 *  - topics:      list of experience themes
 *  - location:    location string, or empty if unconfirmed
 *  - image:       ImageRef for the day
 */

import { images } from './images';

export interface ItineraryDay {
  day: number;
  title: string;
  confirmed: boolean;
  headline?: string;
  intro: string;
  description: string;
  topics: string[];
  location: string;
  image: { src: string; alt: string };
}

export const itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival and First Light',
    confirmed: false,
    intro:
      'Begin the journey by settling in, leaving the rush behind, and meeting Sri Lanka at its own pace.',
    description:
      'The first day is an invitation to arrive gently — to breathe, to adjust to a new rhythm, and to prepare for the days ahead. Exact activities, location, and accommodation are being confirmed.',
    topics: ['Arrival', 'Settling in', 'First impressions'],
    location: '',
    image: images.journey.day1,
  },
  {
    day: 2,
    title: 'Inner Wellbeing & Community Night',
    confirmed: true,
    headline: 'Listen to the body. Discover the culture. Connect with others.',
    intro:
      'Explore the connection between movement, awareness, cultural expression, and community through a guided experience inspired by Sri Lankan traditional martial arts and dance movement.',
    description:
      'Through guided body exploration, guests are invited to notice movement, rhythm, balance, and how the body responds to a shared cultural experience. The day connects physical expression with the wider experience of discovering Sri Lanka\u2019s cultural traditions, followed by a community-focused evening.',
    topics: [
      'Traditional Sri Lankan martial arts',
      'Traditional dance and movement',
      'Guided body exploration',
      'Listening to the body through movement',
      'Cultural participation and shared experience',
      'Community connection in the evening',
    ],
    location: '',
    image: images.journey.day2,
  },
  {
    day: 3,
    title: 'Highlands and Living Landscape',
    confirmed: false,
    intro:
      'Step into the cool, green highlands and discover how landscape shapes the way people live, grow, and gather.',
    description:
      'A day among Sri Lanka\u2019s highlands, exploring the relationship between land, livelihood, and daily rhythm. Specific locations and activities are being confirmed.',
    topics: ['Highlands', 'Tea country', 'Living landscape'],
    location: '',
    image: images.journey.day3,
  },
  {
    day: 4,
    title: 'Craft, Hands, and Heritage',
    confirmed: false,
    intro:
      'Meet the people who keep Sri Lankan craft and everyday artistry alive, and take part in the making.',
    description:
      'A day focused on craft, making, and the human skill behind everyday objects. Guests are invited to observe, participate, and connect with local artisans. Specific activities and locations are being confirmed.',
    topics: ['Local artisans', 'Everyday craftsmanship', 'Hands-on participation'],
    location: '',
    image: images.journey.day4,
  },
  {
    day: 5,
    title: 'Path, Forest, and Stillness',
    confirmed: false,
    intro:
      'Walk quieter paths through forest and garden, and make space to slow down and notice.',
    description:
      'A day to move at a slower pace through Sri Lanka\u2019s natural landscapes, with room for stillness and reflection. Specific routes and activities are being confirmed.',
    topics: ['Rural paths', 'Forest and gardens', 'Stillness and reflection'],
    location: '',
    image: images.journey.day5,
  },
  {
    day: 6,
    title: 'Shared Table and Local Flavour',
    confirmed: false,
    intro:
      'Discover Sri Lanka through its food, its shared tables, and the conversations that unfold around them.',
    description:
      'A day devoted to Sri Lankan food and the culture of sharing meals. Guests are invited to taste, learn, and connect around the table. Specific experiences and locations are being confirmed.',
    topics: ['Sri Lankan food', 'Shared meals', 'Local flavour'],
    location: '',
    image: images.journey.day6,
  },
  {
    day: 7,
    title: 'Reflection and Farewell',
    confirmed: false,
    intro:
      'Close the journey with space to reflect, gather the memories, and carry the experience home.',
    description:
      'The final day is an invitation to look back on the journey, receive the experience album, and prepare to return. Specific activities and arrangements are being confirmed.',
    topics: ['Reflection', 'Experience album', 'Farewell'],
    location: '',
    image: images.journey.day7,
  },
];
