export const FISH_THEME = {
  accent: '#0891b2', accentDark: '#155e75', accentLight: '#ecfeff', accentMid: '#a5f3fc',
  bg: '#f0f9ff', hero: 'linear-gradient(135deg, #042f3a 0%, #0e6174 40%, #06b6d4 100%)',
  cardGlow: '0 2px 20px rgba(8,145,178,0.08)', pill: '#cffafe', pillText: '#155e75',
  tagBg: '#ecfeff', tagText: '#0e7490',
};
export const HUNT_THEME = {
  accent: '#c2410c', accentDark: '#7c2d12', accentLight: '#fff7ed', accentMid: '#fed7aa',
  bg: '#fffbf5', hero: 'linear-gradient(135deg, #310a04 0%, #7c2d12 40%, #ea580c 100%)',
  cardGlow: '0 2px 20px rgba(194,65,12,0.08)', pill: '#ffedd5', pillText: '#9a3412',
  tagBg: '#fff7ed', tagText: '#c2410c',
};

export type Theme = typeof FISH_THEME;

export const FISH_LOCATIONS = ['Anywhere','Alaska','Florida Keys','Lake Erie, OH','Lake Okeechobee, FL','Marco Island, FL','Louisiana Marsh','Charleston, SC','Central Florida','Montana Rivers','Gulf of Mexico','Chesapeake Bay','Pacific NW','Outer Banks, NC','San Diego, CA'];
export const HUNT_LOCATIONS = ['Anywhere','Colorado Rockies','Montana','Wyoming','Idaho','Texas Hill Country','Southeast US','Kansas Prairies','Alaska','Utah','New Mexico','Black Canyon, CO','SW Montana','Central Texas','Arkansas'];

export const SEASONS = [
  { label: 'Anytime', icon: null, val: 'any' },
  { label: 'Spring', sub: 'Mar – May', icon: '🌸', val: 'spring' },
  { label: 'Summer', sub: 'Jun – Aug', icon: '☀️', val: 'summer' },
  { label: 'Fall', sub: 'Sep – Nov', icon: '🍂', val: 'fall' },
  { label: 'Winter', sub: 'Dec – Feb', icon: '❄️', val: 'winter' },
];

export const EXP_LEVELS = [
  { label: 'First Timer', desc: 'Never done this before', val: 'beginner', emoji: '🌱' },
  { label: 'Intermediate', desc: 'Been out a few times', val: 'intermediate', emoji: '🎯' },
  { label: 'Expert', desc: 'Seasoned pro', val: 'expert', emoji: '🏆' },
  { label: 'Any Level', desc: 'Show me everything', val: 'all', emoji: '✨' },
];

export interface AvailabilityWindow {
  startDate: string;
  endDate: string;
  weather: string;
  conditions: string;
}

export interface Credential {
  uscg?: string;
  stateLicense: string;
  insurance: boolean;
  endorsements?: string[];
}

export interface Guide {
  id: number;
  name: string;
  loc: string;
  type: 'fish' | 'hunt';
  sub: string[];
  species: string[];
  price: string;
  rating: number;
  reviews: number;
  exp: string;
  bio: string;
  avail: string;
  catches: Array<{ s: string; d: string; t: string; g: string[] }>;
  levels: string[];
  seasons: string[];
  credentials: Credential;
  availability: AvailabilityWindow[];
}

export interface Species {
  id: number;
  name: string;
  type: 'fish' | 'hunt';
  sub: string[];
  emoji: string;
  where: string;
  when: string;
  how: string;
  diff: number;
  desc: string;
  g: string[];
}

