// Numbers: YouTube Data API, each channel's full upload history, pulled November 18, 2026.
var HERO = [
  ['74M+', 'Views on videos covering your games'],
  ['8', 'Creators'],
  ['200M+', 'Avg monthly impressions'],
  ['2011', 'Covering your games since']
];

var VALUE = [
  { num: '74M+', h: 'Views Already Earned', t: '451 YouTube videos covering your games, made without a brief or a budget. 256 of them are about one of your games, the rest feature them next to other games.' },
  { num: '~780K', h: 'Estimated Views Per Beat', t: 'One beat consists of one long-form video from Captain Eggcellent and RageGamingVideos, plus one short across all platforms from the whole roster. Views based on their current 30-day averages.' },
  { num: '50%', h: 'Of The Audience Is In The US', t: 'About half of all views come from the United States, followed by Canada, the United Kingdom and Western Europe. The markets where your games sell.' }
];

var TITLES = [
  { name: 'Fallout', img: 'fallout76.webp', pos: '74% 40%', videos: 30, views: 8092764 },
  { name: 'Grounded', img: 'grounded2.webp', pos: '50% 100%', size: 'auto 175%', videos: 65, views: 3722760 },
  { name: 'Starfield', img: 'starfield.webp', pos: '50% 100%', size: 'auto 155%', videos: 58, views: 2134057 },
  { name: 'The Elder Scrolls', img: 'skyrim.webp', pos: '50% 10%', size: 'auto 150%', videos: 33, views: 1782096 },
  { name: 'DOOM', img: 'doom.webp', pos: '50% 8%', size: 'auto 190%', videos: 21, views: 1684231 },
  { name: 'Dishonored, Prey, Wolfenstein, Indiana Jones And More', videos: 49, views: 6926566 }
];

// YouTube only, videos with the game in the title. A video that names several games counts for each of them.
var PERGAME = [
  ['Starfield', 59, 2491783],
  ['Fallout 76', 11, 2278914],
  ['Grounded', 22, 1916896],
  ['Wolfenstein series', 3, 1745233],
  ['Grounded 2', 43, 1697164],
  ['Fallout: New Vegas', 6, 1518695],
  ['Fallout 3', 6, 1466137],
  ['Fallout 4', 8, 1099749],
  ['The Elder Scrolls V: Skyrim', 21, 735224],
  ['The Elder Scrolls Online', 3, 419704],
  ['DOOM: The Dark Ages', 10, 411221],
  ['DOOM Eternal', 2, 277319],
  ['The Elder Scrolls VI', 1, 10437]
];

var FEAT_NOTE = 'Videos about your games: 256 YouTube videos and 21.4 million views, plus 3 million views on the same videos on TikTok, Instagram and Facebook. On top of that come 195 compilation videos where your games feature next to others, with 50.3 million more views. Together: 74.6 million views.';

var LINEUP = [
  { when: '2027', cls: 'set', h: 'Fallout Turns 30', t: 'Three decades of the wasteland, with Fallout Day celebrated live in Washington, D.C. The biggest reason in years to look back at the whole series.', who: 'Captain Eggcellent, 28 Fallout videos and 8M views' },
  { when: '2027', cls: 'set', h: 'Fallout 76: Raven Rock', t: 'A major expansion and a prequel to Fallout 3, on top of nearly 70 free updates so far.', who: 'RageGamingVideos, launch guides and Pro and Noob series' },
  { when: 'Date TBA', cls: 'tba', h: 'Fallout 3 And New Vegas Remastered', t: 'Both remasters are confirmed to be in development. No dates announced yet.', who: 'Captain Eggcellent and Cloudual, secrets and first-time playthroughs' },
  { when: '2027', cls: 'set', h: 'Starfield: Starborn', t: 'Starfield enters Year 3, expanding the Settled Systems with new stories, targeted gameplay improvements and additional updates, while preparing for the launch of new Starborn content.', who: 'RageGamingVideos and David Jaffe, 43 Starfield videos between them' },
  { when: 'Ongoing', cls: '', h: 'The Elder Scrolls', t: 'The Elder Scrolls Online continues in seasons, Oblivion Remastered keeps finding new players and The Elder Scrolls VI is the studio\'s main development focus.', who: 'RageGamingVideos and Retro For The First Time' },
  { when: 'Ongoing', cls: '', h: 'DOOM, Grounded 2, The Outer Worlds 2 And More', t: 'DOOM: The Dark Ages and its Revelations DLC, Grounded 2 and The Outer Worlds 2 from Xbox Game Studios, Indiana Jones and whatever gets announced next. Pre-release hype that turns into wishlists and pre-orders.', who: 'Games Explorer, Gem Gaming Network and Ettnix' }
];

