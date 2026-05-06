import { useState, useEffect } from "react";
import { Search, MapPin, Star, Calendar, Heart, X, Clock, ChevronRight, Bookmark, ArrowRight, Check, User, Award, Eye, ChevronDown, Target, Crosshair, Fish, TreePine, Sun, Snowflake, Leaf, Flower2 } from "lucide-react";

const FISH_THEME = {
accent: '#0891b2', accentDark: '#155e75', accentLight: '#ecfeff', accentMid: '#a5f3fc',
bg: '#f0f9ff', hero: 'linear-gradient(135deg, #042f3a 0%, #0e6174 40%, #06b6d4 100%)',
cardGlow: '0 2px 20px rgba(8,145,178,0.08)', pill: '#cffafe', pillText: '#155e75',
tagBg: '#ecfeff', tagText: '#0e7490',
};
const HUNT_THEME = {
accent: '#c2410c', accentDark: '#7c2d12', accentLight: '#fff7ed', accentMid: '#fed7aa',
bg: '#fffbf5', hero: 'linear-gradient(135deg, #310a04 0%, #7c2d12 40%, #ea580c 100%)',
cardGlow: '0 2px 20px rgba(194,65,12,0.08)', pill: '#ffedd5', pillText: '#9a3412',
tagBg: '#fff7ed', tagText: '#c2410c',
};

const FISH_LOCATIONS = ['Anywhere','Alaska','Florida Keys','Lake Erie, OH','Lake Okeechobee, FL','Marco Island, FL','Louisiana Marsh','Charleston, SC','Central Florida','Montana Rivers','Gulf of Mexico','Chesapeake Bay','Pacific NW','Outer Banks, NC','San Diego, CA'];
const HUNT_LOCATIONS = ['Anywhere','Colorado Rockies','Montana','Wyoming','Idaho','Texas Hill Country','Southeast US','Kansas Prairies','Alaska','Utah','New Mexico','Black Canyon, CO','SW Montana','Central Texas','Arkansas'];
const SEASONS = [
{label:'Anytime',icon:null,val:'any'},
{label:'Spring',sub:'Mar – May',icon:'🌸',val:'spring'},
{label:'Summer',sub:'Jun – Aug',icon:'☀️',val:'summer'},
{label:'Fall',sub:'Sep – Nov',icon:'🍂',val:'fall'},
{label:'Winter',sub:'Dec – Feb',icon:'❄️',val:'winter'},
];
const EXP_LEVELS = [
{label:'First Timer',desc:'Never done this before',val:'beginner',emoji:'🌱'},
{label:'Intermediate',desc:'Been out a few times',val:'intermediate',emoji:'🎯'},
{label:'Expert',desc:'Seasoned pro',val:'expert',emoji:'🏆'},
{label:'Any Level',desc:'Show me everything',val:'all',emoji:'✨'},
];

