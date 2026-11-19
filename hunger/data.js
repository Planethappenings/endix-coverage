// HUNGER pitch data. Creator averages: plain 30-day averages pulled November 18, 2026 (every video counts).
// Ettnix Twitch figures: SullyGnome, last 90 days to November 18, 2026.
var AV = {
  retro: 'https://yt3.ggpht.com/90Sj2UwaIwuNJ79aKOt7JkGMTRKgGinA1NcstCU3GwPCwuPeqSArw2B6z1E754Sy2q6GP2ib=s176-c-k-c0x00ffffff-no-rj',
  cloud: 'https://yt3.ggpht.com/FuMmLDSa4Ooa9DtVScFPp1pK4P18kjR9nY5vQ38CBvCoC8st0HLJucAlXH909jUucjvOngVhyyo=s176-c-k-c0x00ffffff-no-rj',
  gem: 'https://yt3.ggpht.com/t0wekIlzDy2LWG2LLtDUiDa84Te7KyLygjmtO3aXytR23UKD-ofXwtHdxm1wj-pZknyj7mtzyw=s176-c-k-c0x00ffffff-no-rj',
  exp: 'https://yt3.ggpht.com/uSjYOAMNcoJrQOJEJFXLOupitglGU_cBSaDFn96MCjMksM0c2hoAdptilUrpZ9uTdglRcKGi=s176-c-k-c0x00ffffff-no-rj',
  ett: 'https://yt3.googleusercontent.com/ytc/AIdro_lsk32vQTIqc3TBV2QLv4zsAeZBhXAzrbxM_UOCLMGScFI=s176-c-k-c0x00ffffff-no-rj'
};

var HERO = [
  ['Top 20', 'Most watched streamers, latest playtest'],
  ['92 hrs', 'HUNGER streamed by Ettnix in 90 days'],
  ['~258K', 'Estimated views per short round'],
  ['Now', 'Creators available today']
];

var VALUE = [
  { num: 'Top 20', h: 'Ettnix Already Plays HUNGER', t: 'One of the 20 most watched streamers in HUNGER\'s latest playtest, with 92 hours of HUNGER streamed and 15,738 hours watched over the last 90 days.' },
  { num: '~258K', h: 'Estimated Views Per Short Round', t: 'One short from each of our four short-form creators, posted on YouTube, TikTok, Instagram and Facebook, at their current 30-day averages.' },
  { num: '14 Days', h: 'Available Right Now', t: 'Two weeks to Early Access. Our creators can start this week, ahead of the Open Beta on November 27, and be live on launch day.' }
];

var ETTNIX = {
  channel: [['152K', 'Twitch followers'], ['174', 'Average viewers'], ['826', 'Peak viewers'], ['130K', 'Hours watched']],
  hunger: [['92 hrs', 'HUNGER streamed'], ['15,738', 'Hours watched'], ['173', 'Average viewers'], ['341', 'Peak viewers']],
  genre: [['Mistfall Hunter', 331], ['ROB RUN', 196], ['HUNGER', 173], ['WARDOGS', 116]]
};