var AV = {
  rage: 'https://yt3.googleusercontent.com/3TlufKydntExNT_c7TULN3BosQs2ClqYTDrLSl_xCF-jhriazbq8XzD9C377agd_PLSjqHdp=s176-c-k-c0x00ffffff-no-rj',
  cap: 'https://yt3.googleusercontent.com/ytc/AIdro_lF06n7yXV4O7GDR0xRe2En7-n6X2Mio6ymHT1o8vVdZ-g=s176-c-k-c0x00ffffff-no-rj',
  retro: 'https://yt3.ggpht.com/90Sj2UwaIwuNJ79aKOt7JkGMTRKgGinA1NcstCU3GwPCwuPeqSArw2B6z1E754Sy2q6GP2ib=s176-c-k-c0x00ffffff-no-rj',
  cloud: 'https://yt3.ggpht.com/FuMmLDSa4Ooa9DtVScFPp1pK4P18kjR9nY5vQ38CBvCoC8st0HLJucAlXH909jUucjvOngVhyyo=s176-c-k-c0x00ffffff-no-rj',
  gem: 'https://yt3.ggpht.com/t0wekIlzDy2LWG2LLtDUiDa84Te7KyLygjmtO3aXytR23UKD-ofXwtHdxm1wj-pZknyj7mtzyw=s176-c-k-c0x00ffffff-no-rj',
  exp: 'https://yt3.ggpht.com/uSjYOAMNcoJrQOJEJFXLOupitglGU_cBSaDFn96MCjMksM0c2hoAdptilUrpZ9uTdglRcKGi=s176-c-k-c0x00ffffff-no-rj',
  jaffe: 'https://yt3.googleusercontent.com/FpEKToeTl-YhbfTMINqhrOb1mJv9CFSX2-FMxEpj5jfYmImNbsPBgO4Fv_j-Iw-6hKhVXUN35A=s176-c-k-c0x00ffffff-no-rj',
  ett: 'https://yt3.googleusercontent.com/ytc/AIdro_lsk32vQTIqc3TBV2QLv4zsAeZBhXAzrbxM_UOCLMGScFI=s176-c-k-c0x00ffffff-no-rj'
};