export const GUIDES: Guide[] = [
  {
    id:1, name:'Capt. Mark Rose', loc:'Lake Erie, OH', type:'fish', sub:['spin'], species:['Smallmouth Bass','Walleye'], price:'$500/day', rating:4.97, reviews:89, exp:'20+ yrs', bio:'Legendary smallmouth specialist on Lake Erie. Put 18 fish in the boat when others struck out, including trophy 5.9lb and 5.5lb smallmouth.', avail:'Available',
    catches:[{s:'Smallmouth Bass',d:'5.9 lbs',t:'Oct 2025',g:['#065f46','#10b981']},{s:'Smallmouth Bass',d:'5.5 lbs',t:'Oct 2025',g:['#047857','#34d399']},{s:'Walleye',d:'8.2 lbs',t:'Sep 2025',g:['#1e3a5f','#60a5fa']}],
    levels:['intermediate','expert'], seasons:['spring','summer','fall'],
    credentials: { uscg: 'USCG #1284756', stateLicense: 'OH-FG-2024-3847', insurance: true },
    availability: [
      { startDate:'2026-05-01', endDate:'2026-05-18', weather:'Cool to warm, 58–68°F', conditions:'Smallmouth pre-spawn to spawn on rocky flats, crayfish pattern' },
      { startDate:'2026-05-21', endDate:'2026-06-14', weather:'Warm, 68–78°F', conditions:'Post-spawn feeders, topwater at dawn, walleye reefs heating up' },
      { startDate:'2026-06-17', endDate:'2026-07-15', weather:'Warm to hot, 75–84°F', conditions:'Summer pattern — deep structure smallmouth, walleye trolling' },
      { startDate:'2026-07-18', endDate:'2026-08-15', weather:'Hot, 80–85°F', conditions:'Late summer walleye trolling, nightcrawler rigs, deep drop-shot' },
      { startDate:'2026-08-25', endDate:'2026-09-20', weather:'Cooling, 68–75°F', conditions:'Fall turnover starting, smallmouth on rock transitions' },
      { startDate:'2026-09-25', endDate:'2026-10-25', weather:'Cool, 55–65°F', conditions:'Fall smallmouth peak, trophy fish feeding before winter' },
    ],
  },
  {
    id:2, name:'Capt. Dawson', loc:'Lake Okeechobee, FL', type:'fish', sub:['spin'], species:['Largemouth Bass'], price:'$450/day', rating:4.95, reviews:142, exp:'15 yrs', bio:'Professional, prepared, and knows Lake Okeechobee inside and out. Great with kids and beginners. Consistently finds big bass even on tough days.', avail:'Available',
    catches:[{s:'Largemouth Bass',d:'9.4 lbs',t:'Nov 2025',g:['#14532d','#22c55e']},{s:'Largemouth Bass',d:'7.8 lbs',t:'Oct 2025',g:['#065f46','#10b981']},{s:'Largemouth Bass',d:'8.1 lbs',t:'Sep 2025',g:['#166534','#4ade80']}],
    levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'],
    credentials: { uscg: 'USCG #1156234', stateLicense: 'FL-FG-2024-8821', insurance: true },
    availability: [
      { startDate:'2026-05-01', endDate:'2026-05-25', weather:'Hot, 85–90°F', conditions:'Bass on beds and post-spawn, flipping hydrilla mats' },
      { startDate:'2026-05-28', endDate:'2026-06-22', weather:'Hot, 88–92°F', conditions:'Topwater frog bite early AM, lily pad bass, punching heavy cover' },
      { startDate:'2026-06-25', endDate:'2026-07-20', weather:'Hot, 90–93°F', conditions:'Schooling bass on shell bars, shad spawning, deep weedline' },
      { startDate:'2026-07-23', endDate:'2026-08-18', weather:'Hot, 90–92°F, storms PM', conditions:'Deep Carolina rig, early morning topwater, summer pattern' },
      { startDate:'2026-08-22', endDate:'2026-09-20', weather:'Hot, 88–91°F', conditions:'Transition bite, bass moving shallow to deep daily' },
      { startDate:'2026-09-25', endDate:'2026-10-25', weather:'Warm, 82–87°F', conditions:'Fall shad migration, bass schooling in open water' },
      { startDate:'2026-11-01', endDate:'2026-12-15', weather:'Mild, 72–80°F', conditions:'Winter pattern starting, big bass on slow presentations' },
      { startDate:'2027-01-05', endDate:'2027-02-28', weather:'Cool, 65–75°F', conditions:'Pre-spawn staging, big females on deep ledges' },
    ],
  },
  {
    id:3, name:'Capt. Jason', loc:'Marco Island, FL', type:'fish', sub:['spin','fly'], species:['Redfish','Snook','Tarpon'], price:'$600/day', rating:4.98, reviews:203, exp:'18 yrs', bio:'Incredibly knowledgeable about the 10,000 Islands. Super friendly, great with kids. Offers inshore, eco tours, and sunset trips. One of the best days you\'ll have on water.', avail:'Available',
    catches:[{s:'Redfish',d:'28 inches',t:'Nov 2025',g:['#7f1d1d','#ef4444']},{s:'Snook',d:'32 inches',t:'Oct 2025',g:['#374151','#9ca3af']},{s:'Tarpon',d:'85 lbs',t:'Sep 2025',g:['#1f2937','#6b7280']}],
    levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'],
    credentials: { uscg: 'USCG #1098432', stateLicense: 'FL-FG-2023-6614', insurance: true },
    availability: [
      { startDate:'2026-05-01', endDate:'2026-05-28', weather:'Warm, 82–87°F', conditions:'Snook staging, tarpon migration arriving, redfish on flats' },
      { startDate:'2026-06-01', endDate:'2026-06-28', weather:'Hot, 88–91°F', conditions:'Peak tarpon 80–120lb, snook spawn, redfish tailing low tide' },
      { startDate:'2026-07-01', endDate:'2026-07-28', weather:'Hot, 90–93°F', conditions:'Snook spawn run, tarpon in passes, topwater blowups at dawn' },
      { startDate:'2026-08-01', endDate:'2026-08-28', weather:'Hot, 91°F, storms PM', conditions:'Juvenile tarpon in canals, snook in mangroves, redfish schools' },
      { startDate:'2026-09-01', endDate:'2026-09-28', weather:'Warm, 87–90°F', conditions:'Fall mullet run starting, snook and tarpon ambushing bait' },
      { startDate:'2026-10-01', endDate:'2026-10-28', weather:'Pleasant, 82–86°F', conditions:'Peak fall redfish, bull reds on grass flats' },
      { startDate:'2026-11-01', endDate:'2026-12-20', weather:'Mild, 75–82°F', conditions:'Winter snook, redfish in creeks, calm water sight-casting' },
      { startDate:'2027-01-05', endDate:'2027-02-28', weather:'Cool, 70–78°F', conditions:'Winter pattern, big snook staging, sheepshead bonus' },
    ],
  },
  {
    id:4, name:'Capt. Bill Goudy Jr.', loc:'Central FL', type:'fish', sub:['spin'], species:['Largemouth Bass','Catfish','Gar'], price:'$400/day', rating:4.92, reviews:76, exp:'12 yrs', bio:'Takes anglers to great spots in a fast boat. Versatile guide covering bass, catfish, and trophy gar. Fun, memorable trips with groups up to 14.', avail:'Available',
    catches:[{s:'Largemouth Bass',d:'7.2 lbs',t:'Oct 2025',g:['#14532d','#22c55e']},{s:'Gar',d:'42 inches',t:'Sep 2025',g:['#3f3f46','#a1a1aa']},{s:'Catfish',d:'18 lbs',t:'Aug 2025',g:['#44403c','#a8a29e']}],
    levels:['beginner','intermediate'], seasons:['spring','summer','fall','winter'],
    credentials: { uscg: 'USCG #1342891', stateLicense: 'FL-FG-2024-2209', insurance: true },
    availability: [
      { startDate:'2026-05-01', endDate:'2026-05-28', weather:'Warm, 85–90°F', conditions:'Bass spawning flats, gar in backwater canals, topwater dawn' },
      { startDate:'2026-06-01', endDate:'2026-06-28', weather:'Hot, 88–92°F', conditions:'Big catfish on cut bait, bass deep ledges, gar sight-fishing' },
      { startDate:'2026-07-01', endDate:'2026-07-28', weather:'Hot, 90–93°F', conditions:'Night catfish trips 20lb+, bass schooling, gar in backwaters' },
      { startDate:'2026-08-01', endDate:'2026-08-28', weather:'Hot, 92°F, storms PM', conditions:'Summer pattern — dawn and dusk best, group trips available' },
      { startDate:'2026-09-01', endDate:'2026-09-28', weather:'Warm, 87–90°F', conditions:'Fall transition, bass moving shallow, catfish feeding heavy' },
      { startDate:'2026-10-01', endDate:'2026-11-15', weather:'Pleasant, 78–85°F', conditions:'Fall bass peak, trophy gar, catfish on trotlines' },
      { startDate:'2026-12-01', endDate:'2027-02-28', weather:'Mild, 65–75°F', conditions:'Winter bass on slow jigs, trophy catfish, cool weather comfort' },
    ],
  },
  {
    id:5, name:'Michael Pittman', loc:'Louisiana', type:'fish', sub:['fly'], species:['Redfish','Speckled Trout','Flounder'], price:'$650/day', rating:4.96, reviews:118, exp:'22 yrs', bio:'Orvis-endorsed fly fishing guide in Louisiana. Premier saltwater fly fishing for redfish on the marsh. Expert instruction for all skill levels.', avail:'Limited',
    catches:[{s:'Redfish',d:'31 inches',t:'Nov 2025',g:['#7f1d1d','#ef4444']},{s:'Speckled Trout',d:'26 inches',t:'Oct 2025',g:['#1e3a5f','#38bdf8']},{s:'Redfish',d:'29 inches',t:'Oct 2025',g:['#991b1b','#f87171']}],
    levels:['intermediate','expert'], seasons:['spring','fall','winter'],
    credentials: { uscg: 'USCG #1187623', stateLicense: 'LA-FG-2024-5501', insurance: true, endorsements: ['Orvis Endorsed'] },
    availability: [
      { startDate:'2026-03-01', endDate:'2026-03-28', weather:'Mild, 68–75°F', conditions:'Spring redfish on flats, speckled trout in bayous' },
      { startDate:'2026-04-01', endDate:'2026-04-28', weather:'Warm, 74–80°F', conditions:'Pre-summer redfish, flounder starting, sight-casting grass flats' },
      { startDate:'2026-05-01', endDate:'2026-05-25', weather:'Warm, 80–85°F', conditions:'Redfish tailing on grass flats, south wind light' },
      { startDate:'2026-09-15', endDate:'2026-10-15', weather:'Cooling, 68–78°F', conditions:'Fall run bull reds in passes, 30–40 fish days possible' },
      { startDate:'2026-10-18', endDate:'2026-11-15', weather:'Cool, 58–68°F', conditions:'Speckled trout run, schooling redfish in open bays' },
      { startDate:'2026-11-18', endDate:'2026-12-20', weather:'Cool, 52–62°F', conditions:'Winter redfish, big trout in deep holes, calm marsh days' },
      { startDate:'2027-01-05', endDate:'2027-02-28', weather:'Cold, 48–58°F', conditions:'Winter pattern, trophy trout on slow presentations' },
    ],
  },
  {
    id:6, name:'Capt. Danny Lynch', loc:'Charleston, SC', type:'fish', sub:['fly'], species:['Tarpon','Redfish','Bonefish'], price:'$700/day', rating:4.94, reviews:95, exp:'16 yrs', bio:'Orvis-endorsed fly fishing guide just 30 minutes from Charleston airport. Specializes in sight-casting to tarpon and redfish on pristine lowcountry flats.', avail:'Next: Mar 2026',
    catches:[{s:'Tarpon',d:'95 lbs',t:'Jul 2025',g:['#1f2937','#9ca3af']},{s:'Redfish',d:'30 inches',t:'Sep 2025',g:['#7f1d1d','#f87171']},{s:'Redfish',d:'27 inches',t:'Aug 2025',g:['#991b1b','#fca5a5']}],
    levels:['intermediate','expert'], seasons:['spring','summer','fall'],
    credentials: { uscg: 'USCG #1076548', stateLicense: 'SC-FG-2023-7743', insurance: true, endorsements: ['Orvis Endorsed'] },
    availability: [
      { startDate:'2026-04-01', endDate:'2026-04-28', weather:'Warm, 78–84°F', conditions:'Spring redfish on flats, early tarpon scouts arriving' },
      { startDate:'2026-05-01', endDate:'2026-05-28', weather:'Warm, 82–88°F', conditions:'Tarpon arriving, sight-casting incoming tide, snook in creeks' },
      { startDate:'2026-06-01', endDate:'2026-06-28', weather:'Hot, 88–92°F', conditions:'Peak tarpon 80–100lb on flats, morning redfish, afternoon tarpon' },
      { startDate:'2026-07-01', endDate:'2026-07-28', weather:'Hot, 90–93°F', conditions:'Late tarpon, snook in passes, redfish on low tide' },
      { startDate:'2026-08-01', endDate:'2026-08-28', weather:'Hot, 91°F, humid', conditions:'Flounder run, redfish in creeks, juvenile tarpon' },
      { startDate:'2026-09-01', endDate:'2026-09-28', weather:'Warm, 86–90°F', conditions:'Fall mullet run, redfish gorging on bait schools' },
      { startDate:'2026-10-01', endDate:'2026-11-15', weather:'Pleasant, 75–84°F', conditions:'Fall redfish peak, sight-casting shallow flats' },
    ],
  },
  {
    id:7, name:'Capt. Patrick & Hank', loc:'Marathon, FL', type:'fish', sub:['deep-sea'], species:['Sailfish','Mahi-Mahi','Tuna'], price:'$1,200/day', rating:4.93, reviews:67, exp:'25 yrs', bio:'Deep sea fishing experts in the Florida Keys. Go above and beyond for an amazing offshore experience. Specialize in sailfish, mahi, and big game pelagics.', avail:'Available',
    catches:[{s:'Sailfish',d:'68 lbs',t:'Dec 2025',g:['#312e81','#818cf8']},{s:'Mahi-Mahi',d:'32 lbs',t:'Nov 2025',g:['#065f46','#fbbf24']},{s:'Yellowfin Tuna',d:'85 lbs',t:'Oct 2025',g:['#1e1b4b','#6366f1']}],
    levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'],
    credentials: { uscg: 'USCG #1234098', stateLicense: 'FL-CH-2024-1187', insurance: true },
    availability: [
      { startDate:'2026-05-01', endDate:'2026-05-28', weather:'Calm seas, 80–85°F', conditions:'Mahi schooling on weedlines, sailfish bite building' },
      { startDate:'2026-06-01', endDate:'2026-06-28', weather:'Warm, 84–88°F', conditions:'Yellowfin tuna on humps, mahi + blackfin mixed bag' },
      { startDate:'2026-07-01', endDate:'2026-07-28', weather:'Hot, 87–90°F', conditions:'Summer dolphin run, swordfish daytime drops, weedline action' },
      { startDate:'2026-08-01', endDate:'2026-08-28', weather:'Hot, 89°F, breezy PM', conditions:'Late summer mahi, wahoo showing up on edges' },
      { startDate:'2026-09-01', endDate:'2026-09-28', weather:'Warm, 86–89°F', conditions:'Transition season, tuna + mahi, occasional swordfish' },
      { startDate:'2026-10-01', endDate:'2026-10-28', weather:'Pleasant, 82–86°F', conditions:'Fall sailfish arriving, kingfish on wrecks' },
      { startDate:'2026-11-01', endDate:'2026-12-20', weather:'Mild, 78–83°F', conditions:'Peak sailfish season, kite fishing, live bait' },
      { startDate:'2027-01-05', endDate:'2027-03-15', weather:'Cool, 74–80°F', conditions:'Winter sailfish peak, wahoo, tuna on humps' },
    ],
  },
  {
    id:8, name:'Capt. TJ & Eddie', loc:'South Florida', type:'fish', sub:['deep-sea'], species:['Swordfish','Blue Marlin','Tuna'], price:'$1,800/day', rating:4.91, reviews:54, exp:'20 yrs', bio:'Very knowledgeable and helpful deep sea charter crew. Premium offshore experience targeting the biggest game fish in the Atlantic. Full and half day trips.', avail:'Available',
    catches:[{s:'Blue Marlin',d:'~350 lbs',t:'Nov 2025',g:['#1e3a5f','#3b82f6']},{s:'Swordfish',d:'180 lbs',t:'Oct 2025',g:['#312e81','#a78bfa']},{s:'Yellowfin Tuna',d:'110 lbs',t:'Sep 2025',g:['#1e1b4b','#818cf8']}],
    levels:['intermediate','expert'], seasons:['summer','fall','winter'],
    credentials: { uscg: 'USCG #1298765', stateLicense: 'FL-CH-2024-0934', insurance: true },
    availability: [
      { startDate:'2026-05-01', endDate:'2026-05-28', weather:'Warm, 82–86°F', conditions:'Swordfish daytime bite, deep drop 1400ft, early marlin scouts' },
      { startDate:'2026-06-01', endDate:'2026-06-28', weather:'Hot, 86–90°F', conditions:'Blue marlin showing, trolling ballyhoo, swordfish still strong' },
      { startDate:'2026-07-01', endDate:'2026-07-28', weather:'Hot, 88–91°F', conditions:'Peak tuna 60–120lb on chunks, marlin on weedlines' },
      { startDate:'2026-08-01', endDate:'2026-08-28', weather:'Hot, 90°F, humid', conditions:'Wahoo arriving, high-speed trolling, nighttime swordfishing' },
      { startDate:'2026-09-01', endDate:'2026-09-28', weather:'Warm, 87–90°F', conditions:'Sword and marlin peak season, big fish moving through' },
      { startDate:'2026-10-01', endDate:'2026-11-15', weather:'Pleasant, 82–87°F', conditions:'Fall swordfishing, wahoo peak, late marlin' },
      { startDate:'2026-12-01', endDate:'2027-02-28', weather:'Mild, 76–82°F', conditions:'Winter sword bite, sailfish mixing in, calm seas' },
    ],
  },
  {
    id:9, name:'Trevor', loc:'Fairbanks, AK', type:'fish', sub:['spin','fly'], species:['King Salmon','Rainbow Trout','Arctic Char'], price:'$500/day', rating:4.90, reviews:83, exp:'10 yrs', bio:'Excellent Alaska guide with deep local knowledge. Runs ice fishing expeditions in heated cabins and summer salmon trips. Handles mishaps with humor and skill.', avail:'Available',
    catches:[{s:'King Salmon',d:'42 lbs',t:'Aug 2025',g:['#9f1239','#fb7185']},{s:'Rainbow Trout',d:'24 inches',t:'Jul 2025',g:['#1e40af','#93c5fd']},{s:'Arctic Char',d:'18 inches',t:'Jul 2025',g:['#0c4a6e','#7dd3fc']}],
    levels:['beginner','intermediate','expert'], seasons:['summer','winter'],
    credentials: { stateLicense: 'AK-FG-2024-0447', insurance: true },
    availability: [
      { startDate:'2026-06-10', endDate:'2026-06-30', weather:'Long days, 60–68°F', conditions:'King salmon run starting, 20hrs daylight, rainbow trout active' },
      { startDate:'2026-07-01', endDate:'2026-07-28', weather:'Warm, 65–72°F', conditions:'Peak kings 30–50lb, sockeye arriving, trout on egg patterns' },
      { startDate:'2026-08-01', endDate:'2026-08-28', weather:'Cooling, 58–66°F', conditions:'Silver salmon arriving, aggressive on flies, fall colors' },
      { startDate:'2026-09-01', endDate:'2026-09-20', weather:'Cool, 48–58°F', conditions:'Late silvers, trophy rainbow trout, Arctic char in lakes' },
      { startDate:'2026-12-01', endDate:'2026-12-28', weather:'-5 to -15°F, dark', conditions:'Ice fishing in heated cabins, burbot, pike, Arctic char' },
      { startDate:'2027-01-05', endDate:'2027-02-15', weather:'-10 to -20°F, aurora', conditions:'Deep winter ice fishing, Arctic char, lake trout, 4hrs daylight' },
    ],
  },
  {
    id:10, name:'Capt. Tyler', loc:'St. Augustine, FL', type:'fish', sub:['deep-sea','spin'], species:['Grouper','Red Snapper','Kingfish'], price:'$900/day', rating:4.89, reviews:112, exp:'14 yrs', bio:'St. Augustine deep sea and nearshore specialist. Knows the reefs and wrecks off northeast Florida like the back of his hand. Consistent results year-round.', avail:'Available',
    catches:[{s:'Grouper',d:'28 lbs',t:'Nov 2025',g:['#422006','#a16207']},{s:'Red Snapper',d:'14 lbs',t:'Oct 2025',g:['#7f1d1d','#dc2626']},{s:'Kingfish',d:'38 lbs',t:'Sep 2025',g:['#1e3a5f','#60a5fa']}],
    levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'],
    credentials: { uscg: 'USCG #1156789', stateLicense: 'FL-CH-2024-3312', insurance: true },
    availability: [
      { startDate:'2026-05-01', endDate:'2026-05-28', weather:'Sunny, 78–84°F', conditions:'Red snapper season, kingfish running the beach, reef bite hot' },
      { startDate:'2026-06-01', endDate:'2026-06-28', weather:'Warm, 84–88°F', conditions:'Grouper on deep reefs, cobia nearshore, kingfish trolling' },
      { startDate:'2026-07-01', endDate:'2026-07-28', weather:'Hot, 87–90°F', conditions:'Nearshore snapper, triggers, family-friendly bottom fishing' },
      { startDate:'2026-08-01', endDate:'2026-08-28', weather:'Hot, 89°F, storms PM', conditions:'Late summer grouper, mangrove snapper at night, kingfish' },
      { startDate:'2026-09-01', endDate:'2026-09-28', weather:'Warm, 85–88°F', conditions:'Fall snapper, cobia returning, wahoo on wrecks' },
      { startDate:'2026-10-01', endDate:'2026-11-15', weather:'Pleasant, 78–84°F', conditions:'Fall fishing peak, red snapper, kingfish, grouper all hot' },
      { startDate:'2026-12-01', endDate:'2027-02-28', weather:'Cool, 65–75°F', conditions:'Winter sheepshead, black drum, bottom fishing consistent' },
    ],
  },
  {
    id:11, name:'Brian & Brent', loc:'San Luis Valley, CO', type:'hunt', sub:['gun','bow'], species:['Elk','Mule Deer'], price:'$5,500 / 5 days', rating:4.96, reviews:71, exp:'20+ yrs', bio:'Operate one of Colorado\'s top elk hunting outfitters. Hunt private land and Rio Grande National Forest. Deep knowledge of the San Luis Valley and surrounding mountains.', avail:'Available',
    catches:[{s:'Bull Elk',d:'350+ SCI',t:'Oct 2025',g:['#78350f','#d97706']},{s:'Bull Elk',d:'330 SCI',t:'Sep 2025',g:['#92400e','#f59e0b']},{s:'Mule Deer',d:'170" B&C',t:'Nov 2025',g:['#713f12','#eab308']}],
    levels:['intermediate','expert'], seasons:['fall'],
    credentials: { stateLicense: 'CO-OUT-2024-1876', insurance: true },
    availability: [
      { startDate:'2026-08-25', endDate:'2026-09-15', weather:'Cool, 45–58°F', conditions:'Archery elk opener through peak bugling, rut intensifying daily' },
      { startDate:'2026-09-18', endDate:'2026-10-10', weather:'Cold, 35–48°F', conditions:'Late archery and muzzleloader, bulls still vocal, crisp mornings' },
      { startDate:'2026-10-12', endDate:'2026-11-10', weather:'Cold to snow, 20–38°F', conditions:'Rifle seasons — elk pushed low, mule deer bucks in rut, cow tags' },
    ],
  },
  {
    id:12, name:'Travis Mitchell', loc:'Colorado / Multi-State', type:'hunt', sub:['gun','bow'], species:['Elk','Mule Deer','Antelope','Black Bear'], price:'$6,000 / 5 days', rating:4.94, reviews:64, exp:'21 yrs', bio:'Wildlife management degree from CSU. Has guided across the US, Mexico, Alaska, Africa, and New Zealand. Holds guide licenses in CO, AK, AZ, and South Africa.', avail:'Limited',
    catches:[{s:'Bull Elk',d:'380 SCI',t:'Sep 2025',g:['#78350f','#f59e0b']},{s:'Mule Deer',d:'185" B&C',t:'Oct 2025',g:['#713f12','#fbbf24']},{s:'Black Bear',d:'350 lbs',t:'Jun 2025',g:['#1f2937','#4b5563']}],
    levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall'],
    credentials: { stateLicense: 'CO-OUT-2024-2341', insurance: true, endorsements: ['CSU Wildlife Mgmt'] },
    availability: [
      { startDate:'2026-05-01', endDate:'2026-06-15', weather:'Cool to warm, 55–72°F', conditions:'Spring black bear in CO high country, spot-and-stalk alpine meadows' },
      { startDate:'2026-08-01', endDate:'2026-08-25', weather:'Warm, 65–78°F', conditions:'Antelope archery, early scouting for elk, bear bait stations' },
      { startDate:'2026-09-01', endDate:'2026-09-28', weather:'Clear, 42–55°F', conditions:'Archery elk peak bugling in dark timber, morning rut action' },
      { startDate:'2026-10-01', endDate:'2026-10-31', weather:'Cold to snow, 28–42°F', conditions:'Rifle elk, mule deer bucks in full rut, snow pushing game low' },
    ],
  },
  {
    id:13, name:'Dale & Tara', loc:'Idaho / Montana', type:'hunt', sub:['gun','bow'], species:['Elk','Mule Deer','Whitetail','Moose','Bear','Turkey'], price:'$4,500 / 5 days', rating:4.95, reviews:156, exp:'47 yrs', bio:'Professional outfitters since 1977. Hunt areas across Idaho, Montana, Utah, and Washington. Known for building lasting friendships—most clients return for 5 to 20+ years.', avail:'Available',
    catches:[{s:'Bull Elk',d:'340 SCI',t:'Oct 2025',g:['#78350f','#d97706']},{s:'Whitetail',d:'155" B&C',t:'Nov 2025',g:['#92400e','#fbbf24']},{s:'Moose',d:'48" spread',t:'Sep 2025',g:['#1c1917','#57534e']}],
    levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'],
    credentials: { stateLicense: 'ID-OUT-2024-0234', insurance: true },
    availability: [
      { startDate:'2026-04-15', endDate:'2026-05-20', weather:'Cool, 45–60°F', conditions:'Spring turkey Montana, gobblers hot, spring bear spot-and-stalk' },
      { startDate:'2026-05-22', endDate:'2026-06-15', weather:'Warm, 58–68°F', conditions:'Late spring bear Idaho, green meadows, high success rates' },
      { startDate:'2026-09-01', endDate:'2026-09-28', weather:'Crisp, 38–52°F', conditions:'Archery elk Frank Church Wilderness, bugling strong all month' },
      { startDate:'2026-10-01', endDate:'2026-10-28', weather:'Cold, 28–42°F', conditions:'General rifle elk, backcountry pack-in, mule deer in canyons' },
      { startDate:'2026-11-01', endDate:'2026-11-22', weather:'Cold, 22–35°F, snow', conditions:'Whitetail rut peak, Montana river bottoms, trophy bucks moving' },
      { startDate:'2026-12-01', endDate:'2027-01-15', weather:'Cold, 10–25°F', conditions:'Winter predator calling, mountain lion, coyote, bobcat' },
    ],
  },
  {
    id:14, name:'North Rim Trophy Hunts', loc:'Black Canyon, CO', type:'hunt', sub:['gun','bow'], species:['Elk','Mule Deer'], price:'$7,500 / 5 days', rating:4.98, reviews:48, exp:'25 yrs', bio:'100% trophy elk success rate in 2024 & 2025. All-inclusive hunts with one price for any size bull. Average bull scores over 350 SCI with several over 400 each year.', avail:'Limited',
    catches:[{s:'Bull Elk',d:'419 SCI',t:'Oct 2025',g:['#78350f','#f59e0b']},{s:'Bull Elk',d:'400+ SCI',t:'Sep 2025',g:['#92400e','#fbbf24']},{s:'Mule Deer',d:'190" B&C',t:'Nov 2025',g:['#713f12','#eab308']}],
    levels:['intermediate','expert'], seasons:['fall'],
    credentials: { stateLicense: 'CO-OUT-2024-3109', insurance: true, endorsements: ['BLM Permitted'] },
    availability: [
      { startDate:'2026-08-28', endDate:'2026-09-18', weather:'Cool, 40–52°F', conditions:'Archery opener through peak rut, 100% success on 350+ bulls' },
      { startDate:'2026-10-01', endDate:'2026-10-25', weather:'Cold, 28–40°F, snow likely', conditions:'Rifle seasons, elk concentrated in canyon draws, trophy mule deer' },
    ],
  },
  {
    id:15, name:'Chris & Alex', loc:'Southeast US', type:'hunt', sub:['gun','bow'], species:['Whitetail Deer','Wild Turkey','Waterfowl'], price:'$2,500 / 3 days', rating:4.91, reviews:87, exp:'7 yrs', bio:'Lifelong hunters with a great local reputation. Started as friends who built a premier outfitting operation. Quality hunts for deer, turkey, and waterfowl.', avail:'Available',
    catches:[{s:'Whitetail',d:'162" B&C',t:'Nov 2025',g:['#92400e','#fbbf24']},{s:'Wild Turkey',d:'22 lb Tom',t:'Apr 2025',g:['#7c2d12','#ea580c']},{s:'Mallard',d:'Limit',t:'Dec 2025',g:['#134e4a','#2dd4bf']}],
    levels:['beginner','intermediate','expert'], seasons:['spring','fall','winter'],
    credentials: { stateLicense: 'GA-HG-2024-4456', insurance: true },
    availability: [
      { startDate:'2026-04-01', endDate:'2026-05-10', weather:'Warm, 68–80°F', conditions:'Spring turkey season, gobblers on strut, morning hunts' },
      { startDate:'2026-09-10', endDate:'2026-10-15', weather:'Warm to cool, 60–78°F', conditions:'Early archery whitetail, food plot stands, velvet bucks' },
      { startDate:'2026-10-20', endDate:'2026-11-28', weather:'Cool, 42–60°F', conditions:'Pre-rut through peak rut whitetail, all-day sits, bucks cruising' },
      { startDate:'2026-12-01', endDate:'2026-12-28', weather:'Cold, 35–48°F', conditions:'Duck migration peak, flooded timber, late season deer' },
      { startDate:'2027-01-02', endDate:'2027-01-25', weather:'Cold, 30–42°F', conditions:'Late duck season, diver ducks, goose hunting' },
    ],
  },
  {
    id:16, name:'Stuart', loc:'Kansas', type:'hunt', sub:['gun'], species:['Pheasant','Quail','Waterfowl'], price:'$1,500 / 3 days', rating:4.93, reviews:102, exp:'22 yrs', bio:'Featured on Wingshooting TV and American Bird Hunter. Over two decades of upland and waterfowl guiding experience in prime Kansas flyway territory.', avail:'Available',
    catches:[{s:'Pheasant',d:'Limit',t:'Nov 2025',g:['#78350f','#d97706']},{s:'Quail',d:'Limit',t:'Dec 2025',g:['#92400e','#f59e0b']},{s:'Mallard',d:'Limit',t:'Jan 2026',g:['#134e4a','#14b8a6']}],
    levels:['beginner','intermediate','expert'], seasons:['fall','winter'],
    credentials: { stateLicense: 'KS-HG-2024-7789', insurance: true, endorsements: ['Wingshooting TV'] },
    availability: [
      { startDate:'2026-10-25', endDate:'2026-11-18', weather:'Cool, 35–50°F', conditions:'Pheasant opener, CRP grassland, quail coveys in hedgerows' },
      { startDate:'2026-11-20', endDate:'2026-12-15', weather:'Cold, 22–38°F', conditions:'Duck migration peak, late pheasant, central flyway flooded fields' },
      { startDate:'2026-12-18', endDate:'2027-01-20', weather:'Cold, 15–28°F', conditions:'Late season pheasant in corn, goose hunting, 10K+ geese staging' },
    ],
  },
  {
    id:17, name:'Stockton Outfitters', loc:'SW Montana', type:'hunt', sub:['bow','gun'], species:['Elk','Mule Deer','Black Bear'], price:'$5,250 / 5 days', rating:4.92, reviews:91, exp:'30+ yrs', bio:'Montana hunting outfitter. Archery season features expert callers bringing trophy bulls to 10–30 yards. Multiple Pope & Young records taken from camp. Biggest bull: 419 gross.', avail:'Available',
    catches:[{s:'Bull Elk',d:'390 SCI',t:'Sep 2025',g:['#78350f','#f59e0b']},{s:'Mule Deer',d:'175" B&C',t:'Oct 2025',g:['#713f12','#eab308']},{s:'Black Bear',d:'6\' 2"',t:'May 2025',g:['#1f2937','#6b7280']}],
    levels:['intermediate','expert'], seasons:['spring','fall'],
    credentials: { stateLicense: 'MT-OUT-2024-1456', insurance: true, endorsements: ['USFS Permitted'] },
    availability: [
      { startDate:'2026-04-20', endDate:'2026-05-25', weather:'Cool, 38–55°F', conditions:'Spring bear, bears emerging on south slopes, spot-and-stalk glassing' },
      { startDate:'2026-09-01', endDate:'2026-09-28', weather:'Cool, 40–55°F', conditions:'Archery elk, calling bulls to 20 yards in timber, peak rut' },
      { startDate:'2026-10-01', endDate:'2026-11-05', weather:'Cold, 22–40°F, snow', conditions:'Rifle elk moving to winter range, mule deer in rut, late bear' },
    ],
  },
  {
    id:18, name:'Blake', loc:'Central Texas', type:'hunt', sub:['gun','bow'], species:['Whitetail Deer','Wild Turkey','Hog'], price:'$2,000 / 3 days', rating:4.88, reviews:63, exp:'10 yrs', bio:'Avid outdoorsman and father of 5 who loves sharing memorable hunting experiences. Specializes in Texas whitetail and turkey on well-managed private ranches.', avail:'Available',
    catches:[{s:'Whitetail',d:'148" B&C',t:'Nov 2025',g:['#92400e','#fbbf24']},{s:'Wild Turkey',d:'24 lb Tom',t:'Apr 2025',g:['#7c2d12','#ea580c']},{s:'Hog',d:'280 lbs',t:'Aug 2025',g:['#44403c','#a8a29e']}],
    levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'],
    credentials: { stateLicense: 'TX-HG-2024-2234', insurance: true },
    availability: [
      { startDate:'2026-03-15', endDate:'2026-05-15', weather:'Warm, 72–88°F', conditions:'Spring turkey gobblers at dawn, hog year-round on private ranches' },
      { startDate:'2026-06-01', endDate:'2026-08-28', weather:'Hot, 95–102°F', conditions:'Summer hog night hunts with thermals, exotics combo, dawn/dusk' },
      { startDate:'2026-09-15', endDate:'2026-10-28', weather:'Warm, 75–88°F', conditions:'Early bow whitetail, hog combos, dove fields opening' },
      { startDate:'2026-11-01', endDate:'2026-12-20', weather:'Mild to cool, 45–65°F', conditions:'Whitetail pre-rut through peak rut, managed ranches, trophy bucks' },
      { startDate:'2027-01-05', endDate:'2027-02-28', weather:'Cool, 42–58°F', conditions:'Late season whitetail, winter hog, predator calling' },
    ],
  },
];

