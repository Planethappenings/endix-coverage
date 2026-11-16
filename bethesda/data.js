// Numbers: YouTube Data API, each channel's full upload history, pulled November 16, 2026.
var HERO = [
  ['71M', 'Views on videos covering your games'],
  ['332', 'Videos, none of them paid'],
  ['6', 'Creators on 4 platforms'],
  ['2011', 'Covering your games since']
];

var VALUE = [
  { k: 'Proven', num: '71M', h: 'Views Already Earned', t: '332 YouTube videos covering your games, made without a brief or a budget. 200 of them have one of your games in the title, the rest feature them next to other games.' },
  { k: 'Reach', num: '~770K', h: 'Estimated Views Per Round', t: 'One long-form video each from Captain Eggcellent and RageGamingVideos, plus one short on every platform from the whole roster, at their current 30-day averages.' },
  { k: 'Fit', num: '9', h: 'Franchises Already Covered', t: 'Fallout, The Elder Scrolls, Starfield, DOOM, Grounded, Dishonored, Prey, Wolfenstein and Indiana Jones. Whatever you launch in 2027, someone on the roster already plays it.' }
];

var TITLES = [
  { name: 'Fallout', img: 'fallout76.webp', pos: '74% 40%', videos: 29, views: 5388176 },
  { name: 'Grounded', img: 'grounded2.webp', pos: '50% 100%', size: 'auto 175%', videos: 64, views: 3611278 },
  { name: 'Starfield', img: 'starfield.webp', pos: '50% 100%', size: 'auto 155%', videos: 26, views: 2006905 },
  { name: 'The Elder Scrolls', img: 'skyrim.webp', pos: '50% 10%', size: 'auto 150%', videos: 35, views: 1766127 },
  { name: 'DOOM', img: 'doom.webp', pos: '50% 8%', size: 'auto 190%', videos: 16, views: 1518443 },
  { name: 'Dishonored, Prey, Wolfenstein And More', videos: 30, views: 6778263 }
];

var FEAT_NOTE = 'Videos with the game in the title: 200 videos and 21.1 million views. On top of that come 132 compilation videos where your games feature next to others, with 50.1 million more views. Together: 332 videos and 71.1 million views.';

var LINEUP = [
  { k: 'Fallout', when: '2027', cls: 'set', h: 'Fallout Turns 30', t: 'Three decades of the wasteland, with Fallout Day celebrated live in Washington, D.C. The biggest reason in years to look back at the whole series.', who: 'Captain Eggcellent, 28 Fallout videos and 5.4M views' },
  { k: 'Fallout 76', when: '2027', cls: 'set', h: 'Raven Rock', t: 'A major expansion and a prequel to Fallout 3, on top of nearly 70 free updates so far.', who: 'RageGamingVideos, launch guides and Pro and Noob series' },
  { k: 'Remasters', when: 'Date TBA', cls: 'tba', h: 'Fallout 3 And New Vegas', t: 'Both remasters are confirmed to be in development. No dates announced yet.', who: 'Captain Eggcellent and Cloudual, secrets and first-time playthroughs' },
  { k: 'Starfield', when: '2027', cls: 'set', h: 'Starborn', t: 'New Starborn content as Starfield enters Year 3, now with PlayStation 5 players on board.', who: 'RageGamingVideos, 10 Starfield guides and 622K views' },
  { k: 'The Elder Scrolls', when: 'Ongoing', cls: '', h: 'Tamriel All Year', t: 'The Elder Scrolls Online continues in seasons, Oblivion Remastered keeps finding new players and The Elder Scrolls VI is the studio\'s main development focus.', who: 'RageGamingVideos and Retro For The First Time' },
  { k: 'And More', when: 'Ongoing', cls: '', h: 'DOOM, Grounded 2, Indiana Jones', t: 'DOOM: The Dark Ages and its Revelations DLC, Grounded 2 growing in early access and now on PlayStation 5, plus whatever gets announced next.', who: 'The whole roster' }
];