var FANS = [
  {
    name: 'Captain Eggcellent', initials: 'CE', avatar: AV.cap, meta: '982K subscribers / main and Shorts channel',
    videos: 74, views: 19904495, viewsLabel: 'Views, all platforms', avg: 230399, since: '2015',
    quote: 'The Easter egg king has been digging through your games since 2015: every Fallout, DOOM, Dishonored, Prey, Starfield, Grounded and more. A further 113 of his compilation videos feature your games, with 49.7M more views.',
    games: [['Fallout', 28], ['Dishonored, Prey, Deathloop', 13], ['DOOM', 8], ['Starfield', 6], ['The Elder Scrolls', 6], ['Wolfenstein', 3], ['Grounded', 2], ['Others', 8]],
    vids: [
      { id: 'OOdx44v11_E', t: 'You\'ll only understand this if you\'re really STUPID Fallout New Vegas Easter egg!', views: 1990953, d: 'Jan 2026', short: true, on: 'YouTube + TikTok + Instagram' },
      { id: 'Oh-MDYH_83c', t: 'I DIDN\'T know you could do this in Wolfenstein 2 Easter egg!', views: 1718284, d: 'Dec 2025', short: true, on: 'YouTube' },
      { id: '5_moIsF39t8', t: 'You can help BUTCH and his MUM in an unexpected way Fallout 3 Easter egg!', views: 662468, d: 'Jan 2026', short: true, on: 'YouTube + TikTok + Instagram' },
      { id: 'YKJayr53z0s', t: 'The SKELETONS in Fallout 3 are BRILLIANT Easter egg!', views: 462181, d: 'Jan 2026', short: true, on: 'YouTube + TikTok + Instagram' },
      { id: 'Dkd0uwXEi3I', t: '29 INSANE Hidden Details In Fallout 3, Fallout New Vegas, Fallout 4...', views: 358228, d: 'Apr 2024', on: 'YouTube' },
      { id: 'lcdlZ1mjTx0', t: 'Mouse P.I. DOOM Easter Egg?!', views: 230595, d: 'Apr 2026', short: true, on: 'YouTube + TikTok + Instagram' }
    ]
  },
  {
    name: 'RageGamingVideos', initials: 'RG', avatar: AV.rage, meta: '1.42M subscribers',
    videos: 100, views: 3686559, avg: 36866, since: '2011',
    quote: 'First video on November 11, 2011, the day Skyrim launched. Since then: guides and series for Starfield, Oblivion Remastered, DOOM: The Dark Ages, The Elder Scrolls Online and 61 videos on Grounded and Grounded 2.',
    games: [['Grounded', 61], ['The Elder Scrolls', 20], ['Starfield', 10], ['DOOM', 6], ['Others', 3]],
    vids: [
      { id: 'zqeiqRmueMc', t: 'Is Elder Scrolls Online Worth Playing in 2021? (Level 1 to Endgame)', views: 379309, d: 'Aug 2020', on: 'YouTube' },
      { id: 'PR5lGcwA8fg', t: 'Starfield - NEW 150K XP A MINUTE & INFINITE CREDITS & RESOURCES...', views: 162946, d: 'Sep 2023', on: 'YouTube' },
      { id: 'fXayr3s4Y64', t: 'Grounded 2 - Don\'t Miss THIS - Get OP Early Fast - Best Weapon...', views: 142842, d: 'Jul 2025', on: 'YouTube' },
      { id: 'lLbBTtXb8-Y', t: 'Starfield - 14 HUGE Mistakes to Avoid & IMPORTANT Things...', views: 105416, d: 'Sep 2023', on: 'YouTube' },
      { id: 'bZg9J6oyL_I', t: 'Oblivion Remastered - Don\'t Miss THIS - Get OP Early Fast...', views: 68936, d: 'Apr 2025', on: 'YouTube' },
      { id: '-87Ob5lElTA', t: 'WE INSTANTLY STARTED A WAR - Grounded VS Pro and Noob!', views: 50721, d: '', on: 'YouTube' }
    ]
  },
  {
    name: 'David Jaffe', initials: 'DJ', avatar: AV.jaffe, meta: '63.6K subscribers / creator of God of War',
    videos: 58, views: 369277, avg: 6367, since: '2020',
    quote: 'The designer of God of War and co-creator of Twisted Metal talks about your games as a peer: 33 videos on Starfield alone, plus DOOM, Indiana Jones and a live show with John Romero.',
    games: [['Starfield', 33], ['Indiana Jones', 7], ['DOOM', 5], ['Quake', 2], ['Grounded 2', 1], ['Others', 10]],
    vids: [
      { id: 'hIQviU4zprU', t: 'Doom, Quake, Wolf 3D (+ many more!) LEGEND John Romero LIVE!', views: 21389, d: 'Jun 2021', on: 'YouTube' },
      { id: 'VMXipzjSGD8', t: 'STARFIELD Review and Narrative Discussion', views: 17562, d: 'Sep 2023', on: 'YouTube' },
      { id: 'tsVbzJG7ANM', t: 'Should YOU PLAY Indiana Jones And The Great Circle?', views: 6349, d: 'Dec 2024', on: 'YouTube' },
      { id: '8IkC1RbGoVw', t: 'XBOX SHOWCASE LIVE! DOOM! SOUTH OF MIDNIGHT!', views: 5597, d: 'Jan 2025', on: 'YouTube' }
    ]
  },
  {
    name: 'Retro For The First Time', initials: 'RF', avatar: AV.retro, meta: '68.2K subscribers, 160K on TikTok',
    videos: 16, views: 117503, avg: 7344, since: '2018',
    quote: 'Daily gaming news on camera. Starfield and The Elder Scrolls are regulars in his feed, including the first reports on The Elder Scrolls VI.',
    games: [['Starfield', 8], ['The Elder Scrolls', 3], ['DOOM', 2], ['The Evil Within', 3]],
    vids: [
      { id: 'uRR1b3s9W9Y', t: 'Starfield on PS5 is confirmed .. and delayed', views: 23555, d: 'Aug 2025', short: true, on: 'YouTube' },
      { id: 'FJX5VZegPTQ', t: 'Starfield is an Xbox exclusive thanks to Sony', views: 14618, d: 'Jun 2023', short: true, on: 'YouTube' },
      { id: 'WK8EePYeKtM', t: 'I was a guest star in starfield', views: 6880, d: 'Sep 2023', short: true, on: 'YouTube' },
      { id: 'BcaJ7Fvt4Vk', t: 'Leaker says Elder Scrolls 6 is titled Sentinel', views: 10437, d: '', short: true, on: 'YouTube' }
    ]
  },
  {
    name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: '22.6K subscribers, 102.7K on TikTok',
    videos: 3, views: 242350, viewsLabel: 'Views, all platforms', avg: 80783, since: '2025',
    quote: 'Recommendation Shorts that put your games in front of players looking for their next one, from the Grounded 2 reveal and the day Oblivion Remastered shadow dropped to the classics worth coming back to.',
    games: [['Grounded', 1], ['The Elder Scrolls', 1], ['Fallout', 1]],
    vids: [
      { id: 'TKKDBzMXtbY', t: 'Grounded 2 Was Announced!', views: 180771, d: 'Jun 2025', short: true, on: 'YouTube + TikTok' },
      { id: '9BuCDltEW4c', t: 'Bethesda Just Shadow Dropped This Insane Remaster!', views: 42740, d: 'Apr 2025', short: true, on: 'YouTube + TikTok' },
      { id: 'SwNNwuBjfsc', t: '5 Amazing Games Worth Revisiting In 2026!', views: 18839, d: 'Jan 2026', short: true, on: 'YouTube + TikTok + Instagram + Facebook' }
    ]
  },
  {
    name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: '16.6K subscribers',
    videos: 5, views: 22290, avg: 4458, since: '2024',
    quote: 'Played Skyrim for the very first time on camera. Shares co-op and PC games, strongest on Instagram and Facebook.',
    games: [['The Elder Scrolls', 3], ['Indiana Jones', 1], ['Starfield', 1]],
    vids: [
      { id: 'AoRpbSdCy20', t: 'CO-OP Indiana Jones... but the loot is trying to end you', views: 14735, d: 'Apr 2026', short: true, on: 'YouTube' },
      { id: 'jsnhL-5XLyU', t: 'New Star Wars Mod for Starfield is Breaking the Internet', views: 3525, d: 'Feb 2026', short: true, on: 'YouTube' },
      { id: 'eJsVLj7GIfk', t: 'Can a COMPLETE BEGINNER Really Beat Skyrim\'s First Boss?', views: 2337, d: 'Oct 2024', on: 'YouTube' },
      { id: 'JsZNRwGbfao', t: 'Complete Noob Tries Skyrim for the First Time', views: 1253, d: 'Oct 2024', on: 'YouTube' }
    ]
  }
];