var CREATORS = [
  {
    country: 'ca', name: 'Retro For The First Time', initials: 'RF', avatar: AV.retro, meta: 'Canada / 244K followers',
    hook: 'Daily gaming news, always on camera. 53 Shorts in the last 30 days.',
    idea: 'Open Beta and launch day news, the moment it happens.',
    stats: [['37K', 'YT Shorts'], ['16K', 'TikTok'], ['9K', 'Instagram'], ['5K', 'Facebook']],
    total: ['67K', 'Per short, all platforms'],
    kit: 'https://july.bio/rftft',
    channels: [['YouTube', 'https://www.youtube.com/@RetroForTheFirstTime'], ['TikTok', 'https://www.tiktok.com/@retroforthefirsttime'], ['Instagram', 'https://www.instagram.com/retroftft'], ['Facebook', 'https://www.facebook.com/profile.php?id=61577469602007']]
  },
  {
    country: 'us', name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: 'United States / 109K followers',
    hook: 'On camera in every video, sharing co-op and PC games with a highly engaged audience. Reels up to 933K views.',
    idea: 'First impressions and chaotic duo and trio runs.',
    stats: [['10K', 'YT Shorts'], ['8K', 'TikTok'], ['33K', 'Instagram'], ['54K', 'Facebook']],
    total: ['104K', 'Per short, all platforms'],
    kit: 'https://july.bio/cloudual',
    channels: [['YouTube', 'https://www.youtube.com/@Cloudual'], ['TikTok', 'https://www.tiktok.com/@cloudual'], ['Instagram', 'https://www.instagram.com/cloudual'], ['Facebook', 'https://www.facebook.com/profile.php?id=61585994548093']]
  },
  {
    country: 'us', name: 'Gem Gaming Network', initials: 'GG', avatar: AV.gem, meta: 'United States / 137K followers',
    hook: 'Game discovery across every genre for a young adult audience, posting daily on four platforms.',
    idea: 'New games to play this December, with HUNGER as the pick.',
    stats: [['9K', 'YT Shorts'], ['13K', 'TikTok'], ['14K', 'Instagram'], ['5K', 'Facebook']],
    total: ['41K', 'Per short, all platforms'],
    kit: 'https://july.bio/gemgamingnetwork',
    channels: [['YouTube', 'https://www.youtube.com/@gemgamingnetwork'], ['TikTok', 'https://www.tiktok.com/@gemgamingnetwork'], ['Instagram', 'https://www.instagram.com/gemgamingnetwork'], ['Facebook', 'https://www.facebook.com/profile.php?id=61587281364461']]
  },
  {
    country: 'au', name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: 'Australia / 194K followers',
    hook: 'Recommendation Shorts that help players find their next game. His Grounded 2 reveal short reached 181K views.',
    idea: 'Hype before launch that turns into wishlists and day one players.',
    stats: [['16K', 'YT Shorts'], ['9K', 'TikTok'], ['20K', 'Instagram'], ['1K', 'Facebook']],
    total: ['45K', 'Per short, all platforms'],
    kit: 'https://july.bio/gamesexplorer',
    channels: [['YouTube', 'https://www.youtube.com/@explorerdotgames'], ['TikTok', 'https://www.tiktok.com/@explorerdotgames'], ['Instagram', 'https://www.instagram.com/explorer.games'], ['Facebook', 'https://www.facebook.com/profile.php?id=100089561127301']]
  }
];

// Example launch budget. Stream hours priced at USD 300; hours watched use Ettnix's 173 average viewers on HUNGER.
var BUDGET = [
  { who: 'Ettnix', what: 'Open Beta stream on Twitch, 4 hours (November 27 to 29)', price: 1200, views: '~700 hours watched' },
  { who: 'Ettnix', what: 'Early Access launch day stream on Twitch, 4 hours (December 3)', price: 1200, views: '~700 hours watched' },
  { who: 'Ettnix', what: 'Launch week stream on Twitch, 4 hours', price: 1200, views: '~700 hours watched' },
  { who: 'Retro For The First Time', what: 'Short on all 4 platforms', price: 2600, views: '~67,000' },
  { who: 'Cloudual', what: 'Short on all 4 platforms', price: 2600, views: '~104,000' },
  { who: 'Gem Gaming Network', what: 'Short on all 4 platforms', price: 2600, views: '~41,000' },
  { who: 'Games Explorer', what: 'Short on all 4 platforms', price: 2600, views: '~45,000' },
  { sub: true, who: 'Organic subtotal', price: 14000, views: '~258,000 views + ~2,100 hours watched' },
  { ads: true, who: 'TikTok Spark Ads (example)', what: 'Gaming interest, men 18 to 35, US and UK. Also the fallback plan.', price: 5000, views: '~330,000 to 500,000' },
  { total: true, who: 'Total', price: 19000, views: '~590K to 760K views' }
];

var METHOD = [
  'Short-form averages: plain average views per video over the last 30 days, pulled on November 18, 2026. Every video counts. Nothing is removed at the top or the bottom. "All platforms" adds up each platform\'s average for one short posted everywhere.',
  'Followers: total across YouTube, TikTok, Instagram, Facebook and Twitch, pulled on November 18, 2026.',
  'Ettnix: Twitch statistics from SullyGnome for the last 90 days up to November 18, 2026. Hours watched for a stream are estimated from his 173 average viewers on HUNGER.',
  'Estimated views are estimates, not guarantees. Single videos and streams can land above or below. Spark Ads ranges use 2026 TikTok benchmarks of USD 10 to 15 per 1,000 impressions.'
];
