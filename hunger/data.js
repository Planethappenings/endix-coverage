// HUNGER pitch data. Creator averages: plain 30-day averages pulled November 18, 2026 (every video counts).
// Ettnix Twitch figures: SullyGnome, last 90 days to November 18, 2026.
var AV = {
  retro: 'https://yt3.ggpht.com/90Sj2UwaIwuNJ79aKOt7JkGMTRKgGinA1NcstCU3GwPCwuPeqSArw2B6z1E754Sy2q6GP2ib=s176-c-k-c0x00ffffff-no-rj',
  cloud: 'https://yt3.ggpht.com/FuMmLDSa4Ooa9DtVScFPp1pK4P18kjR9nY5vQ38CBvCoC8st0HLJucAlXH909jUucjvOngVhyyo=s176-c-k-c0x00ffffff-no-rj',
  gem: 'https://yt3.ggpht.com/t0wekIlzDy2LWG2LLtDUiDa84Te7KyLygjmtO3aXytR23UKD-ofXwtHdxm1wj-pZknyj7mtzyw=s176-c-k-c0x00ffffff-no-rj',
  exp: 'https://yt3.ggpht.com/uSjYOAMNcoJrQOJEJFXLOupitglGU_cBSaDFn96MCjMksM0c2hoAdptilUrpZ9uTdglRcKGi=s176-c-k-c0x00ffffff-no-rj',
  ett: 'https://yt3.googleusercontent.com/ytc/AIdro_lsk32vQTIqc3TBV2QLv4zsAeZBhXAzrbxM_UOCLMGScFI=s176-c-k-c0x00ffffff-no-rj',
  cap: 'https://yt3.googleusercontent.com/ytc/AIdro_lF06n7yXV4O7GDR0xRe2En7-n6X2Mio6ymHT1o8vVdZ-g=s176-c-k-c0x00ffffff-no-rj',
  rage: 'https://yt3.googleusercontent.com/3TlufKydntExNT_c7TULN3BosQs2ClqYTDrLSl_xCF-jhriazbq8XzD9C377agd_PLSjqHdp=s176-c-k-c0x00ffffff-no-rj',
  jaffe: 'https://yt3.googleusercontent.com/FpEKToeTl-YhbfTMINqhrOb1mJv9CFSX2-FMxEpj5jfYmImNbsPBgO4Fv_j-Iw-6hKhVXUN35A=s176-c-k-c0x00ffffff-no-rj'
};

var HERO = [
  ['Top 20', 'Most watched streamers, latest playtest'],
  ['92 hrs', 'HUNGER streamed by Ettnix in 90 days'],
  ['~570K', 'Estimated views around launch'],
  ['8', 'Creators ready for launch day']
];

var VALUE = [
  { num: 'Top 20', h: 'Ettnix Already Plays HUNGER', t: 'One of the 20 most watched streamers in HUNGER\'s latest playtest, with 92 hours of HUNGER streamed and 15,738 hours watched over the last 90 days.' },
  { num: '~570K', h: 'Estimated Views Around Launch', t: 'Five short-form creators on four platforms each, a dedicated RageGamingVideos guide and a David Jaffe session, at their current 30-day averages. Plus Ettnix live.' },
  { num: 'Dec 3', h: 'Ready For Launch Day', t: 'Every creator on the roster is available for HUNGER\'s launch and the weeks after, so the campaign is live the moment Early Access opens.' }
];

var ETTNIX = {
  channel: [['152K', 'Twitch followers'], ['174', 'Average viewers'], ['826', 'Peak viewers'], ['130K', 'Hours watched']],
  hunger: [['92 hrs', 'HUNGER streamed'], ['15,738', 'Hours watched'], ['173', 'Average viewers'], ['341', 'Peak viewers']],
  genre: [['Mistfall Hunter', 331], ['ROB RUN', 196], ['HUNGER', 173], ['WARDOGS', 116]]
};