var CREATORS = [
  {
    country: 'uk', name: 'Captain Eggcellent', initials: 'CE', avatar: AV.cap, meta: 'United Kingdom / 982K subscribers',
    hook: 'The Easter egg king. Long-form deep dives at 181K views per video, plus Shorts on four platforms.',
    stats: [['45K', 'YT Shorts'], ['61K', 'TikTok'], ['95K', 'Instagram'], ['27K', 'Facebook']],
    total: ['229K', 'Per short, all platforms'],
    kit: 'https://july.bio/CaptainEggcellent',
    channels: [['YouTube', 'https://www.youtube.com/@CaptainEggcellent'], ['Shorts', 'https://www.youtube.com/@captaineggcellentbutshorter'], ['TikTok', 'https://www.tiktok.com/@captaineggcellent'], ['Instagram', 'https://www.instagram.com/captaineggcellent/'], ['Facebook', 'https://www.facebook.com/captaineggcellent']]
  },
  {
    country: 'uk', name: 'RageGamingVideos', initials: 'RG', avatar: AV.rage, meta: 'United Kingdom / 1.42M subscribers',
    hook: 'One of YouTube\'s go-to guide channels for big PC and console games. 89 videos in the last 30 days.',
    stats: [['70K', 'YouTube']],
    total: ['70K', 'Per long-form video'],
    kit: 'https://july.bio/ragegamingvideos',
    channels: [['YouTube', 'https://www.youtube.com/@RageGamingVideos']]
  },
  {
    country: 'us', name: 'David Jaffe', initials: 'DJ', avatar: AV.jaffe, meta: 'San Diego, California / 63.6K subscribers',
    hook: 'Creator of God of War, co-creator of Twisted Metal. When he covers a game, it is a headline. An older, hardcore audience that listens.',
    stats: [['8K', 'YouTube'], ['2K', 'Instagram'], ['1K', 'TikTok']],
    total: ['11K', 'Per video, all platforms'],
    kit: 'https://july.bio/davidjaffe',
    channels: [['YouTube', 'https://www.youtube.com/@DavidJaffeGames'], ['Twitch', 'https://www.twitch.tv/jaffegamesontwitch'], ['TikTok', 'https://www.tiktok.com/@gabbinandgames'], ['Instagram', 'https://www.instagram.com/davidscottjaffe/']]
  },
  {
    country: 'us', name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: 'United States / 16.6K subscribers',
    hook: 'On camera in every video, sharing co-op and PC games with a highly engaged audience.',
    stats: [['10K', 'YT Shorts'], ['53K', 'TikTok'], ['44K', 'Instagram'], ['49K', 'Facebook']],
    total: ['157K', 'Per short, all platforms'],
    kit: 'https://july.bio/cloudual',
    channels: [['YouTube', 'https://www.youtube.com/@Cloudual'], ['TikTok', 'https://www.tiktok.com/@cloudual'], ['Instagram', 'https://www.instagram.com/cloudual'], ['Facebook', 'https://www.facebook.com/profile.php?id=61585994548093']]
  },
  {
    country: 'us', name: 'Gem Gaming Network', initials: 'GG', avatar: AV.gem, meta: 'United States / 62.8K on TikTok',
    hook: 'Game discovery across every genre for a young adult audience, posting daily on four platforms.',
    stats: [['9K', 'YT Shorts'], ['12K', 'TikTok'], ['14K', 'Instagram'], ['5K', 'Facebook']],
    total: ['40K', 'Per short, all platforms'],
    kit: 'https://july.bio/gemgamingnetwork',
    channels: [['YouTube', 'https://www.youtube.com/@gemgamingnetwork'], ['TikTok', 'https://www.tiktok.com/@gemgamingnetwork'], ['Instagram', 'https://www.instagram.com/gemgamingnetwork'], ['Facebook', 'https://www.facebook.com/profile.php?id=61587281364461']]
  },
  {
    country: 'ca', name: 'Retro For The First Time', initials: 'RF', avatar: AV.retro, meta: 'Canada / 68.2K subscribers, 160K on TikTok',
    hook: 'Daily gaming news, always on camera. Announcements fit straight into the format.',
    stats: [['34K', 'YT Shorts'], ['16K', 'TikTok'], ['8K', 'Instagram'], ['5K', 'Facebook']],
    total: ['64K', 'Per short, all platforms'],
    kit: 'https://july.bio/rftft',
    channels: [['YouTube', 'https://www.youtube.com/@RetroForTheFirstTime'], ['TikTok', 'https://www.tiktok.com/@retroforthefirsttime'], ['Instagram', 'https://www.instagram.com/retroftft'], ['Facebook', 'https://www.facebook.com/profile.php?id=61577469602007']]
  },
  {
    country: 'au', name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: 'Australia / 102.7K on TikTok',
    hook: 'Made for the weeks before launch. His recommendation Shorts put upcoming games in front of players looking for their next one, building hype that turns into wishlists and pre-orders.',
    stats: [['16K', 'YT Shorts'], ['7K', 'TikTok'], ['6K', 'Instagram'], ['2K', 'Facebook']],
    total: ['31K', 'Per short, all platforms'],
    kit: 'https://july.bio/gamesexplorer',
    channels: [['YouTube', 'https://www.youtube.com/@explorerdotgames'], ['TikTok', 'https://www.tiktok.com/@explorerdotgames'], ['Instagram', 'https://www.instagram.com/explorer.games'], ['Facebook', 'https://www.facebook.com/profile.php?id=100089561127301']]
  },
  {
    country: 'se', name: 'Ettnix', initials: 'ET', avatar: AV.ett, meta: 'Sweden / 152K followers on Twitch',
    hook: 'Veteran FPS and RPG streamer with nearly 14 years live. Ranked #1 in Fortnite, TFT, Apex and The Finals. The competitive voice for DOOM and launch-day streams.',
    stats: [['152K', 'Twitch followers'], ['347K', 'Watch hours'], ['12K', 'YouTube subs']],
    kit: 'https://july.bio/ettnix',
    channels: [['Twitch', 'https://www.twitch.tv/ettnix'], ['YouTube', 'https://www.youtube.com/@Ettnix'], ['Instagram', 'https://www.instagram.com/ettnix']]
  }
];