var AV = {
  rage: 'https://yt3.googleusercontent.com/3TlufKydntExNT_c7TULN3BosQs2ClqYTDrLSl_xCF-jhriazbq8XzD9C377agd_PLSjqHdp=s176-c-k-c0x00ffffff-no-rj',
  cap: 'https://yt3.googleusercontent.com/ytc/AIdro_lF06n7yXV4O7GDR0xRe2En7-n6X2Mio6ymHT1o8vVdZ-g=s176-c-k-c0x00ffffff-no-rj',
  retro: 'https://yt3.ggpht.com/90Sj2UwaIwuNJ79aKOt7JkGMTRKgGinA1NcstCU3GwPCwuPeqSArw2B6z1E754Sy2q6GP2ib=s176-c-k-c0x00ffffff-no-rj',
  cloud: 'https://yt3.ggpht.com/FuMmLDSa4Ooa9DtVScFPp1pK4P18kjR9nY5vQ38CBvCoC8st0HLJucAlXH909jUucjvOngVhyyo=s176-c-k-c0x00ffffff-no-rj',
  gem: 'https://yt3.ggpht.com/t0wekIlzDy2LWG2LLtDUiDa84Te7KyLygjmtO3aXytR23UKD-ofXwtHdxm1wj-pZknyj7mtzyw=s176-c-k-c0x00ffffff-no-rj',
  exp: 'https://yt3.ggpht.com/uSjYOAMNcoJrQOJEJFXLOupitglGU_cBSaDFn96MCjMksM0c2hoAdptilUrpZ9uTdglRcKGi=s176-c-k-c0x00ffffff-no-rj'
};

