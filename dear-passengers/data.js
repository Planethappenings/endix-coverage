// Dear Passengers pitch data.
// Friendslop history: each channel's full YouTube upload history (co-op and multiplayer videos), plus the creators'
// latest ~250 TikTok and Instagram posts, pulled November 25, 2026. Where the same short was posted on several
// platforms, the views are added up. Creator averages: plain 30-day averages pulled November 18, 2026.
var AV = {
  retro: 'https://yt3.ggpht.com/90Sj2UwaIwuNJ79aKOt7JkGMTRKgGinA1NcstCU3GwPCwuPeqSArw2B6z1E754Sy2q6GP2ib=s176-c-k-c0x00ffffff-no-rj',
  cloud: 'https://yt3.ggpht.com/FuMmLDSa4Ooa9DtVScFPp1pK4P18kjR9nY5vQ38CBvCoC8st0HLJucAlXH909jUucjvOngVhyyo=s176-c-k-c0x00ffffff-no-rj',
  gem: 'https://yt3.ggpht.com/t0wekIlzDy2LWG2LLtDUiDa84Te7KyLygjmtO3aXytR23UKD-ofXwtHdxm1wj-pZknyj7mtzyw=s176-c-k-c0x00ffffff-no-rj',
  exp: 'https://yt3.ggpht.com/uSjYOAMNcoJrQOJEJFXLOupitglGU_cBSaDFn96MCjMksM0c2hoAdptilUrpZ9uTdglRcKGi=s176-c-k-c0x00ffffff-no-rj',
  cap: 'https://yt3.googleusercontent.com/ytc/AIdro_lF06n7yXV4O7GDR0xRe2En7-n6X2Mio6ymHT1o8vVdZ-g=s176-c-k-c0x00ffffff-no-rj'
};

var HERO = [
  ['29.2M', 'Views on one co-op short by Cloudual'],
  ['63M', 'Views on the 26 co-op videos on this page'],
  ['500+', 'Co-op videos on their YouTube channels alone'],
  ['~494K', 'Estimated views per round']
];

var VALUE = [
  { num: '500+', h: 'Friendslop Is Their Home Turf', t: 'Gem Gaming Network, Games Explorer and Cloudual have posted more than 500 co-op and multiplayer videos on YouTube alone, and the same shorts go out on TikTok, Instagram and Facebook.' },
  { num: '29.2M', h: 'They Know What Goes Viral', t: 'Cloudual\'s co-op party game short reached 29.2M views across platforms. Gem has eight co-op shorts above 1.9M, Games Explorer four above 750K.' },
  { num: 'July 26', h: 'Already Covering Dear Passengers', t: 'Cloudual posted "You\'re Running the Worst Airline Ever" twelve days after the reveal. Nobody asked him to.' }
];