// Example beat: the USD 30,000 package structure, with views from this page's plain 30-day averages
var BUDGET = [
  { who: 'RageGamingVideos', what: '2 dedicated long-form YouTube videos', price: 12000, views: '~140,000' },
  { who: 'Captain Eggcellent', what: 'Short on YouTube, TikTok, Instagram and Facebook', price: 5500, views: '~229,000' },
  { who: 'Retro For The First Time', what: 'Short on all 4 platforms', price: 2000, views: '~64,000' },
  { who: 'Cloudual', what: 'Short on all 4 platforms', price: 2000, views: '~157,000' },
  { who: 'Gem Gaming Network', what: 'Short on all 4 platforms', price: 2000, views: '~40,000' },
  { who: 'Games Explorer', what: 'Short on all 4 platforms', price: 2000, views: '~31,000' },
  { sub: true, who: 'Organic subtotal', price: 25500, views: '~661,000' },
  { ads: true, who: 'TikTok Spark Ads', what: 'Gaming interest, men 18 to 35, US and UK. Also the fallback plan.', price: 4500, views: '~300,000 to 450,000' },
  { total: true, who: 'Total', price: 30000, views: '~960,000 to 1.1M' }
];

var METHOD = [
  'Video history: each channel\'s full YouTube upload history, pulled on November 18, 2026. A video counts when one of your games is named in its title.',
  'Bethesda\'s creator program also lists Xbox Game Studios titles, so Grounded, Grounded 2 and The Outer Worlds 2 are counted too.',
  'Where the same video was also posted on TikTok, Instagram or Facebook, those views are added and the video is marked with its platforms. So far this is matched for Captain Eggcellent and Games Explorer.',
  'Compilation videos, where a game is only named in the video\'s tags, are counted separately. Recommendation Shorts that only use your games as a reference for another game are not counted.',
  'Roster averages: plain average views per video over the last 30 days. Every video counts. Nothing is removed at the top or the bottom. "All platforms" adds up each platform\'s average for one video posted everywhere.',
  'Estimated views are estimates, not guarantees. Single videos can land above or below. Facebook reports rounded play counts.'
];