var CREATORS = [
  {
    group: 'short', country: 'uk', name: 'Captain Eggcellent', initials: 'CE', avatar: AV.cap, meta: 'United Kingdom / 1.6M followers',
    hook: 'The Easter egg king. Shorts that reach 237K views on average across four platforms, with single videos up to 2M.',
    idea: 'Hidden details and secrets in HUNGER\'s plague-ravaged Europe.',
    stats: [['48K', 'YT Shorts'], ['56K', 'TikTok'], ['105K', 'Instagram'], ['28K', 'Facebook']],
    total: ['237K', 'Per short, all platforms'],
    kit: 'https://july.bio/CaptainEggcellent',
    channels: [['YouTube', 'https://www.youtube.com/@captaineggcellentbutshorter'], ['TikTok', 'https://www.tiktok.com/@captaineggcellent'], ['Instagram', 'https://www.instagram.com/captaineggcellent/'], ['Facebook', 'https://www.facebook.com/captaineggcellent']]
  },
  {
    group: 'short', country: 'ca', name: 'Retro For The First Time', initials: 'RF', avatar: AV.retro, meta: 'Canada / 244K followers',
    hook: 'Daily gaming news, always on camera. 53 Shorts in the last 30 days.',
    idea: 'Launch day news, the moment Early Access opens.',
    stats: [['37K', 'YT Shorts'], ['16K', 'TikTok'], ['9K', 'Instagram'], ['5K', 'Facebook']],
    total: ['67K', 'Per short, all platforms'],
    kit: 'https://july.bio/rftft',
    channels: [['YouTube', 'https://www.youtube.com/@RetroForTheFirstTime'], ['TikTok', 'https://www.tiktok.com/@retroforthefirsttime'], ['Instagram', 'https://www.instagram.com/retroftft'], ['Facebook', 'https://www.facebook.com/profile.php?id=61577469602007']]
  },
  {
    group: 'short', country: 'us', name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: 'United States / 109K followers',
    hook: 'On camera in every video, sharing co-op and PC games with a highly engaged audience. Reels up to 933K views.',
    idea: 'First impressions and chaotic duo and trio runs.',
    stats: [['10K', 'YT Shorts'], ['8K', 'TikTok'], ['33K', 'Instagram'], ['54K', 'Facebook']],
    total: ['104K', 'Per short, all platforms'],
    kit: 'https://july.bio/cloudual',
    channels: [['YouTube', 'https://www.youtube.com/@Cloudual'], ['TikTok', 'https://www.tiktok.com/@cloudual'], ['Instagram', 'https://www.instagram.com/cloudual'], ['Facebook', 'https://www.facebook.com/profile.php?id=61585994548093']]
  },
  {
    group: 'short', country: 'us', name: 'Gem Gaming Network', initials: 'GG', avatar: AV.gem, meta: 'United States / 137K followers',
    hook: 'Game discovery across every genre for a young adult audience, posting daily on four platforms.',
    idea: 'New games to play this December, with HUNGER as the pick.',
    stats: [['9K', 'YT Shorts'], ['13K', 'TikTok'], ['14K', 'Instagram'], ['5K', 'Facebook']],
    total: ['41K', 'Per short, all platforms'],
    kit: 'https://july.bio/gemgamingnetwork',
    channels: [['YouTube', 'https://www.youtube.com/@gemgamingnetwork'], ['TikTok', 'https://www.tiktok.com/@gemgamingnetwork'], ['Instagram', 'https://www.instagram.com/gemgamingnetwork'], ['Facebook', 'https://www.facebook.com/profile.php?id=61587281364461']]
  },
  {
    group: 'short', country: 'au', name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: 'Australia / 194K followers',
    hook: 'Recommendation Shorts that help players find their next game. His Grounded 2 reveal short reached 181K views.',
    idea: 'The next game to play if you love extraction shooters, turning launch hype into players.',
    stats: [['16K', 'YT Shorts'], ['9K', 'TikTok'], ['20K', 'Instagram'], ['1K', 'Facebook']],
    total: ['45K', 'Per short, all platforms'],
    kit: 'https://july.bio/gamesexplorer',
    channels: [['YouTube', 'https://www.youtube.com/@explorerdotgames'], ['TikTok', 'https://www.tiktok.com/@explorerdotgames'], ['Instagram', 'https://www.instagram.com/explorer.games'], ['Facebook', 'https://www.facebook.com/profile.php?id=100089561127301']]
  },
  {
    group: 'long', country: 'uk', name: 'RageGamingVideos', initials: 'RG', avatar: AV.rage, meta: 'United Kingdom / 1.42M followers',
    hook: 'One of YouTube\'s go-to guide channels for big PC and console games, with 88 videos in the last 30 days. His Grounded 2 and Starfield launch guides passed 100K views each.',
    idea: 'Best start, builds and mistakes to avoid: the guides players search for in the first weeks of Early Access.',
    stats: [['73K', 'YouTube']],
    total: ['73K', 'Per long-form video'],
    kit: 'https://july.bio/ragegamingvideos',
    channels: [['YouTube', 'https://www.youtube.com/@RageGamingVideos']]
  },
  {
    group: 'long', country: 'us', name: 'David Jaffe', initials: 'DJ', avatar: AV.jaffe, meta: 'San Diego, California / 66K followers',
    hook: 'Creator of God of War and co-creator of Twisted Metal. An older, hardcore audience that listens when he talks about a game.',
    idea: 'A live session with a game designer\'s take on HUNGER, kept as a VOD on YouTube.',
    stats: [['5K', 'YouTube'], ['2K', 'Instagram'], ['500', 'TikTok']],
    total: ['8K', 'Per video, all platforms'],
    kit: 'https://july.bio/davidjaffe',
    channels: [['YouTube', 'https://www.youtube.com/@DavidJaffeGames'], ['Twitch', 'https://www.twitch.tv/jaffegamesontwitch'], ['TikTok', 'https://www.tiktok.com/@gabbinandgames'], ['Instagram', 'https://www.instagram.com/davidscottjaffe/']]
  }
];