var FANS = [
  {
    name: 'Captain Eggcellent', initials: 'CE', avatar: AV.cap, meta: '982K subscribers / main and Shorts channel',
    videos: 74, views: 17048563, avg: 230386, since: '2015',
    quote: 'The Easter egg king has been digging through your games since 2015: every Fallout, DOOM, Dishonored, Prey, Starfield and more. A further 113 of his compilation videos feature your games, with 49.7M more views.',
    games: [['Fallout', 28], ['Dishonored, Prey, Deathloop', 13], ['DOOM', 8], ['Starfield', 6], ['The Elder Scrolls', 6], ['Wolfenstein', 3], ['Grounded', 2], ['Others', 8]],
    vids: [
      { id: 'Oh-MDYH_83c', t: 'I DIDN\'T know you could do this in Wolfenstein 2 Easter egg!', views: 1718284, d: 'Dec 2025', short: true },
      { id: 'Dkd0uwXEi3I', t: '29 INSANE Hidden Details In Fallout 3, Fallout New Vegas, Fallout 4...', views: 358228, d: 'Apr 2024' },
      { id: 'YKJayr53z0s', t: 'The SKELETONS in Fallout 3 are BRILLIANT Easter egg!', views: 282518, d: 'Jan 2026', short: true },
      { id: 'hv6IAHIeucc', t: 'DOOM ETERNAL - 25 Easter Eggs, Secret & References', views: 274652, d: 'Mar 2020' },
      { id: 'YTt6N5t6uUc', t: 'The Best Easter Eggs In Dishonored', views: 273339, d: 'May 2015' },
      { id: '9grWeAmqiFs', t: 'STARFIELD - 25 Easter Eggs, Secrets, References & Hidden Details', views: 227482, d: 'Sep 2023' }
    ]
  },
  {
    name: 'RageGamingVideos', initials: 'RG', avatar: AV.rage, meta: '1.42M subscribers',
    videos: 100, views: 3684857, avg: 36849, since: '2011',
    quote: 'First video on November 11, 2011, the day Skyrim launched. Since then: guides and series for Starfield, Oblivion Remastered, DOOM: The Dark Ages, The Elder Scrolls Online and 61 videos on Grounded.',
    games: [['Grounded', 61], ['The Elder Scrolls', 20], ['Starfield', 10], ['DOOM', 6], ['Others', 3]],
    vids: [
      { id: 'zqeiqRmueMc', t: 'Is Elder Scrolls Online Worth Playing in 2021? (Level 1 to Endgame)', views: 379309, d: 'Aug 2020' },
      { id: 'PR5lGcwA8fg', t: 'Starfield - NEW 150K XP A MINUTE & INFINITE CREDITS & RESOURCES...', views: 162946, d: 'Sep 2023' },
      { id: 'fXayr3s4Y64', t: 'Grounded 2 - Don\'t Miss THIS - Get OP Early Fast - Best Weapon...', views: 142581, d: 'Jul 2025' },
      { id: 'lLbBTtXb8-Y', t: 'Starfield - 14 HUGE Mistakes to Avoid & IMPORTANT Things...', views: 105416, d: 'Sep 2023' },
      { id: 'bZg9J6oyL_I', t: 'Oblivion Remastered - Don\'t Miss THIS - Get OP Early Fast...', views: 68936, d: 'Apr 2025' },
      { id: '2xf-YkAtzUk', t: 'RIP AND TEAR - Pro and Noob VS Doom the Dark Ages!', views: 23429, d: 'May 2025' }
    ]
  },
  {
    name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: '22.6K subscribers, 102.7K on TikTok',
    videos: 5, views: 195997, avg: 39199, since: '2023',
    quote: 'Recommendation Shorts that bring new players into your worlds. His Bethesda and Xbox Shorts land well above his normal average.',
    games: [['The Elder Scrolls', 3], ['Starfield', 1], ['Grounded', 1]],
    vids: [
      { id: 'CPXaIGL6KVo', t: 'Starfield Meets Satisfactory! (SpaceCraft)', views: 97092, d: 'May 2026', short: true },
      { id: 'TKKDBzMXtbY', t: 'Grounded 2 Was Announced!', views: 72070, d: 'Jun 2025', short: true },
      { id: 'n4YnTE-zj1o', t: 'Minecraft Meets Skyrim!', views: 21476, d: 'Mar 2026', short: true }
    ]
  },
  {
    name: 'Retro For The First Time', initials: 'RF', avatar: AV.retro, meta: '68.2K subscribers, 160K on TikTok',
    videos: 16, views: 117487, avg: 7343, since: '2018',
    quote: 'Daily gaming news on camera. Starfield and The Elder Scrolls are regulars in his feed.',
    games: [['Starfield', 8], ['The Elder Scrolls', 3], ['DOOM', 2], ['The Evil Within', 3]],
    vids: [
      { id: 'uRR1b3s9W9Y', t: 'Starfield on PS5 is confirmed .. and delayed', views: 23555, d: 'Aug 2025', short: true },
      { id: 'FJX5VZegPTQ', t: 'Starfield is an Xbox exclusive thanks to Sony', views: 14618, d: 'Jun 2023', short: true },
      { id: 'WK8EePYeKtM', t: 'I was a guest star in starfield', views: 6880, d: 'Sep 2023', short: true },
      { id: '5obeLTJHR9I', t: 'Starfield coming to Nintendo Switch 2 with a huge update', views: 6851, d: 'Dec 2025', short: true }
    ]
  },
  {
    name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: '16.6K subscribers',
    videos: 5, views: 22288, avg: 4458, since: '2024',
    quote: 'Played Skyrim for the very first time on camera. Shares co-op and PC games on camera, strongest on Instagram and Facebook.',
    games: [['The Elder Scrolls', 3], ['Indiana Jones', 1], ['Starfield', 1]],
    vids: [
      { id: 'AoRpbSdCy20', t: 'CO-OP Indiana Jones... but the loot is trying to end you', views: 14735, d: 'Apr 2026', short: true },
      { id: 'jsnhL-5XLyU', t: 'New Star Wars Mod for Starfield is Breaking the Internet', views: 3525, d: 'Feb 2026', short: true },
      { id: 'eJsVLj7GIfk', t: 'Can a COMPLETE BEGINNER Really Beat Skyrim\'s First Boss?', views: 2337, d: 'Oct 2024' },
      { id: 'JsZNRwGbfao', t: 'Complete Noob Tries Skyrim for the First Time', views: 1253, d: 'Oct 2024' }
    ]
  }
];

