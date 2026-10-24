/**
 * Release Tours — curated image library.
 *
 * All images are sourced from Pexels (license-free) and can be replaced with
 * the business's own professional photography. Reference these via the helper
 * fields below so updates only need to happen here.
 *
 * To replace an image: swap the `src` URL for a local asset path or another
 * reliable URL. Keep alt text descriptive for accessibility and SEO.
 */

export interface ImageRef {
  src: string;
  alt: string;
}

export const images = {
  hero: {
    src: 'https://images.pexels.com/photos/1122875/pexels-photo-1122875.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Misty morning over lush green tea plantations in the Sri Lankan highlands',
  },

  manifesto: {
    src: 'https://images.pexels.com/photos/18054088/pexels-photo-18054088.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'A tranquil dirt road under lush green trees in a Sri Lankan forest',
  },

  pillars: {
    culture: {
      src: 'https://images.pexels.com/photos/36638326/pexels-photo-36638326.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A vibrant traditional Kandyan dance performance in Sri Lanka at night',
    },
    movement: {
      src: 'https://images.pexels.com/photos/19117453/pexels-photo-19117453.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Two individuals practicing martial arts movement in a forested area',
    },
    community: {
      src: 'https://images.pexels.com/photos/32310262/pexels-photo-32310262.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Three men conversing in a candid street scene in Sri Lanka',
    },
    memories: {
      src: 'https://images.pexels.com/photos/40213739/pexels-photo-40213739.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A person moving with awareness outdoors, surrounded by greenery',
    },
  },

  journey: {
    day1: {
      src: 'https://images.pexels.com/photos/34861048/pexels-photo-34861048.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A serene tropical beach in Sri Lanka with rocky shores and lush greenery',
    },
    day2: {
      src: 'https://images.pexels.com/photos/36638324/pexels-photo-36638324.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A Kandyan dancer performing traditional Sri Lankan dance under night lights',
    },
    day3: {
      src: 'https://images.pexels.com/photos/27848203/pexels-photo-27848203.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Tranquil sunrise view of lush tea plantations and trees in Kandy, Sri Lanka',
    },
    day4: {
      src: 'https://images.pexels.com/photos/6123598/pexels-photo-6123598.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'An experienced Sri Lankan crafter weaving outdoors in Batticaloa',
    },
    day5: {
      src: 'https://images.pexels.com/photos/31001476/pexels-photo-31001476.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Old stone steps leading through a lush green forest in Sri Lanka',
    },
    day6: {
      src: 'https://images.pexels.com/photos/319942/pexels-photo-319942.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A Sri Lankan breakfast with passion fruit, cashews, and fresh coconut',
    },
    day7: {
      src: 'https://images.pexels.com/photos/15589614/pexels-photo-15589614.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Serene sunset view over the Sri Lankan coastline with golden skies',
    },
  },

  bePresent: {
    participation: {
      src: 'https://images.pexels.com/photos/36638325/pexels-photo-36638325.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Traditional Kandyan dancers performing a cultural dance in Sri Lanka',
    },
    candid: {
      src: 'https://images.pexels.com/photos/13142519/pexels-photo-13142519.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A candid portrait of a mother and child in a rural Sri Lankan setting',
    },
    album: {
      src: 'https://images.pexels.com/photos/38331272/pexels-photo-38331272.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A candid moment of people sharing a quiet connection in Sri Lanka',
    },
  },

  gallery: [
    {
      src: 'https://images.pexels.com/photos/19287633/pexels-photo-19287633.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Misty mountains and lush hills in the Sri Lankan highlands',
      caption: 'Highlands and tea country',
    },
    {
      src: 'https://images.pexels.com/photos/36638332/pexels-photo-36638332.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A Kandyan dancer showcasing traditional Sri Lankan cultural heritage',
      caption: 'Cultural expression and traditional movement',
    },
    {
      src: 'https://images.pexels.com/photos/5176006/pexels-photo-5176006.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A display of Sri Lankan food garnished with fresh vegetables',
      caption: 'Local food and shared tables',
    },
    {
      src: 'https://images.pexels.com/photos/5109190/pexels-photo-5109190.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A misty lake surrounded by lush hills in Sri Lanka',
      caption: 'Landscapes and nature',
    },
    {
      src: 'https://images.pexels.com/photos/32360929/pexels-photo-32360929.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A street vendor preparing food outdoors in a vibrant Sri Lankan market',
      caption: 'Community and human connection',
    },
    {
      src: 'https://images.pexels.com/photos/5620128/pexels-photo-5620128.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'A solitary tree on a lush tea plantation with scenic hill backdrop',
      caption: 'Everyday discoveries',
    },
  ] as Array<ImageRef & { caption: string }>,

  whoFor: {
    src: 'https://images.pexels.com/photos/20181903/pexels-photo-20181903.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'A person riding a bicycle on a scenic road surrounded by lush greenery in Sri Lanka',
  },

  about: {
    src: 'https://images.pexels.com/photos/39339600/pexels-photo-39339600.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Ancient stone temple ruins in Polonnaruwa, Sri Lanka, surrounded by greenery',
  },

  contact: {
    src: 'https://images.pexels.com/photos/35220282/pexels-photo-35220282.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'A vibrant green tea plantation amidst misty surroundings in Sri Lanka',
  },

  og: {
    src: 'https://images.pexels.com/photos/1122875/pexels-photo-1122875.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Misty morning over lush green tea plantations in Sri Lanka',
  },
};

export type Images = typeof images;