var FANS = [
  {
    name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: 'United States / 109K followers',
    nums: [['255', 'Co-op videos on YouTube'], ['29.2M', 'Best co-op short, all platforms'], ['4.1M', 'YouTube views on co-op'], ['Jul 26', 'Covered Dear Passengers']],
    quote: 'Co-op and party games are the core of the channel: hide and seek, prop hunt, horror and building games with friends, always on camera. He already covered Dear Passengers, two airline and flight attendant co-op games, and an aircraft rage game.',
    games: [['Co-op and party', 229], ['Lethal-likes', 10], ['Overcooked-likes', 7], ['Airplane games', 3], ['Dear Passengers', 1]],
    vids: [
      { yt: 'S12JZkUXM9g', url: 'https://www.instagram.com/reel/DY2EQx8mg83/', t: 'You Literally Paint Yourself To Survive Co-op With Friends', views: 29217438, d: 'May 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: 'UOITuAR_R5s', url: 'https://www.instagram.com/reel/DYmnlG_Aha_/', t: 'The NEW Co-Op Horror Game Where You Can\'t Even Hear Your Friends', views: 1460893, d: 'May 2026', on: 'YouTube + Instagram' },
      { yt: 'WHIKhk4mx58', url: 'https://www.instagram.com/reel/DeMsArrCiIk/', t: 'This Co-Op Space Sandbox Lets You Build a Ship From Nothing', views: 894887, d: 'Oct 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: 'D9NMWcXQhvE', url: 'https://www.instagram.com/reel/DbEDwdXgGhH/', t: 'New Co-op Survival Game Solves The Biggest Issue in Open-World Games', views: 680593, d: 'Jul 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: 'abZilGeZYpg', url: 'https://youtu.be/abZilGeZYpg', t: 'Steam\'s New Multiplayer Co-op Draw Your Weapon FPS Has 250K Wishlists', views: 551868, d: 'Sep 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: 'wT_wRq4nRXA', url: 'https://www.instagram.com/reel/DcvwLMBCa8V/', t: 'Dumb Ways to Die Just Showed A NEW Co-op Game about Construction', views: 442008, d: 'Sep 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: '7mGS2iDfcMk', url: 'https://www.instagram.com/reel/Dc6qxeGjzUM/', t: 'This Co-Op Cave Climbing Game was Built BY Cavers', views: 366832, d: 'Sep 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: 'o34BspC1O10', url: 'https://www.tiktok.com/@cloudual/video/7687231623053495566', t: 'You DON\'T Want to Miss These Free Co-op Demos', views: 358352, d: 'Sep 2026', on: 'YouTube + TikTok' },
      { yt: 'NZQMIq0Hzb8', url: 'https://youtu.be/NZQMIq0Hzb8', t: 'You\'re Running the Worst Airline Ever (Dear Passengers)', views: 23117, d: 'Jul 2026', on: 'YouTube', dp: true }
    ]
  },
  {
    name: 'Gem Gaming Network', initials: 'GG', avatar: AV.gem, meta: 'United States / 137K followers',
    nums: [['192', 'Co-op videos on YouTube'], ['4.5M', 'Best co-op short, all platforms'], ['8', 'Co-op shorts above 1.9M'], ['22.3M', 'Views on the 8 shown']],
    quote: '"NEW Funny Co-op Game" is practically the channel\'s format: a new friendslop game every few days, with the hook in the first second. Several of the biggest were paid partnerships, so studios already see the results.',
    games: [['Co-op and party', 178], ['R.E.P.O.-likes', 4], ['Fall Guys-likes', 2], ['Airplane games', 2], ['Gang Beasts-likes', 1]],
    vids: [
      { url: 'https://www.instagram.com/reel/DYm0ubAupG0/', t: 'This Co-op Game Might Get Canceled (Agents 404)', views: 4529935, d: 'May 2026', on: 'TikTok + Instagram', tile: 'Agents 404' },
      { yt: 'esmUeccv_5Q', url: 'https://www.tiktok.com/@gemgamingnetwork/video/7603114399083072799', t: 'Sneak Into People\'s Houses as Fragile Gnomes (Burglin\' Gnomes)', views: 3434382, d: 'Feb 2026', on: 'YouTube + TikTok' },
      { yt: 'v8YSGxP63S4', url: 'https://www.instagram.com/reel/DYUzP6IBCfe/', t: 'Survive the End of the World by Making It to the Moon', views: 3188780, d: 'May 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: 'BFcN48bs37M', url: 'https://www.instagram.com/reel/DaLlAZtJMe7/', t: 'Play as Horrible Night Shift Doctors', views: 2645506, d: 'Jun 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: 'J6kdITQTTLY', url: 'https://www.tiktok.com/@gemgamingnetwork/video/7642749696657689886', t: 'Build a Car Dealership From Scratch With Your Friends', views: 2532862, d: 'May 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: 'AB9bpF8L5s0', url: 'https://www.instagram.com/reel/DXPmWiwhYuv/', t: 'Play as Stupid Construction Workers (Commie Bobrs)', views: 2058165, d: 'Apr 2026', on: 'YouTube + Instagram' },
      { yt: 'xeke_44Vfts', url: 'https://www.instagram.com/reel/DWrVg40BrWs/', t: 'Perfect Co-op Game to Play While Drunk (Friendly Steps)', views: 1970517, d: 'Apr 2026', on: 'YouTube + Instagram' },
      { yt: '07PvBhq8kc0', url: 'https://www.instagram.com/reel/DZI8Ro8h1g-/', t: 'Play a Cursed Board Game With Friends', views: 1965727, d: 'Jun 2026', on: 'YouTube + TikTok + Instagram' }
    ]
  },
  {
    name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: 'Australia / 194K followers',
    nums: [['57', 'Co-op videos on YouTube'], ['2.3M', 'Best co-op short, all platforms'], ['1.6M', 'YouTube views on co-op'], ['6.5M', 'Views on the 9 shown']],
    quote: 'Recommendation Shorts that tell players which co-op game to wishlist next: "It\'s REPO & Content Warning but in VR", "A Lethal-like that\'s finally doing something different". Built for the weeks before a launch.',
    games: [['Co-op and party', 34], ['R.E.P.O.-likes', 6], ['Overcooked-likes', 4], ['Content Warning-likes', 3], ['Lethal-likes', 2]],
    vids: [
      { yt: '1cWcDX-tfoA', url: 'https://www.tiktok.com/@explorerdotgames/video/7613183954761305364', t: 'We Are So Cooked: a Funny and Chaotic Game Coming This Year', views: 2329379, d: 'Mar 2026', on: 'YouTube + TikTok' },
      { yt: 'xBN1EhBVxUA', url: 'https://www.instagram.com/reel/DRKaTVnEpF2/', t: 'A Lethal-Like That\'s Finally Doing Something Different (Storebound)', views: 1645260, d: 'Nov 2025', on: 'YouTube + Instagram' },
      { yt: '3WBAS9hDHmg', url: 'https://www.instagram.com/reel/DQUH8WNEhje/', t: 'This Co-op Horror Game Will Give You Trust Issues', views: 775234, d: 'Oct 2025', on: 'YouTube + Instagram' },
      { yt: 'tcr5OdY-als', url: 'https://www.instagram.com/reel/Dd_2RRYhqfq/', t: 'This Is the Wildest Friendslop Game (Grave Mistakes)', views: 751971, d: 'Oct 2026', on: 'YouTube + TikTok + Instagram' },
      { yt: 'V7_aLzbOpo4', url: 'https://youtu.be/V7_aLzbOpo4', t: '4 AMAZING Co-op Games To Play With Your Partner Or Best Friend', views: 388983, d: 'Aug 2025', on: 'YouTube' },
      { yt: 'L6PmUMJ-d1E', url: 'https://youtu.be/L6PmUMJ-d1E', t: 'Co-op RV Game You Need To Check Out (Long Drive North)', views: 271443, d: 'Feb 2025', on: 'YouTube' },
      { yt: 'mecVRUbhJzw', url: 'https://www.tiktok.com/@explorerdotgames/video/7641404833680968980', t: 'What If Among Us Was a Roguelike? (Masters Of Mayhem)', views: 129271, d: 'May 2026', on: 'YouTube + TikTok' },
      { yt: 'XCnbuesjSBw', url: 'https://youtu.be/XCnbuesjSBw', t: 'A Survival Game Inspired by Stalker and Lethal Company (MISERY)', views: 128210, d: 'Jul 2025', on: 'YouTube' },
      { yt: 'KQimWEbhIgk', url: 'https://youtu.be/KQimWEbhIgk', t: 'It\'s REPO & Content Warning But in VR (Deadly Delivery)', views: 122323, d: 'May 2025', on: 'YouTube' }
    ]
  }
];

var CREATORS = [
  {
    country: 'us', name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: 'United States / 109K followers',
    hook: 'On camera in every video, sharing co-op and party games with a highly engaged audience. Reels up to 17M views.',
    idea: 'A chaotic first flight with friends, on camera.',
    stats: [['10K', 'YT Shorts'], ['8K', 'TikTok'], ['33K', 'Instagram'], ['54K', 'Facebook']],
    total: ['104K', 'Per short, all platforms'],
    kit: 'https://july.bio/cloudual',
    channels: [['YouTube', 'https://www.youtube.com/@Cloudual'], ['TikTok', 'https://www.tiktok.com/@cloudual'], ['Instagram', 'https://www.instagram.com/cloudual'], ['Facebook', 'https://www.facebook.com/profile.php?id=61585994548093']]
  },
  {
    country: 'us', name: 'Gem Gaming Network', initials: 'GG', avatar: AV.gem, meta: 'United States / 137K followers',
    hook: 'Daily co-op and party game discovery for a young adult audience, posting on four platforms.',
    idea: '"Play as the crew of the world\'s worst airline", in Gem\'s proven co-op format.',
    stats: [['9K', 'YT Shorts'], ['13K', 'TikTok'], ['14K', 'Instagram'], ['5K', 'Facebook']],
    total: ['41K', 'Per short, all platforms'],
    kit: 'https://july.bio/gemgamingnetwork',
    channels: [['YouTube', 'https://www.youtube.com/@gemgamingnetwork'], ['TikTok', 'https://www.tiktok.com/@gemgamingnetwork'], ['Instagram', 'https://www.instagram.com/gemgamingnetwork'], ['Facebook', 'https://www.facebook.com/profile.php?id=61587281364461']]
  },
  {
    country: 'au', name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: 'Australia / 194K followers',
    hook: 'Recommendation Shorts that help players find their next co-op game, built for the weeks before launch.',
    idea: '"PEAK and R.E.P.O. fans, this is your next game": hype that turns into wishlists.',
    stats: [['16K', 'YT Shorts'], ['9K', 'TikTok'], ['20K', 'Instagram'], ['1K', 'Facebook']],
    total: ['45K', 'Per short, all platforms'],
    kit: 'https://july.bio/gamesexplorer',
    channels: [['YouTube', 'https://www.youtube.com/@explorerdotgames'], ['TikTok', 'https://www.tiktok.com/@explorerdotgames'], ['Instagram', 'https://www.instagram.com/explorer.games'], ['Facebook', 'https://www.facebook.com/profile.php?id=100089561127301']]
  },
  {
    country: 'ca', name: 'Retro For The First Time', initials: 'RF', avatar: AV.retro, meta: 'Canada / 244K followers',
    hook: 'Daily gaming news, always on camera. 53 Shorts in the last 30 days.',
    idea: 'Release date, demo and launch news, the moment it lands.',
    stats: [['37K', 'YT Shorts'], ['16K', 'TikTok'], ['9K', 'Instagram'], ['5K', 'Facebook']],
    total: ['67K', 'Per short, all platforms'],
    kit: 'https://july.bio/rftft',
    channels: [['YouTube', 'https://www.youtube.com/@RetroForTheFirstTime'], ['TikTok', 'https://www.tiktok.com/@retroforthefirsttime'], ['Instagram', 'https://www.instagram.com/retroftft'], ['Facebook', 'https://www.facebook.com/profile.php?id=61577469602007']]
  },
  {
    country: 'uk', name: 'Captain Eggcellent', initials: 'CE', avatar: AV.cap, meta: 'United Kingdom / 1.6M followers',
    hook: 'The Easter egg king. Shorts that reach 237K views on average across four platforms, with single videos up to 2M.',
    idea: 'Hidden details and the funniest things you can do on board, once the game is out.',
    stats: [['48K', 'YT Shorts'], ['56K', 'TikTok'], ['105K', 'Instagram'], ['28K', 'Facebook']],
    total: ['237K', 'Per short, all platforms'],
    kit: 'https://july.bio/CaptainEggcellent',
    channels: [['YouTube', 'https://www.youtube.com/@captaineggcellentbutshorter'], ['TikTok', 'https://www.tiktok.com/@captaineggcellent'], ['Instagram', 'https://www.instagram.com/captaineggcellent/'], ['Facebook', 'https://www.facebook.com/captaineggcellent']]
  }
];

var SHORT_SUM = [['~494K', 'Estimated views per round'], ['2.3M', 'Followers combined'], ['20', 'Posts per round, 5 creators on 4 platforms']];

// Example: two waves. Prices per short posted on YouTube, TikTok, Instagram and Facebook.
var BUDGET = [
  { tag: 'Wave 1', who: 'Cloudual', what: 'Short on YouTube, TikTok, Instagram and Facebook: first look and wishlist push', price: 2600, views: '~104,000' },
  { tag: 'Wave 1', who: 'Gem Gaming Network', what: 'Short on YouTube, TikTok, Instagram and Facebook: first look and wishlist push', price: 2600, views: '~41,000' },
  { tag: 'Wave 1', who: 'Games Explorer', what: 'Short on YouTube, TikTok, Instagram and Facebook: first look and wishlist push', price: 2600, views: '~45,000' },
  { tag: 'Wave 1', who: 'Retro For The First Time', what: 'Short on YouTube, TikTok, Instagram and Facebook: release date or demo news', price: 2600, views: '~67,000' },
  { tag: 'Wave 2', who: 'Cloudual', what: 'Short on YouTube, TikTok, Instagram and Facebook: launch day', price: 2600, views: '~104,000' },
  { tag: 'Wave 2', who: 'Gem Gaming Network', what: 'Short on YouTube, TikTok, Instagram and Facebook: launch day', price: 2600, views: '~41,000' },
  { tag: 'Wave 2', who: 'Games Explorer', what: 'Short on YouTube, TikTok, Instagram and Facebook: launch day', price: 2600, views: '~45,000' },
  { tag: 'Wave 2', who: 'Retro For The First Time', what: 'Short on YouTube, TikTok, Instagram and Facebook: launch news', price: 2600, views: '~67,000' },
  { tag: 'Wave 2', who: 'Captain Eggcellent', what: 'Short on YouTube, TikTok, Instagram and Facebook: hidden details and funny moments', price: 6500, views: '~237,000' },
  { sub: true, who: 'Organic subtotal', what: '9 shorts, 36 posts', price: 27300, views: '~751,000' },
  { ads: true, who: 'TikTok Spark Ads (example)', what: 'Gaming interest, 18 to 34, US, Canada and UK. Also the fallback plan.', price: 5000, views: '~330,000 to 500,000' },
  { total: true, who: 'Total', price: 32300, views: '~1.08M to 1.25M views' }
];

var METHOD = [
  'Friendslop history: each channel\'s full YouTube upload history, pulled on November 25, 2026. A video counts when its title names a co-op, party or multiplayer game, or one of the genre\'s best known games (R.E.P.O., PEAK, Lethal Company, Content Warning and more).',
  'Example videos: the best co-op posts in each creator\'s latest ~250 TikTok and Instagram posts, matched to the same short on YouTube by date and title. Where a short was posted on several platforms, the views are added up and the platforms are listed.',
  'Creator averages: plain average views per video over the last 30 days, pulled on November 18, 2026. Every video counts. Nothing is removed at the top or the bottom. "All platforms" adds up each platform\'s average for one short posted everywhere.',
  'Followers: total across YouTube, TikTok, Instagram and Facebook, pulled on November 18, 2026.',
  'Estimated views are estimates, not guarantees. Single videos can land above or below. Spark Ads ranges use 2026 TikTok benchmarks of USD 10 to 15 per 1,000 impressions.'
];