var CREATORS = [
  {
    name: 'Captain Eggcellent', initials: 'CE', avatar: AV.cap, meta: 'United Kingdom / 982K subscribers, 436K on TikTok',
    hook: 'The Easter egg king. Long-form deep dives plus Shorts on four platforms.',
    stats: [['181K', 'YT long-form'], ['45K', 'YT Shorts'], ['61K', 'TikTok'], ['95K', 'Instagram'], ['27K', 'Facebook']],
    kit: 'https://july.bio/CaptainEggcellent',
    channels: [['YouTube', 'https://www.youtube.com/@CaptainEggcellent'], ['Shorts', 'https://www.youtube.com/@captaineggcellentbutshorter'], ['TikTok', 'https://www.tiktok.com/@captaineggcellent'], ['Instagram', 'https://www.instagram.com/captaineggcellent/'], ['Facebook', 'https://www.facebook.com/captaineggcellent']]
  },
  {
    name: 'RageGamingVideos', initials: 'RG', avatar: AV.rage, meta: 'United Kingdom / 1.42M subscribers',
    hook: 'One of YouTube\'s go-to guide channels for big PC and console games. 89 videos in the last 30 days.',
    stats: [['70K', 'YouTube, per video']],
    kit: 'https://july.bio/ragegamingvideos',
    channels: [['YouTube', 'https://www.youtube.com/@RageGamingVideos']]
  },
  {
    name: 'Retro For The First Time', initials: 'RF', avatar: AV.retro, meta: 'Canada / 68.2K subscribers, 160K on TikTok',
    hook: 'Daily gaming news, always on camera. Announcements fit straight into the format.',
    stats: [['34K', 'YT Shorts'], ['16K', 'TikTok'], ['8K', 'Instagram'], ['5K', 'Facebook']],
    kit: 'https://july.bio/rftft',
    channels: [['YouTube', 'https://www.youtube.com/@RetroForTheFirstTime'], ['TikTok', 'https://www.tiktok.com/@retroforthefirsttime'], ['Instagram', 'https://www.instagram.com/retroftft'], ['Facebook', 'https://www.facebook.com/profile.php?id=61577469602007']]
  },
  {
    name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: 'United States / 16.6K subscribers',
    hook: 'On camera in every video, sharing co-op and PC games with a highly engaged audience.',
    stats: [['10K', 'YT Shorts'], ['53K', 'TikTok'], ['44K', 'Instagram'], ['49K', 'Facebook']],
    kit: 'https://july.bio/cloudual',
    channels: [['YouTube', 'https://www.youtube.com/@Cloudual'], ['TikTok', 'https://www.tiktok.com/@cloudual'], ['Instagram', 'https://www.instagram.com/cloudual'], ['Facebook', 'https://www.facebook.com/profile.php?id=61585994548093']]
  },
  {
    name: 'Gem Gaming Network', initials: 'GG', avatar: AV.gem, meta: 'United States / 62.8K on TikTok',
    hook: 'Game discovery across every genre for a young adult audience, posting daily on four platforms.',
    stats: [['9K', 'YT Shorts'], ['12K', 'TikTok'], ['14K', 'Instagram'], ['5K', 'Facebook']],
    kit: 'https://july.bio/gemgamingnetwork',
    channels: [['YouTube', 'https://www.youtube.com/@gemgamingnetwork'], ['TikTok', 'https://www.tiktok.com/@gemgamingnetwork'], ['Instagram', 'https://www.instagram.com/gemgamingnetwork'], ['Facebook', 'https://www.facebook.com/profile.php?id=61587281364461']]
  },
  {
    name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: 'Australia / 102.7K on TikTok',
    hook: 'Helping players find their next game with recommendation Shorts.',
    stats: [['16K', 'YT Shorts'], ['7K', 'TikTok'], ['6K', 'Instagram'], ['2K', 'Facebook']],
    kit: 'https://july.bio/gamesexplorer',
    channels: [['YouTube', 'https://www.youtube.com/@explorerdotgames'], ['TikTok', 'https://www.tiktok.com/@explorerdotgames'], ['Instagram', 'https://www.instagram.com/explorer.games'], ['Facebook', 'https://www.facebook.com/profile.php?id=100089561127301']]
  }
];

var METHOD = [
  'Video history: each channel\'s full YouTube upload history, pulled on November 16, 2026. A video counts when one of your games is named in its title.',
  'Compilation videos, where a game is only named in the video\'s tags, are counted separately and shown as "feature".',
  'Roster averages: plain average views per video over the last 30 days on YouTube, TikTok, Instagram and Facebook. Every video counts. Nothing is removed at the top or the bottom.',
  'Estimated views per round add up each channel\'s 30-day averages. They are estimates, not guarantees, and single videos can land above or below.',
  'Facebook reports rounded play counts, so Facebook figures are approximate.'
];