var SHORT_SUM = [['~494K', 'Estimated views per round'], ['2.3M', 'Followers combined'], ['20', 'Posts per round, 5 creators on 4 platforms']];

// Example launch budget. Stream hours priced at USD 300; hours watched use Ettnix's 173 average viewers on HUNGER.
// Ettnix: Option A = 2 streams x 4 hours, Option B = 7 days x 4 hours retainer.
var BUDGET = [
  { tag: 'Option A', who: 'Ettnix', what: 'Two streams on Twitch, 4 hours each: launch day (December 3) and one more in launch week. 8 hours in total.', price: 2400, views: '~1,400 hours watched' },
  { tag: 'Option B', who: 'Ettnix', what: 'Launch week retainer: live on Twitch 4 hours every day for 7 days from December 3, 28 hours in total. We are also open to other retainers over time, for example weekly streams through Early Access.', price: 8400, views: '~4,800 hours watched' },
  { who: 'RageGamingVideos', what: '1 dedicated long-form YouTube guide', price: 7000, views: '~73,000' },
  { who: 'David Jaffe', what: '1 hour live stream plus VOD', price: 2500, views: '~5,000 VOD views' },
  { who: 'Captain Eggcellent', what: 'Short on YouTube, TikTok, Instagram and Facebook', price: 6500, views: '~237,000' },
  { who: 'Retro For The First Time', what: 'Short on YouTube, TikTok, Instagram and Facebook', price: 2600, views: '~67,000' },
  { who: 'Cloudual', what: 'Short on YouTube, TikTok, Instagram and Facebook', price: 2600, views: '~104,000' },
  { who: 'Gem Gaming Network', what: 'Short on YouTube, TikTok, Instagram and Facebook', price: 2600, views: '~41,000' },
  { who: 'Games Explorer', what: 'Short on YouTube, TikTok, Instagram and Facebook', price: 2600, views: '~45,000' },
  { sub: true, who: 'Organic subtotal', what: 'Option A / Option B', price: '28,800 / 34,800', views: '~572,000 views + ~1,400 / ~4,800 hours watched' },
  { ads: true, who: 'TikTok Spark Ads (example)', what: 'Gaming interest, men 18 to 35, US and UK. Also the fallback plan.', price: 5000, views: '~330,000 to 500,000' },
  { total: true, who: 'Total', what: 'Option A / Option B', price: '33,800 / 39,800', views: '~900K to 1.07M views' }
];

var METHOD = [
  'Creator averages: plain average views per video over the last 30 days, pulled on November 18, 2026. Every video counts. Nothing is removed at the top or the bottom. "All platforms" adds up each platform\'s average for one short posted everywhere.',
  'Followers: total across YouTube, TikTok, Instagram, Facebook and Twitch, pulled on November 18, 2026.',
  'Ettnix: Twitch statistics from SullyGnome for the last 90 days up to November 18, 2026. Hours watched for a stream are estimated from his 173 average viewers on HUNGER.',
  'Estimated views are estimates, not guarantees. Single videos and streams can land above or below. Spark Ads ranges use 2026 TikTok benchmarks of USD 10 to 15 per 1,000 impressions.'
];