export const SPECIES: Species[] = [
  { id:1, name:'Largemouth Bass', type:'fish', sub:['spin','fly'], emoji:'🐟', where:'Florida, Texas, California, Nationwide', when:'Year-round (peak: Spring)', how:'Topwater, jigs, soft plastics, fly', diff:2, desc:'America\'s most popular freshwater gamefish. Found coast to coast.', g:['#065f46','#10b981'] },
  { id:2, name:'Smallmouth Bass', type:'fish', sub:['spin','fly'], emoji:'🐟', where:'Great Lakes, Northeast, Ozarks', when:'May – October', how:'Crankbaits, drop-shot, tubes, fly', diff:3, desc:'Pound for pound the hardest fighting freshwater fish.', g:['#047857','#34d399'] },
  { id:3, name:'Rainbow Trout', type:'fish', sub:['fly','spin'], emoji:'🐟', where:'Montana, Colorado, Alaska, Pacific NW', when:'Year-round (peak: Spring/Fall)', how:'Fly fishing (dry flies, nymphs), spinners', diff:2, desc:'The quintessential fly fishing target in mountain streams.', g:['#1e40af','#93c5fd'] },
  { id:4, name:'Brown Trout', type:'fish', sub:['fly','spin'], emoji:'🐟', where:'Montana, Pennsylvania, New York, Wyoming', when:'Year-round (peak: Fall)', how:'Streamers, nymphs, night fishing', diff:4, desc:'Wary and intelligent. Trophy browns over 20" are the ultimate challenge.', g:['#78350f','#d97706'] },
  { id:5, name:'King Salmon', type:'fish', sub:['fly','spin'], emoji:'🐟', where:'Alaska, Pacific NW, Great Lakes', when:'June – September', how:'Back-trolling, fly fishing, drift fishing', diff:3, desc:'The king of salmon. Can exceed 50 lbs in Alaska\'s legendary rivers.', g:['#9f1239','#fb7185'] },
  { id:6, name:'Steelhead', type:'fish', sub:['fly','spin'], emoji:'🐟', where:'Pacific NW, Great Lakes, Idaho', when:'Oct – April (winter run)', how:'Fly fishing, float fishing, spoons', diff:5, desc:'Sea-run rainbow trout. The ultimate freshwater fly fishing challenge.', g:['#374151','#94a3b8'] },
  { id:7, name:'Tarpon', type:'fish', sub:['fly','spin'], emoji:'🐟', where:'Florida Keys, Gulf Coast', when:'May – July (migration)', how:'Sight fishing, live bait, fly', diff:5, desc:'The Silver King. 100+ lb tarpon on the flats is a bucket list experience.', g:['#1f2937','#9ca3af'] },
  { id:8, name:'Redfish', type:'fish', sub:['fly','spin'], emoji:'🐟', where:'Louisiana, Florida, Carolinas, Texas', when:'Year-round (peak: Fall)', how:'Sight casting, gold spoons, fly', diff:2, desc:'Inshore saltwater favorite. Tailing reds on shallow flats.', g:['#7f1d1d','#ef4444'] },
  { id:9, name:'Sailfish', type:'fish', sub:['deep-sea'], emoji:'⛵', where:'South Florida, Gulf of Mexico', when:'November – March', how:'Trolling, kite fishing, live bait', diff:3, desc:'Spectacular acrobatics and that iconic blue sail.', g:['#312e81','#818cf8'] },
  { id:10, name:'Blue Marlin', type:'fish', sub:['deep-sea'], emoji:'🐟', where:'Gulf Coast, Atlantic, Outer Banks', when:'June – October', how:'Trolling, live bait', diff:5, desc:'The apex of big game fishing. Can exceed 1,000 lbs.', g:['#1e3a5f','#3b82f6'] },
  { id:11, name:'Bluefin Tuna', type:'fish', sub:['deep-sea'], emoji:'🐟', where:'New England, Outer Banks, Gulf', when:'June – November', how:'Trolling, chunking, jigging', diff:4, desc:'Monster fish topping 1,000 lbs. As seen on Wicked Tuna.', g:['#1e1b4b','#6366f1'] },
  { id:12, name:'Mahi-Mahi', type:'fish', sub:['deep-sea','spin'], emoji:'🐠', where:'South Florida, Gulf, Hawaii', when:'April – September', how:'Trolling, casting, live bait', diff:2, desc:'Dazzling colors and aggressive strikes. Delicious to eat.', g:['#065f46','#fbbf24'] },
  { id:13, name:'Walleye', type:'fish', sub:['spin'], emoji:'🐟', where:'Great Lakes, Minnesota, Wisconsin', when:'Spring & Fall', how:'Jigging, trolling, live bait', diff:2, desc:'America\'s favorite eating fish. Lake Erie is the mecca.', g:['#422006','#a16207'] },
  { id:14, name:'Halibut', type:'fish', sub:['deep-sea','spin'], emoji:'🐟', where:'Alaska, Pacific NW', when:'May – September', how:'Bottom fishing, herring, jigs', diff:3, desc:'Barn doors of the sea. Alaska halibut over 100 lbs.', g:['#44403c','#78716c'] },
  { id:15, name:'Snook', type:'fish', sub:['spin','fly'], emoji:'🐟', where:'Florida (both coasts)', when:'Year-round (peak: Summer)', how:'Live bait, topwater, fly', diff:3, desc:'Prized inshore species. Drag-screaming runs around mangroves.', g:['#064e3b','#6ee7b7'] },
  { id:20, name:'Elk', type:'hunt', sub:['bow','gun'], emoji:'🦌', where:'Colorado, Montana, Wyoming, Idaho', when:'Sep – Nov (rut: Sep)', how:'Calling, spot & stalk, stand', diff:4, desc:'The Monarch of the West. Bull elk bugling during rut is the ultimate experience.', g:['#78350f','#d97706'] },
  { id:21, name:'Whitetail Deer', type:'hunt', sub:['bow','gun'], emoji:'🦌', where:'Nationwide (peak: Midwest, South)', when:'Oct – Jan (rut: Nov)', how:'Stand hunting, still hunting, rattling', diff:2, desc:'America\'s #1 game animal. The November rut is unforgettable.', g:['#92400e','#fbbf24'] },
  { id:22, name:'Mule Deer', type:'hunt', sub:['bow','gun'], emoji:'🦌', where:'Wyoming, Colorado, Montana, Utah', when:'Oct – Nov', how:'Spot & stalk, glassing', diff:3, desc:'Emblematic of the American West. Wide, forked antlers.', g:['#713f12','#eab308'] },
  { id:23, name:'Pronghorn', type:'hunt', sub:['gun','bow'], emoji:'🦌', where:'Wyoming, Montana, Colorado', when:'Aug – Oct', how:'Spot & stalk, decoys, blinds', diff:2, desc:'Fastest land animal in North America. Wide-open prairie hunts.', g:['#a16207','#fde68a'] },
  { id:24, name:'Moose', type:'hunt', sub:['gun','bow'], emoji:'🦌', where:'Alaska, Maine, Montana, Wyoming', when:'Sep – Nov', how:'Calling, canoe hunts, spot & stalk', diff:4, desc:'North America\'s largest game animal at 1,800+ lbs.', g:['#1c1917','#57534e'] },
  { id:25, name:'Black Bear', type:'hunt', sub:['gun','bow'], emoji:'🐻', where:'Alaska, Idaho, Montana, NC, PA', when:'Spring & Fall', how:'Spot & stalk, bait, hounds', diff:3, desc:'Widely available and incredibly exciting.', g:['#1f2937','#4b5563'] },
  { id:26, name:'Wild Turkey', type:'hunt', sub:['gun','bow'], emoji:'🦃', where:'Nationwide (peak: Southeast, Midwest)', when:'Spring (Apr – May)', how:'Calling, decoys, ground blinds', diff:2, desc:'Spring gobbler season is an American tradition.', g:['#7c2d12','#ea580c'] },
  { id:27, name:'Pheasant', type:'hunt', sub:['gun'], emoji:'🐦', where:'South Dakota, Kansas, Iowa', when:'Oct – Jan', how:'Upland walk, pointing dogs', diff:1, desc:'Classic American upland bird. Birds flushing in every field.', g:['#854d0e','#facc15'] },
  { id:28, name:'Mallard Duck', type:'hunt', sub:['gun'], emoji:'🦆', where:'Mississippi Flyway, Arkansas, Louisiana', when:'Nov – Jan', how:'Decoys, calling, flooded timber', diff:2, desc:'Greenheads cupping into your decoys is waterfowling heaven.', g:['#134e4a','#2dd4bf'] },
  { id:29, name:'Wild Hog', type:'hunt', sub:['gun','bow'], emoji:'🐗', where:'Texas, Florida, Georgia, Louisiana', when:'Year-round (no season)', how:'Spot & stalk, dogs, night hunts', diff:1, desc:'No bag limits, no season—pure action year-round.', g:['#44403c','#a8a29e'] },
  { id:30, name:'Dove', type:'hunt', sub:['gun'], emoji:'🐦', where:'Texas, Arizona, Southeast', when:'Sep – Oct', how:'Pass shooting, field hunting', diff:1, desc:'September dove opener is America\'s most popular tradition.', g:['#78716c','#d6d3d1'] },
];

export function getAvailableDaysInRange(guide: Guide, startDate: Date, endDate: Date): Set<string> {
  const available = new Set<string>();
  for (const window of guide.availability) {
    const ws = new Date(window.startDate + 'T00:00:00');
    const we = new Date(window.endDate + 'T00:00:00');
    const current = new Date(Math.max(ws.getTime(), startDate.getTime()));
    const end = new Date(Math.min(we.getTime(), endDate.getTime()));
    while (current <= end) {
      available.add(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
  }
  return available;
}

export function getConditionsForDate(guide: Guide, dateStr: string): AvailabilityWindow | null {
  const d = new Date(dateStr + 'T00:00:00');
  for (const window of guide.availability) {
    const ws = new Date(window.startDate + 'T00:00:00');
    const we = new Date(window.endDate + 'T00:00:00');
    if (d >= ws && d <= we) return window;
  }
  return null;
}

export function countAvailableDays(guide: Guide, monthStart: Date, monthEnd: Date): number {
  return getAvailableDaysInRange(guide, monthStart, monthEnd).size;
}
