export type WebListStory = {
  slug: string
  title: string
  image: string
  date?: string
  publisher?: string
}

// Shared list of web stories used by grid and detail modal
export const WEB_STORIES_LIST: WebListStory[] = [
  { slug: 'ws-1', title: 'Jammu & Kashmir: लाल चौक पर सियासी हलचल', image: '/uploads/jammu-and-kashmir-elections-bjp-muslim-candidates-lal-chowk.jpg', date: 'Oct 30, 2025', publisher: 'Hindusthan Post Bureau' },
  { slug: 'ws-2', title: 'India Economy: Q3 में मजबूती', image: '/uploads/india-economy-growth.png', date: 'Oct 28, 2025', publisher: 'Hindusthan Post Bureau' },
  { slug: 'ws-3', title: 'Tech Startups: नई उड़ान', image: '/uploads/new-tech-startups.jpg', date: 'Oct 27, 2025', publisher: 'Hindusthan Post Bureau' },
  { slug: 'ws-4', title: 'National Elections: तैयारी तेज', image: '/uploads/national-election-preview.png', date: 'Oct 25, 2025', publisher: 'Hindusthan Post Bureau' },
  { slug: 'ws-5', title: 'Climate Summit: बड़े फैसले', image: '/uploads/global-climate-summit.jpg', date: 'Oct 22, 2025', publisher: 'Hindusthan Post Bureau' },
  { slug: 'ws-6', title: 'Cricket Finals: रोमांचक अंत', image: '/uploads/cricket-finals-draw.jpg', date: 'Oct 20, 2025', publisher: 'Hindusthan Post Bureau' },
  { slug: 'ws-7', title: 'City Crime: पुलिस का बड़ा ऐक्शन', image: '/uploads/city-police-bust.png', date: 'Oct 18, 2025', publisher: 'Hindusthan Post Bureau' },
  { slug: 'ws-8', title: 'UP Election 2022: समय पर मतदान', image: '/uploads/p-election-2022-elections-will-not-be-postponed-in-uttar-pradesh-ec-said-all-political-p.jpeg', date: 'Oct 15, 2025', publisher: 'Hindusthan Post Bureau' },
  { slug: 'ws-9', title: "अब नहीं रहे 'एडमैन' पीयूष पांडे, विज्ञापन जगत के जादूगर", image: '/uploads/p-election-2022-elections-will-not-be-postponed-in-uttar-pradesh-ec-said-all-political-p.jpeg', date: 'Nov 3, 2025', publisher: 'Hindusthan Post Bureau' },
  { slug: 'ws-10', title: 'क्यों मनाते हैं भाईदूज? इस एक रस्म के पीछे छिपा है अमर संबंध का रहस्य !', image: '/uploads/india-economy-growth.png', date: 'Nov 3, 2025', publisher: 'Hindusthan Post Bureau' }
]