const GUIDES = [
{ id:1, name:'Capt. Mark Rose', loc:'Lake Erie, OH', type:'fish', sub:['spin'], species:['Smallmouth Bass','Walleye'], price:'$500/day', rating:4.97, reviews:89, exp:'20+ yrs', bio:'Legendary smallmouth specialist on Lake Erie. Put 18 fish in the boat when others struck out, including trophy 5.9lb and 5.5lb smallmouth.', avail:'Available', catches:[{s:'Smallmouth Bass',d:'5.9 lbs',t:'Oct 2025',g:['#065f46','#10b981']},{s:'Smallmouth Bass',d:'5.5 lbs',t:'Oct 2025',g:['#047857','#34d399']},{s:'Walleye',d:'8.2 lbs',t:'Sep 2025',g:['#1e3a5f','#60a5fa']}], levels:['intermediate','expert'], seasons:['spring','summer','fall'] },
{ id:2, name:'Capt. Dawson', loc:'Lake Okeechobee, FL', type:'fish', sub:['spin'], species:['Largemouth Bass'], price:'$450/day', rating:4.95, reviews:142, exp:'15 yrs', bio:'Professional, prepared, and knows Lake Okeechobee inside and out. Great with kids and beginners. Consistently finds big bass even on tough days.', avail:'Available', catches:[{s:'Largemouth Bass',d:'9.4 lbs',t:'Nov 2025',g:['#14532d','#22c55e']},{s:'Largemouth Bass',d:'7.8 lbs',t:'Oct 2025',g:['#065f46','#10b981']},{s:'Largemouth Bass',d:'8.1 lbs',t:'Sep 2025',g:['#166534','#4ade80']}], levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'] },
{ id:3, name:'Capt. Jason', loc:'Marco Island, FL', type:'fish', sub:['spin','fly'], species:['Redfish','Snook','Tarpon'], price:'$600/day', rating:4.98, reviews:203, exp:'18 yrs', bio:'Incredibly knowledgeable about the 10,000 Islands. Super friendly, great with kids. Offers inshore, eco tours, and sunset trips. One of the best days you\'ll have on water.', avail:'Available', catches:[{s:'Redfish',d:'28 inches',t:'Nov 2025',g:['#7f1d1d','#ef4444']},{s:'Snook',d:'32 inches',t:'Oct 2025',g:['#374151','#9ca3af']},{s:'Tarpon',d:'85 lbs',t:'Sep 2025',g:['#1f2937','#6b7280']}], levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'] },
{ id:4, name:'Capt. Bill Goudy Jr.', loc:'Central FL', type:'fish', sub:['spin'], species:['Largemouth Bass','Catfish','Gar'], price:'$400/day', rating:4.92, reviews:76, exp:'12 yrs', bio:'Takes anglers to great spots in a fast boat. Versatile guide covering bass, catfish, and trophy gar. Fun, memorable trips with groups up to 14.', avail:'Available', catches:[{s:'Largemouth Bass',d:'7.2 lbs',t:'Oct 2025',g:['#14532d','#22c55e']},{s:'Gar',d:'42 inches',t:'Sep 2025',g:['#3f3f46','#a1a1aa']},{s:'Catfish',d:'18 lbs',t:'Aug 2025',g:['#44403c','#a8a29e']}], levels:['beginner','intermediate'], seasons:['spring','summer','fall','winter'] },
{ id:5, name:'Michael Pittman', loc:'Louisiana', type:'fish', sub:['fly'], species:['Redfish','Speckled Trout','Flounder'], price:'$650/day', rating:4.96, reviews:118, exp:'22 yrs', bio:'Orvis-endorsed fly fishing guide in Louisiana. Premier saltwater fly fishing for redfish on the marsh. Expert instruction for all skill levels.', avail:'Limited', catches:[{s:'Redfish',d:'31 inches',t:'Nov 2025',g:['#7f1d1d','#ef4444']},{s:'Speckled Trout',d:'26 inches',t:'Oct 2025',g:['#1e3a5f','#38bdf8']},{s:'Redfish',d:'29 inches',t:'Oct 2025',g:['#991b1b','#f87171']}], levels:['intermediate','expert'], seasons:['spring','fall','winter'] },
{ id:6, name:'Capt. Danny Lynch', loc:'Charleston, SC', type:'fish', sub:['fly'], species:['Tarpon','Redfish','Bonefish'], price:'$700/day', rating:4.94, reviews:95, exp:'16 yrs', bio:'Orvis-endorsed fly fishing guide just 30 minutes from Charleston airport. Specializes in sight-casting to tarpon and redfish on pristine lowcountry flats.', avail:'Next: Mar 2026', catches:[{s:'Tarpon',d:'95 lbs',t:'Jul 2025',g:['#1f2937','#9ca3af']},{s:'Redfish',d:'30 inches',t:'Sep 2025',g:['#7f1d1d','#f87171']},{s:'Redfish',d:'27 inches',t:'Aug 2025',g:['#991b1b','#fca5a5']}], levels:['intermediate','expert'], seasons:['spring','summer','fall'] },
{ id:7, name:'Capt. Patrick & Hank', loc:'Marathon, FL', type:'fish', sub:['deep-sea'], species:['Sailfish','Mahi-Mahi','Tuna'], price:'$1,200/day', rating:4.93, reviews:67, exp:'25 yrs', bio:'Deep sea fishing experts in the Florida Keys. Go above and beyond for an amazing offshore experience. Specialize in sailfish, mahi, and big game pelagics.', avail:'Available', catches:[{s:'Sailfish',d:'68 lbs',t:'Dec 2025',g:['#312e81','#818cf8']},{s:'Mahi-Mahi',d:'32 lbs',t:'Nov 2025',g:['#065f46','#fbbf24']},{s:'Yellowfin Tuna',d:'85 lbs',t:'Oct 2025',g:['#1e1b4b','#6366f1']}], levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'] },
{ id:8, name:'Capt. TJ & Eddie', loc:'South Florida', type:'fish', sub:['deep-sea'], species:['Swordfish','Blue Marlin','Tuna'], price:'$1,800/day', rating:4.91, reviews:54, exp:'20 yrs', bio:'Very knowledgeable and helpful deep sea charter crew. Premium offshore experience targeting the biggest game fish in the Atlantic. Full and half day trips.', avail:'Available', catches:[{s:'Blue Marlin',d:'~350 lbs',t:'Nov 2025',g:['#1e3a5f','#3b82f6']},{s:'Swordfish',d:'180 lbs',t:'Oct 2025',g:['#312e81','#a78bfa']},{s:'Yellowfin Tuna',d:'110 lbs',t:'Sep 2025',g:['#1e1b4b','#818cf8']}], levels:['intermediate','expert'], seasons:['summer','fall','winter'] },
{ id:9, name:'Trevor', loc:'Fairbanks, AK', type:'fish', sub:['spin','fly'], species:['King Salmon','Rainbow Trout','Arctic Char'], price:'$500/day', rating:4.90, reviews:83, exp:'10 yrs', bio:'Excellent Alaska guide with deep local knowledge. Runs ice fishing expeditions in heated cabins and summer salmon trips. Handles mishaps with humor and skill.', avail:'Available', catches:[{s:'King Salmon',d:'42 lbs',t:'Aug 2025',g:['#9f1239','#fb7185']},{s:'Rainbow Trout',d:'24 inches',t:'Jul 2025',g:['#1e40af','#93c5fd']},{s:'Arctic Char',d:'18 inches',t:'Jul 2025',g:['#0c4a6e','#7dd3fc']}], levels:['beginner','intermediate','expert'], seasons:['summer','winter'] },
{ id:10, name:'Capt. Tyler', loc:'St. Augustine, FL', type:'fish', sub:['deep-sea','spin'], species:['Grouper','Red Snapper','Kingfish'], price:'$900/day', rating:4.89, reviews:112, exp:'14 yrs', bio:'St. Augustine deep sea and nearshore specialist. Knows the reefs and wrecks off northeast Florida like the back of his hand. Consistent results year-round.', avail:'Available', catches:[{s:'Grouper',d:'28 lbs',t:'Nov 2025',g:['#422006','#a16207']},{s:'Red Snapper',d:'14 lbs',t:'Oct 2025',g:['#7f1d1d','#dc2626']},{s:'Kingfish',d:'38 lbs',t:'Sep 2025',g:['#1e3a5f','#60a5fa']}], levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'] },
{ id:11, name:'Brian & Brent', loc:'San Luis Valley, CO', type:'hunt', sub:['gun','bow'], species:['Elk','Mule Deer'], price:'$5,500 / 5 days', rating:4.96, reviews:71, exp:'20+ yrs', bio:'Operate one of Colorado\'s top elk hunting outfitters. Hunt private land and Rio Grande National Forest. Deep knowledge of the San Luis Valley and surrounding mountains.', avail:'Available', catches:[{s:'Bull Elk',d:'350+ SCI',t:'Oct 2025',g:['#78350f','#d97706']},{s:'Bull Elk',d:'330 SCI',t:'Sep 2025',g:['#92400e','#f59e0b']},{s:'Mule Deer',d:'170" B&C',t:'Nov 2025',g:['#713f12','#eab308']}], levels:['intermediate','expert'], seasons:['fall'] },
{ id:12, name:'Travis Mitchell', loc:'Colorado / Multi-State', type:'hunt', sub:['gun','bow'], species:['Elk','Mule Deer','Antelope','Black Bear'], price:'$6,000 / 5 days', rating:4.94, reviews:64, exp:'21 yrs', bio:'Wildlife management degree from CSU. Has guided across the US, Mexico, Alaska, Africa, and New Zealand. Holds guide licenses in CO, AK, AZ, and South Africa.', avail:'Limited', catches:[{s:'Bull Elk',d:'380 SCI',t:'Sep 2025',g:['#78350f','#f59e0b']},{s:'Mule Deer',d:'185" B&C',t:'Oct 2025',g:['#713f12','#fbbf24']},{s:'Black Bear',d:'350 lbs',t:'Jun 2025',g:['#1f2937','#4b5563']}], levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall'] },
{ id:13, name:'Dale & Tara', loc:'Idaho / Montana', type:'hunt', sub:['gun','bow'], species:['Elk','Mule Deer','Whitetail','Moose','Bear','Turkey'], price:'$4,500 / 5 days', rating:4.95, reviews:156, exp:'47 yrs', bio:'Professional outfitters since 1977. Hunt areas across Idaho, Montana, Utah, and Washington. Known for building lasting friendships—most clients return for 5 to 20+ years.', avail:'Available', catches:[{s:'Bull Elk',d:'340 SCI',t:'Oct 2025',g:['#78350f','#d97706']},{s:'Whitetail',d:'155" B&C',t:'Nov 2025',g:['#92400e','#fbbf24']},{s:'Moose',d:'48" spread',t:'Sep 2025',g:['#1c1917','#57534e']}], levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'] },
{ id:14, name:'North Rim Trophy Hunts', loc:'Black Canyon, CO', type:'hunt', sub:['gun','bow'], species:['Elk','Mule Deer'], price:'$7,500 / 5 days', rating:4.98, reviews:48, exp:'25 yrs', bio:'100% trophy elk success rate in 2024 & 2025. All-inclusive hunts with one price for any size bull. Average bull scores over 350 SCI with several over 400 each year.', avail:'Limited', catches:[{s:'Bull Elk',d:'419 SCI',t:'Oct 2025',g:['#78350f','#f59e0b']},{s:'Bull Elk',d:'400+ SCI',t:'Sep 2025',g:['#92400e','#fbbf24']},{s:'Mule Deer',d:'190" B&C',t:'Nov 2025',g:['#713f12','#eab308']}], levels:['intermediate','expert'], seasons:['fall'] },
{ id:15, name:'Chris & Alex', loc:'Southeast US', type:'hunt', sub:['gun','bow'], species:['Whitetail Deer','Wild Turkey','Waterfowl'], price:'$2,500 / 3 days', rating:4.91, reviews:87, exp:'7 yrs', bio:'Lifelong hunters with a great local reputation. Started as friends who built a premier outfitting operation. Quality hunts for deer, turkey, and waterfowl.', avail:'Available', catches:[{s:'Whitetail',d:'162" B&C',t:'Nov 2025',g:['#92400e','#fbbf24']},{s:'Wild Turkey',d:'22 lb Tom',t:'Apr 2025',g:['#7c2d12','#ea580c']},{s:'Mallard',d:'Limit',t:'Dec 2025',g:['#134e4a','#2dd4bf']}], levels:['beginner','intermediate','expert'], seasons:['spring','fall','winter'] },
{ id:16, name:'Stuart', loc:'Kansas', type:'hunt', sub:['gun'], species:['Pheasant','Quail','Waterfowl'], price:'$1,500 / 3 days', rating:4.93, reviews:102, exp:'22 yrs', bio:'Featured on Wingshooting TV and American Bird Hunter. Over two decades of upland and waterfowl guiding experience in prime Kansas flyway territory.', avail:'Available', catches:[{s:'Pheasant',d:'Limit',t:'Nov 2025',g:['#78350f','#d97706']},{s:'Quail',d:'Limit',t:'Dec 2025',g:['#92400e','#f59e0b']},{s:'Mallard',d:'Limit',t:'Jan 2026',g:['#134e4a','#14b8a6']}], levels:['beginner','intermediate','expert'], seasons:['fall','winter'] },
{ id:17, name:'Stockton Outfitters', loc:'SW Montana', type:'hunt', sub:['bow','gun'], species:['Elk','Mule Deer','Black Bear'], price:'$5,250 / 5 days', rating:4.92, reviews:91, exp:'30+ yrs', bio:'Montana hunting outfitter. Archery season features expert callers bringing trophy bulls to 10-30 yards. Multiple Pope & Young records taken from camp. Biggest bull: 419 gross.', avail:'Available', catches:[{s:'Bull Elk',d:'390 SCI',t:'Sep 2025',g:['#78350f','#f59e0b']},{s:'Mule Deer',d:'175" B&C',t:'Oct 2025',g:['#713f12','#eab308']},{s:'Black Bear',d:'6\' 2"',t:'May 2025',g:['#1f2937','#6b7280']}], levels:['intermediate','expert'], seasons:['spring','fall'] },
{ id:18, name:'Blake', loc:'Central Texas', type:'hunt', sub:['gun','bow'], species:['Whitetail Deer','Wild Turkey','Hog'], price:'$2,000 / 3 days', rating:4.88, reviews:63, exp:'10 yrs', bio:'Avid outdoorsman and father of 5 who loves sharing memorable hunting experiences. Specializes in Texas whitetail and turkey on well-managed private ranches.', avail:'Available', catches:[{s:'Whitetail',d:'148" B&C',t:'Nov 2025',g:['#92400e','#fbbf24']},{s:'Wild Turkey',d:'24 lb Tom',t:'Apr 2025',g:['#7c2d12','#ea580c']},{s:'Hog',d:'280 lbs',t:'Aug 2025',g:['#44403c','#a8a29e']}], levels:['beginner','intermediate','expert'], seasons:['spring','summer','fall','winter'] },
];

const SPECIES = [
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

export default function HuntFish() {
const [mode, setMode] = useState('fish');
const [tab, setTab] = useState('explore');
const [sub, setSub] = useState('all');
const [search, setSearch] = useState('');
const [selectedGuide, setSelectedGuide] = useState(null);
const [favGuides, setFavGuides] = useState(new Set());
const [savedSpecies, setSavedSpecies] = useState(new Set());
const [bookingMsg, setBookingMsg] = useState(false);
const [loaded, setLoaded] = useState(false);

const [where, setWhere] = useState('Anywhere');
const [when, setWhen] = useState('any');
const [expLevel, setExpLevel] = useState('all');
const [showResults, setShowResults] = useState(false);
const [activePanel, setActivePanel] = useState(null);
const [speciesSearch, setSpeciesSearch] = useState('');

useEffect(() => {
const l = document.createElement('link');
l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap';
l.rel = 'stylesheet';
document.head.appendChild(l);
setTimeout(() => setLoaded(true), 100);
}, []);

const theme = mode === 'fish' ? FISH_THEME : HUNT_THEME;
const fishSubs = [['all','All'],['fly','Fly Fishing'],['deep-sea','Deep Sea'],['spin','Spin']];
const huntSubs = [['all','All'],['bow','Bow'],['gun','Gun']];
const subs = mode === 'fish' ? fishSubs : huntSubs;
const locations = mode === 'fish' ? FISH_LOCATIONS : HUNT_LOCATIONS;

const filteredGuides = GUIDES.filter(g => {
if (g.type !== mode) return false;
if (sub !== 'all' && !g.sub.includes(sub)) return false;
if (where !== 'Anywhere' && !g.loc.toLowerCase().includes(where.toLowerCase().split(',')[0].toLowerCase().trim().substring(0,4))) return false;
if (when !== 'any' && !g.seasons.includes(when)) return false;
if (expLevel !== 'all' && !g.levels.includes(expLevel)) return false;
if (speciesSearch && !g.species.some(s => s.toLowerCase().includes(speciesSearch.toLowerCase())) && !g.loc.toLowerCase().includes(speciesSearch.toLowerCase()) && !g.name.toLowerCase().includes(speciesSearch.toLowerCase())) return false;
return true;
});

const filteredSpecies = SPECIES.filter(s => {
if (s.type !== mode) return false;
if (sub !== 'all' && !s.sub.includes(sub)) return false;
if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
return true;
});

const myBucketList = SPECIES.filter(s => savedSpecies.has(s.id));
const toggleFav = (id) => setFavGuides(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
const toggleSave = (id) => setSavedSpecies(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
const findGuidesFor = (speciesName) => { setTab('explore'); setSpeciesSearch(speciesName); setSub('all'); setShowResults(true); };

const handleSearch = () => { setShowResults(true); setActivePanel(null); };
const resetSearch = () => { setShowResults(false); setWhere('Anywhere'); setWhen('any'); setExpLevel('all'); setSpeciesSearch(''); setActivePanel(null); };

const serif = "'Playfair Display', Georgia, serif";
const sans = "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif";

const diffDots = (d) => Array.from({length:5}, (_,i) => (
<span key={i} style={{width:7,height:7,borderRadius:'50%',backgroundColor: i < d ? theme.accent : '#d1d5db',display:'inline-block',marginRight:2,transition:'background-color 0.5s ease'}}/>
));

const seasonLabel = SEASONS.find(s => s.val === when)?.label || 'Anytime';
const expLabel = EXP_LEVELS.find(e => e.val === expLevel)?.label || 'Any Level';

return (
<div style={{fontFamily:sans,backgroundColor:theme.bg,minHeight:'100vh',transition:'background-color 0.6s ease',color:'#1a1a17'}} onClick={()=>activePanel&&setActivePanel(null)}>
<style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } } @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } } @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } } @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.04); } } .fade-up { animation: fadeUp 0.6s ease forwards; opacity:0; } .scale-in { animation: scaleIn 0.3s ease forwards; } .slide-down { animation: slideDown 0.25s ease forwards; } .g-card { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor:pointer; } .g-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; } .heart-btn { transition: transform 0.2s ease; } .heart-btn:hover { transform: scale(1.2); } .pill-btn { transition: all 0.3s ease; } .pill-btn:hover { opacity:0.85; } .search-field { transition: all 0.3s ease; } .search-field:hover { background-color: #f0f0ec !important; } .loc-btn { transition: all 0.15s ease; } .loc-btn:hover { background-color: #f3f4f6 !important; } .season-card { transition: all 0.2s ease; cursor:pointer; } .season-card:hover { transform:scale(1.03); } .exp-card { transition: all 0.2s ease; cursor:pointer; } .exp-card:hover { transform:scale(1.02); } * { box-sizing: border-box; } ::-webkit-scrollbar { height:6px; } ::-webkit-scrollbar-thumb { background:#c1c1b8; border-radius:3px; }`}</style>

  {/* HEADER */}
  <header style={{position:'sticky',top:0,zIndex:100,backgroundColor:'#ffffff',borderBottom:'1px solid #e5e7eb',padding:'0 20px',display:'flex',alignItems:'center',justifyContent:'space-between',height:56,boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
    <div style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}} onClick={resetSearch}>
      <span style={{fontSize:22}}>{mode==='fish'?'🎣':'🎯'}</span>
      <span style={{fontFamily:serif,fontWeight:800,fontSize:21,color:'#1a1a17',letterSpacing:'-0.5px'}}>HuntFish</span>
    </div>
    <div style={{display:'flex',gap:4}}>
      {[['explore','Explore'],['bucketlist','Bucket List']].map(([k,v]) => (
        <button key={k} onClick={()=>{setTab(k);setSearch('');if(k==='explore'){setShowResults(false);setSpeciesSearch('');}}} className="pill-btn" style={{padding:'7px 16px',borderRadius:20,border:'none',cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:sans,backgroundColor:tab===k?theme.accent:'transparent',color:tab===k?'#fff':'#6b7280'}}>
          {v}
          {k==='bucketlist' && savedSpecies.size > 0 && <span style={{marginLeft:5,backgroundColor:tab===k?'rgba(255,255,255,0.3)':theme.accent,color:'#fff',borderRadius:10,padding:'1px 6px',fontSize:10,fontWeight:700}}>{savedSpecies.size}</span>}
        </button>
      ))}
    </div>
    <div style={{width:34,height:34,borderRadius:'50%',backgroundColor:'#f3f4f6',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <User size={16} color="#6b7280"/>
    </div>
  </header>

  {/* HERO */}
  <div style={{background:theme.hero,padding:showResults?'24px 20px 32px':'36px 20px 50px',transition:'all 0.5s ease',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.07) 0%, transparent 60%)'}}/>
    <div style={{maxWidth:800,margin:'0 auto',position:'relative',zIndex:1,textAlign:'center'}}>
      {!showResults && tab==='explore' && (
        <>
          <h1 className={loaded?'fade-up':''} style={{fontFamily:serif,fontSize:'clamp(26px,4.5vw,40px)',fontWeight:800,color:'#fff',margin:'0 0 6px',letterSpacing:'-1px',lineHeight:1.1}}>
            {mode==='fish'?'Find Your Perfect Fishing Guide':'Find Your Perfect Hunting Guide'}
          </h1>
          <p className={loaded?'fade-up':''} style={{color:'rgba(255,255,255,0.7)',fontSize:15,margin:'0 0 24px',animationDelay:'0.1s'}}>
            Top-rated guides across America. Book in minutes.
          </p>
        </>
      )}
      {tab==='bucketlist' && (
        <>
          <h1 className={loaded?'fade-up':''} style={{fontFamily:serif,fontSize:'clamp(26px,4.5vw,40px)',fontWeight:800,color:'#fff',margin:'0 0 6px',letterSpacing:'-1px',lineHeight:1.1}}>
            Your Adventure Bucket List
          </h1>
          <p className={loaded?'fade-up':''} style={{color:'rgba(255,255,255,0.7)',fontSize:15,margin:'0 0 24px',animationDelay:'0.1s'}}>
            Every species. Where, when, and how. Save your dream trips.
          </p>
        </>
      )}

      {/* HUNT / FISH TOGGLE */}
      <div className={loaded?'fade-up':''} style={{display:'inline-flex',backgroundColor:'rgba(0,0,0,0.3)',borderRadius:14,padding:3,gap:3,animationDelay:'0.15s',backdropFilter:'blur(10px)'}}>
        {[['fish','🎣 FISH'],['hunt','🎯 HUNT']].map(([k,v]) => (
          <button key={k} onClick={()=>{setMode(k);setSub('all');setSearch('');setShowResults(false);setWhere('Anywhere');setWhen('any');setExpLevel('all');setSpeciesSearch('');}} className="pill-btn" style={{padding:'11px 32px',borderRadius:11,border:'none',cursor:'pointer',fontSize:15,fontWeight:700,fontFamily:sans,letterSpacing:'0.5px',backgroundColor:mode===k?'#fff':'transparent',color:mode===k?'#1a1a17':'rgba(255,255,255,0.8)',boxShadow:mode===k?'0 2px 8px rgba(0,0,0,0.15)':'none'}}>
            {v}
          </button>
        ))}
      </div>

      {/* SUB-TYPE PILLS */}
      <div className={loaded?'fade-up':''} style={{display:'flex',justifyContent:'center',gap:8,marginTop:14,animationDelay:'0.2s',flexWrap:'wrap'}}>
        {subs.map(([k,v]) => (
          <button key={k} onClick={()=>{setSub(k);if(showResults) setShowResults(true);}} className="pill-btn" style={{padding:'6px 16px',borderRadius:20,border:sub===k?'2px solid #fff':'2px solid rgba(255,255,255,0.25)',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:sans,backgroundColor:sub===k?'rgba(255,255,255,0.2)':'transparent',color:'#fff',backdropFilter:'blur(4px)'}}>
            {v}
          </button>
        ))}
      </div>

      {/* MINI SUMMARY BAR when showing results */}
      {showResults && tab==='explore' && (
        <div className="fade-up" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:8,marginTop:14,flexWrap:'wrap'}}>
          <span style={{color:'rgba(255,255,255,0.6)',fontSize:13}}>{where} · {seasonLabel} · {expLabel}</span>
          <button onClick={resetSearch} style={{background:'rgba(255,255,255,0.2)',border:'none',borderRadius:8,padding:'4px 12px',color:'#fff',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:sans,backdropFilter:'blur(4px)'}}>
            Edit Search
          </button>
        </div>
      )}
    </div>
  </div>

  {/* ========== SEARCH CRITERIA PANEL ========== */}
  {tab === 'explore' && !showResults && (
    <div style={{maxWidth:700,margin:'-28px auto 0',padding:'0 20px',position:'relative',zIndex:30}}>
      <div className={loaded?'fade-up':''} style={{backgroundColor:'#fff',borderRadius:20,boxShadow:'0 8px 40px rgba(0,0,0,0.12)',overflow:'visible',animationDelay:'0.25s',position:'relative'}}>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',position:'relative'}}>
          {/* WHERE */}
          <div onClick={(e)=>{e.stopPropagation();setActivePanel(activePanel==='where'?null:'where');}} className="search-field" style={{padding:'20px 22px',cursor:'pointer',borderRadius:'20px 0 0 0',backgroundColor:activePanel==='where'?'#f9fafb':'#fff',borderRight:'1px solid #f0f0ec',position:'relative'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',marginBottom:6,display:'flex',alignItems:'center',gap:5}}>
              <MapPin size={12} color={theme.accent}/> Where
            </div>
            <div style={{fontSize:15,fontWeight:600,color: where==='Anywhere'?'#9ca3af':'#1a1a17'}}>{where}</div>
          </div>

          {/* WHEN */}
          <div onClick={(e)=>{e.stopPropagation();setActivePanel(activePanel==='when'?null:'when');}} className="search-field" style={{padding:'20px 22px',cursor:'pointer',backgroundColor:activePanel==='when'?'#f9fafb':'#fff',borderRight:'1px solid #f0f0ec'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',marginBottom:6,display:'flex',alignItems:'center',gap:5}}>
              <Calendar size={12} color={theme.accent}/> When
            </div>
            <div style={{fontSize:15,fontWeight:600,color: when==='any'?'#9ca3af':'#1a1a17'}}>{seasonLabel}</div>
          </div>

          {/* EXPERIENCE */}
          <div onClick={(e)=>{e.stopPropagation();setActivePanel(activePanel==='exp'?null:'exp');}} className="search-field" style={{padding:'20px 22px',cursor:'pointer',borderRadius:'0 20px 0 0',backgroundColor:activePanel==='exp'?'#f9fafb':'#fff'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',marginBottom:6,display:'flex',alignItems:'center',gap:5}}>
              <Award size={12} color={theme.accent}/> Experience
            </div>
            <div style={{fontSize:15,fontWeight:600,color: expLevel==='all'?'#9ca3af':'#1a1a17'}}>{expLabel}</div>
          </div>
        </div>

        {/* Species input + search button */}
        <div style={{padding:'0 22px 20px',display:'flex',gap:10,alignItems:'center',borderTop:'1px solid #f0f0ec',paddingTop:16}}>
          <div style={{flex:1,display:'flex',alignItems:'center',gap:8,backgroundColor:'#f7f7f5',borderRadius:12,padding:'10px 14px'}}>
            <Search size={16} color="#9ca3af"/>
            <input value={speciesSearch} onChange={e=>setSpeciesSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSearch()} placeholder={mode==='fish'?'What species? (e.g. Tarpon, Bass, Salmon)':'What species? (e.g. Elk, Whitetail, Turkey)'} style={{border:'none',outline:'none',backgroundColor:'transparent',fontSize:14,fontFamily:sans,width:'100%',color:'#1a1a17'}}/>
            {speciesSearch && <button onClick={()=>setSpeciesSearch('')} style={{border:'none',background:'none',cursor:'pointer',padding:2}}><X size={14} color="#9ca3af"/></button>}
          </div>
          <button onClick={handleSearch} style={{padding:'12px 28px',borderRadius:12,border:'none',background:theme.hero,color:'#fff',cursor:'pointer',fontSize:15,fontWeight:700,fontFamily:sans,boxShadow:'0 4px 16px rgba(0,0,0,0.2)',display:'flex',alignItems:'center',gap:8,whiteSpace:'nowrap',transition:'all 0.5s ease',letterSpacing:'0.2px'}}>
            <Search size={16}/> Find Guides
          </button>
        </div>

        {/* DROPDOWN PANELS */}
        {activePanel === 'where' && (
          <div onClick={e=>e.stopPropagation()} className="slide-down" style={{position:'absolute',top:'100%',left:0,right:0,marginTop:8,backgroundColor:'#fff',borderRadius:16,boxShadow:'0 12px 48px rgba(0,0,0,0.15)',padding:20,zIndex:50,maxHeight:320,overflowY:'auto'}}>
            <p style={{fontSize:12,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',margin:'0 0 12px'}}>Popular {mode==='fish'?'Fishing':'Hunting'} Destinations</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',gap:6}}>
              {locations.map(loc => (
                <button key={loc} className="loc-btn" onClick={()=>{setWhere(loc);setActivePanel(null);}} style={{padding:'10px 14px',borderRadius:10,border:where===loc?`2px solid ${theme.accent}`:'2px solid transparent',backgroundColor:where===loc?theme.accentLight:'#f9fafb',cursor:'pointer',fontSize:13,fontWeight:where===loc?700:500,fontFamily:sans,color:where===loc?theme.accentDark:'#374151',textAlign:'left',display:'flex',alignItems:'center',gap:8}}>
                  <MapPin size={14} color={where===loc?theme.accent:'#9ca3af'}/> {loc}
                </button>
              ))}
            </div>
          </div>
        )}

        {activePanel === 'when' && (
          <div onClick={e=>e.stopPropagation()} className="slide-down" style={{position:'absolute',top:'100%',left:0,right:0,marginTop:8,backgroundColor:'#fff',borderRadius:16,boxShadow:'0 12px 48px rgba(0,0,0,0.15)',padding:20,zIndex:50}}>
            <p style={{fontSize:12,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',margin:'0 0 14px'}}>When do you want to go?</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5, 1fr)',gap:10}}>
              {SEASONS.map(s => (
                <div key={s.val} className="season-card" onClick={()=>{setWhen(s.val);setActivePanel(null);}} style={{padding:'16px 10px',borderRadius:14,border:when===s.val?`2px solid ${theme.accent}`:'2px solid #f0f0ec',backgroundColor:when===s.val?theme.accentLight:'#fff',cursor:'pointer',textAlign:'center'}}>
                  <div style={{fontSize:24,marginBottom:6}}>{s.icon || '🗓️'}</div>
                  <div style={{fontSize:13,fontWeight:700,color:when===s.val?theme.accentDark:'#1a1a17'}}>{s.label}</div>
                  {s.sub && <div style={{fontSize:11,color:'#9ca3af',marginTop:2}}>{s.sub}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activePanel === 'exp' && (
          <div onClick={e=>e.stopPropagation()} className="slide-down" style={{position:'absolute',top:'100%',left:0,right:0,marginTop:8,backgroundColor:'#fff',borderRadius:16,boxShadow:'0 12px 48px rgba(0,0,0,0.15)',padding:20,zIndex:50}}>
            <p style={{fontSize:12,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'1px',margin:'0 0 14px'}}>What's your experience level?</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:10}}>
              {EXP_LEVELS.map(e => (
                <div key={e.val} className="exp-card" onClick={()=>{setExpLevel(e.val);setActivePanel(null);}} style={{padding:'18px 16px',borderRadius:14,border:expLevel===e.val?`2px solid ${theme.accent}`:'2px solid #f0f0ec',backgroundColor:expLevel===e.val?theme.accentLight:'#fff',cursor:'pointer',display:'flex',alignItems:'center',gap:14}}>
                  <div style={{fontSize:28}}>{e.emoji}</div>
                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:expLevel===e.val?theme.accentDark:'#1a1a17'}}>{e.label}</div>
                    <div style={{fontSize:12,color:'#9ca3af',marginTop:1}}>{e.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )}

  {/* MAIN CONTENT */}
  <div style={{maxWidth:1100,margin:'0 auto',padding: (tab==='explore' && !showResults) ? '40px 20px 60px' : '28px 20px 60px'}} onClick={()=>activePanel&&setActivePanel(null)}>

    {/* ========== EXPLORE RESULTS ========== */}
    {tab === 'explore' && showResults && (
      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <h2 style={{fontFamily:serif,fontSize:24,fontWeight:700,margin:0}}>
            {speciesSearch ? `Guides for "${speciesSearch}"` : 'Matching Guides'} <span style={{color:'#9ca3af',fontFamily:sans,fontSize:14,fontWeight:400}}>({filteredGuides.length})</span>
          </h2>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{display:'flex',alignItems:'center',gap:8,backgroundColor:'#fff',borderRadius:10,padding:'6px 12px',border:'1px solid #e5e7eb'}}>
              <Search size={14} color="#9ca3af"/>
              <input value={speciesSearch} onChange={e=>setSpeciesSearch(e.target.value)} placeholder="Filter species..." style={{border:'none',outline:'none',backgroundColor:'transparent',fontSize:13,fontFamily:sans,width:130,color:'#1a1a17'}}/>
            </div>
          </div>
        </div>

        {filteredGuides.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px 20px'}}>
            <div style={{width:64,height:64,borderRadius:'50%',backgroundColor:'#f3f4f6',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
              <Search size={28} color="#d1d5db"/>
            </div>
            <p style={{fontSize:18,fontWeight:700,color:'#374151',margin:'0 0 6px',fontFamily:serif}}>No guides match your criteria</p>
            <p style={{fontSize:14,color:'#9ca3af',margin:'0 0 20px'}}>Try broadening your location, season, or experience level</p>
            <button onClick={resetSearch} style={{padding:'10px 24px',borderRadius:10,border:'none',backgroundColor:theme.accent,color:'#fff',cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:sans}}>
              Edit Search
            </button>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',gap:20}}>
            {filteredGuides.map((g, i) => (
              <div key={g.id} className="g-card fade-up" style={{backgroundColor:'#fff',borderRadius:16,overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',animationDelay:`${i*0.07}s`,border:'1px solid #f0f0ec'}}>
                <div style={{height:170,background:`linear-gradient(135deg, ${g.catches[0]?.g[0]||'#333'} 0%, ${g.catches[0]?.g[1]||'#999'} 100%)`,position:'relative',padding:14,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                      {g.sub.map(s => (
                        <span key={s} style={{backgroundColor:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)',color:'#fff',padding:'3px 10px',borderRadius:12,fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px'}}>{s}</span>
                      ))}
                    </div>
                    <button className="heart-btn" onClick={(e)=>{e.stopPropagation();toggleFav(g.id);}} style={{width:34,height:34,borderRadius:'50%',backgroundColor:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Heart size={16} color="#fff" fill={favGuides.has(g.id)?'#fff':'none'} strokeWidth={2}/>
                    </button>
                  </div>
                  <div style={{display:'flex',gap:5,overflow:'auto',paddingBottom:2}}>
                    {g.catches.slice(0,3).map((c,j) => (
                      <span key={j} style={{backgroundColor:'rgba(0,0,0,0.4)',backdropFilter:'blur(8px)',color:'#fff',padding:'3px 9px',borderRadius:10,fontSize:10,fontWeight:500,whiteSpace:'nowrap'}}>
                        {c.s} · {c.d} · {c.t}
                      </span>
                    ))}
                  </div>
                </div>
                <div onClick={()=>setSelectedGuide(g)} style={{padding:'13px 16px 15px',cursor:'pointer'}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
                    <Star size={13} fill="#f59e0b" color="#f59e0b"/>
                    <span style={{fontSize:14,fontWeight:700}}>{g.rating}</span>
                    <span style={{fontSize:12,color:'#9ca3af'}}>({g.reviews})</span>
                    <span style={{marginLeft:'auto',fontSize:12,fontWeight:600,color:g.avail==='Available'?'#16a34a':g.avail==='Limited'?'#d97706':'#6b7280',display:'flex',alignItems:'center',gap:4}}>
                      <span style={{width:6,height:6,borderRadius:'50%',backgroundColor:g.avail==='Available'?'#16a34a':g.avail==='Limited'?'#d97706':'#9ca3af'}}/>
                      {g.avail}
                    </span>
                  </div>
                  <h3 style={{fontSize:17,fontWeight:700,margin:'0 0 3px',fontFamily:serif}}>{g.name}</h3>
                  <div style={{display:'flex',alignItems:'center',gap:4,color:'#6b7280',fontSize:12,marginBottom:8}}>
                    <MapPin size={12}/> {g.loc} <span style={{color:'#d1d5db'}}>·</span> {g.exp}
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:10}}>
                    {g.species.map(s => (
                      <span key={s} style={{backgroundColor:theme.tagBg,color:theme.tagText,padding:'2px 8px',borderRadius:8,fontSize:11,fontWeight:600,transition:'all 0.5s ease'}}>{s}</span>
                    ))}
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontSize:15,fontWeight:700,color:theme.accent,transition:'color 0.5s ease'}}>{g.price}</span>
                    <span style={{fontSize:12,color:theme.accent,fontWeight:600,display:'flex',alignItems:'center',gap:4,transition:'color 0.5s ease'}}>View Profile <ChevronRight size={14}/></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )}

    {/* ========== EXPLORE INITIAL STATE ========== */}
    {tab === 'explore' && !showResults && (
      <div style={{textAlign:'center',padding:'20px 0'}}>
        <p style={{color:'#9ca3af',fontSize:14,margin:0}}>
          {mode==='fish' ? '🎣 Choose your destination, season, and experience level above to find the perfect guide' : '🎯 Choose your destination, season, and experience level above to find the perfect guide'}
        </p>
        <div style={{display:'flex',justifyContent:'center',gap:20,marginTop:32,flexWrap:'wrap'}}>
          {(mode==='fish' ? [
            {icon:'🐟',label:'Bass Fishing',s:'Largemouth Bass'},
            {icon:'🦈',label:'Deep Sea',s:'Sailfish'},
            {icon:'🎣',label:'Fly Fishing',s:'Rainbow Trout'},
            {icon:'🐟',label:'Salmon',s:'King Salmon'},
          ] : [
            {icon:'🦌',label:'Elk Hunting',s:'Elk'},
            {icon:'🦌',label:'Whitetail',s:'Whitetail'},
            {icon:'🦃',label:'Turkey',s:'Wild Turkey'},
            {icon:'🐦',label:'Bird Hunting',s:'Pheasant'},
          ]).map((q,i) => (
            <div key={i} className="g-card fade-up" onClick={()=>{setSpeciesSearch(q.s);handleSearch();}} style={{width:140,padding:'24px 16px',backgroundColor:'#fff',borderRadius:16,boxShadow:'0 2px 12px rgba(0,0,0,0.06)',textAlign:'center',cursor:'pointer',animationDelay:`${0.3+i*0.08}s`,border:'1px solid #f0f0ec'}}>
              <div style={{fontSize:36,marginBottom:10}}>{q.icon}</div>
              <div style={{fontSize:14,fontWeight:600,color:'#1a1a17'}}>{q.label}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* ========== BUCKET LIST TAB ========== */}
    {tab === 'bucketlist' && (
      <div>
        {myBucketList.length > 0 && (
          <div style={{marginBottom:36}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <Bookmark size={20} color={theme.accent}/>
              <h2 style={{fontFamily:serif,fontSize:22,fontWeight:700,margin:0}}>My Bucket List</h2>
              <span style={{backgroundColor:theme.accent,color:'#fff',borderRadius:12,padding:'2px 10px',fontSize:12,fontWeight:700,transition:'background-color 0.5s ease'}}>{myBucketList.length}</span>
            </div>
            <div style={{display:'flex',gap:14,overflowX:'auto',paddingBottom:10}}>
              {myBucketList.map(sp => (
                <div key={sp.id} style={{minWidth:230,background:`linear-gradient(135deg, ${sp.g[0]}, ${sp.g[1]})`,borderRadius:14,padding:16,color:'#fff',position:'relative',flexShrink:0}}>
                  <button onClick={()=>toggleSave(sp.id)} style={{position:'absolute',top:10,right:10,background:'rgba(0,0,0,0.3)',border:'none',borderRadius:'50%',width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
                    <Check size={12} color="#fff"/>
                  </button>
                  <span style={{fontSize:26}}>{sp.emoji}</span>
                  <h4 style={{fontSize:15,fontWeight:700,margin:'6px 0 3px',fontFamily:serif}}>{sp.name}</h4>
                  <p style={{fontSize:11,opacity:0.85,margin:'0 0 10px'}}>{sp.where}</p>
                  <button onClick={()=>findGuidesFor(sp.name)} style={{display:'flex',alignItems:'center',gap:4,background:'rgba(255,255,255,0.2)',border:'none',borderRadius:8,padding:'5px 11px',color:'#fff',cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:sans,backdropFilter:'blur(4px)'}}>
                    Find a Guide <ArrowRight size={11}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <h2 style={{fontFamily:serif,fontSize:22,fontWeight:700,margin:0}}>
            Discover Adventures <span style={{color:'#9ca3af',fontFamily:sans,fontSize:14,fontWeight:400}}>({filteredSpecies.length})</span>
          </h2>
          <div style={{display:'flex',alignItems:'center',gap:8,backgroundColor:'#fff',borderRadius:10,padding:'6px 12px',border:'1px solid #e5e7eb'}}>
            <Search size={14} color="#9ca3af"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search species..." style={{border:'none',outline:'none',backgroundColor:'transparent',fontSize:13,fontFamily:sans,width:130,color:'#1a1a17'}}/>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:16}}>
          {filteredSpecies.map((sp, i) => (
            <div key={sp.id} className="g-card fade-up" style={{backgroundColor:'#fff',borderRadius:16,overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',animationDelay:`${i*0.05}s`,border:'1px solid #f0f0ec'}}>
              <div style={{height:90,background:`linear-gradient(135deg, ${sp.g[0]}, ${sp.g[1]})`,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',position:'relative'}}>
                <div>
                  <span style={{fontSize:28,display:'block',marginBottom:2}}>{sp.emoji}</span>
                  <h3 style={{fontSize:17,fontWeight:800,color:'#fff',margin:0,fontFamily:serif,textShadow:'0 1px 4px rgba(0,0,0,0.3)'}}>{sp.name}</h3>
                </div>
                <button className="heart-btn" onClick={()=>toggleSave(sp.id)} style={{width:32,height:32,borderRadius:'50%',backgroundColor:savedSpecies.has(sp.id)?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.2)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)',transition:'all 0.3s ease'}}>
                  {savedSpecies.has(sp.id) ? <Check size={14} color={sp.g[0]}/> : <Bookmark size={14} color="#fff"/>}
                </button>
              </div>
              <div style={{padding:'12px 16px 14px'}}>
                <p style={{fontSize:12,color:'#6b7280',margin:'0 0 10px',lineHeight:1.5}}>{sp.desc}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:11,color:'#4b5563'}}>
                  <div style={{display:'flex',alignItems:'flex-start',gap:5}}>
                    <MapPin size={12} color={theme.accent} style={{marginTop:1,flexShrink:0}}/>
                    <span><strong>Where:</strong> {sp.where}</span>
                  </div>
                  <div style={{display:'flex',alignItems:'flex-start',gap:5}}>
                    <Calendar size={12} color={theme.accent} style={{marginTop:1,flexShrink:0}}/>
                    <span><strong>When:</strong> {sp.when}</span>
                  </div>
                  <div style={{display:'flex',alignItems:'flex-start',gap:5}}>
                    <Eye size={12} color={theme.accent} style={{marginTop:1,flexShrink:0}}/>
                    <span><strong>How:</strong> {sp.how}</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:5}}>
                    <Award size={12} color={theme.accent} style={{flexShrink:0}}/>
                    <span style={{display:'flex',alignItems:'center',gap:2}}><strong>Level:</strong> {diffDots(sp.diff)}</span>
                  </div>
                </div>
                <div style={{display:'flex',gap:8,marginTop:12}}>
                  <button onClick={()=>toggleSave(sp.id)} style={{flex:1,padding:'8px 12px',borderRadius:10,border:savedSpecies.has(sp.id)?`2px solid ${theme.accent}`:'2px solid #e5e7eb',backgroundColor:savedSpecies.has(sp.id)?theme.accentLight:'#fff',color:savedSpecies.has(sp.id)?theme.accentDark:'#6b7280',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:sans,display:'flex',alignItems:'center',justifyContent:'center',gap:5,transition:'all 0.3s ease'}}>
                    {savedSpecies.has(sp.id) ? <><Check size={13}/> Saved</> : <><Bookmark size={13}/> Save</>}
                  </button>
                  <button onClick={()=>findGuidesFor(sp.name)} style={{flex:1,padding:'8px 12px',borderRadius:10,border:'none',backgroundColor:theme.accent,color:'#fff',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:sans,display:'flex',alignItems:'center',justifyContent:'center',gap:5,transition:'background-color 0.5s ease'}}>
                    Find Guides <ArrowRight size={13}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>

  {/* ========== GUIDE DETAIL MODAL ========== */}
  {selectedGuide && (
    <div onClick={()=>{setSelectedGuide(null);setBookingMsg(false);}} style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.6)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:20,backdropFilter:'blur(4px)'}}>
      <div onClick={e=>e.stopPropagation()} className="scale-in" style={{backgroundColor:'#fff',borderRadius:20,maxWidth:540,width:'100%',maxHeight:'90vh',overflowY:'auto',position:'relative'}}>
        <div style={{height:190,background:`linear-gradient(135deg, ${selectedGuide.catches[0]?.g[0]||'#333'}, ${selectedGuide.catches[0]?.g[1]||'#999'})`,borderRadius:'20px 20px 0 0',padding:20,display:'flex',flexDirection:'column',justifyContent:'space-between',position:'relative'}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{display:'flex',gap:6}}>
              {selectedGuide.sub.map(s => (
                <span key={s} style={{backgroundColor:'rgba(255,255,255,0.2)',color:'#fff',padding:'4px 12px',borderRadius:12,fontSize:11,fontWeight:600,textTransform:'uppercase',backdropFilter:'blur(8px)'}}>{s}</span>
              ))}
            </div>
            <button onClick={()=>{setSelectedGuide(null);setBookingMsg(false);}} style={{width:34,height:34,borderRadius:'50%',backgroundColor:'rgba(0,0,0,0.3)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <X size={16} color="#fff"/>
            </button>
          </div>
          <div>
            <h2 style={{fontFamily:serif,fontSize:26,fontWeight:800,color:'#fff',margin:'0 0 3px',textShadow:'0 2px 8px rgba(0,0,0,0.3)'}}>{selectedGuide.name}</h2>
            <div style={{display:'flex',alignItems:'center',gap:12,color:'rgba(255,255,255,0.9)',fontSize:13}}>
              <span style={{display:'flex',alignItems:'center',gap:4}}><MapPin size={13}/> {selectedGuide.loc}</span>
              <span style={{display:'flex',alignItems:'center',gap:4}}><Clock size={13}/> {selectedGuide.exp}</span>
            </div>
          </div>
        </div>

        <div style={{padding:'18px 22px 22px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,padding:'10px 14px',backgroundColor:'#f9fafb',borderRadius:12}}>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <Star size={16} fill="#f59e0b" color="#f59e0b"/>
              <span style={{fontSize:18,fontWeight:800}}>{selectedGuide.rating}</span>
              <span style={{color:'#9ca3af',fontSize:12}}>({selectedGuide.reviews} reviews)</span>
            </div>
            <div style={{fontSize:17,fontWeight:800,color:theme.accent}}>{selectedGuide.price}</div>
          </div>

          <p style={{fontSize:14,color:'#4b5563',lineHeight:1.7,margin:'0 0 14px'}}>{selectedGuide.bio}</p>

          <div style={{marginBottom:14}}>
            <h4 style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.5px',margin:'0 0 6px'}}>Specialties</h4>
            <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
              {selectedGuide.species.map(s => (
                <span key={s} style={{backgroundColor:theme.tagBg,color:theme.tagText,padding:'4px 11px',borderRadius:10,fontSize:12,fontWeight:600}}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{marginBottom:14}}>
            <h4 style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.5px',margin:'0 0 6px'}}>Welcome Skill Levels</h4>
            <div style={{display:'flex',gap:5}}>
              {selectedGuide.levels.map(l => (
                <span key={l} style={{backgroundColor:'#f0fdf4',color:'#166534',padding:'3px 10px',borderRadius:10,fontSize:11,fontWeight:600,textTransform:'capitalize'}}>{l}</span>
              ))}
            </div>
          </div>

          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:18,padding:'9px 14px',backgroundColor:selectedGuide.avail==='Available'?'#f0fdf4':'#fffbeb',borderRadius:10}}>
            <span style={{width:8,height:8,borderRadius:'50%',backgroundColor:selectedGuide.avail==='Available'?'#16a34a':'#d97706'}}/>
            <span style={{fontSize:13,fontWeight:600,color:selectedGuide.avail==='Available'?'#166534':'#92400e'}}>
              {selectedGuide.avail==='Available'?'Available — Book now':'Limited availability — Book soon'}
            </span>
          </div>

          <h4 style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.5px',margin:'0 0 8px'}}>Recent Success Stories</h4>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:8,marginBottom:20}}>
            {selectedGuide.catches.map((c,j) => (
              <div key={j} style={{background:`linear-gradient(135deg, ${c.g[0]}, ${c.g[1]})`,borderRadius:12,padding:11,color:'#fff',aspectRatio:'1',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                <div style={{fontSize:10,opacity:0.8,marginBottom:1}}>{c.t}</div>
                <div style={{fontSize:13,fontWeight:700}}>{c.s}</div>
                <div style={{fontSize:11,opacity:0.9}}>{c.d}</div>
              </div>
            ))}
          </div>

          {bookingMsg ? (
            <div style={{backgroundColor:'#f0fdf4',border:'2px solid #86efac',borderRadius:14,padding:18,textAlign:'center'}}>
              <div style={{width:44,height:44,borderRadius:'50%',backgroundColor:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px'}}>
                <Check size={22} color="#fff"/>
              </div>
              <h3 style={{fontFamily:serif,fontSize:18,fontWeight:700,margin:'0 0 4px',color:'#166534'}}>Booking Request Sent!</h3>
              <p style={{fontSize:12,color:'#4b5563',margin:0}}>{selectedGuide.name} will confirm within 24 hours.</p>
            </div>
          ) : (
            <button onClick={()=>setBookingMsg(true)} style={{width:'100%',padding:'15px 20px',borderRadius:14,border:'none',background:theme.hero,color:'#fff',cursor:'pointer',fontSize:15,fontWeight:700,fontFamily:sans,letterSpacing:'0.3px',boxShadow:'0 4px 16px rgba(0,0,0,0.2)',transition:'all 0.5s ease'}}>
              Request Booking — {selectedGuide.price}
            </button>
          )}
        </div>
      </div>
    </div>
  )}
</div>
);
}