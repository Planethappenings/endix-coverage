// Warhammer 40,000: Dark Heresy pitch data.
// RPG and Warhammer history: each channel's full YouTube upload history, pulled November 27, 2026 (title matches only).
// Views shown are YouTube views on that date. Ettnix: Twitch, SullyGnome, last 365 days.
// Creator averages: plain 30-day averages pulled November 18, 2026.
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

var HERO = [
  ['333M', 'Views on RageGamingVideos\' RPG guides'],
  ['26.7M', 'Views on his 168 Baldur\'s Gate 3 guides'],
  ['1.44M', 'Views on one "do this early" guide'],
  ['8', 'Creators, all available for launch']
];

var VALUE = [
  { num: '333M', h: 'RPGs Are His Home Turf', t: 'RageGamingVideos has posted more than 2,580 RPG videos since 2011, with 333M views: Elden Ring, Diablo, Baldur\'s Gate 3, Path of Exile 2, Dragon\'s Dogma 2 and Expedition 33.' },
  { num: '1.44M', h: 'Guides Get Searched For Years', t: 'His Baldur\'s Gate 3 "do this early" guide from August 2023 has 1.44M views. Players search for the best class and the best build long after launch week, so every guide keeps working for the game.' },
  { num: '12', h: 'Already At Home In Warhammer', t: 'Space Marine 2 and Vermintide 2 on RageGamingVideos, Boltgun\'s Easter eggs from Captain Eggcellent, and a paid Warhammer 40,000: Speed Freeks short from Cloudual.' }
];

// The proposed guide series on RageGamingVideos. Each episode is backed by one of his own videos in the same format.
var EPISODES = [
  { ep: 1, when: 'Before launch', opt: 'A + B', h: 'Is Dark Heresy For You? Everything From The Beta', t: 'First impressions from the beta: what carries over from Rogue Trader and what is new, from investigations to morale and online co-op. Built to turn viewers into wishlists and pre-orders.',
    proof: { id: 'zqeiqRmueMc', t: 'Is Elder Scrolls Online Worth Playing in 2021? (Level 1 to Endgame)', views: 379309 } },
  { ep: 2, when: 'Launch day', opt: 'A + B', h: '10 Important Things To Do Early', t: 'The first hours explained: what to pick, what to keep and what not to miss before your first case.',
    proof: { id: 'mYLBheFzDkI', t: 'Baldur\'s Gate 3: 10 IMPORTANT Things You Need to Do Early in Act 1', views: 1441585 } },
  { ep: 3, when: 'Launch day', opt: 'A + B', h: 'All 5 Archetypes Ranked: The Best Class', t: 'Warrior, Officer, Operative, Soldier and the new Mystic, ranked and explained, with the best origin and homeworld for each.',
    proof: { id: 'sd2x5qWD2BM', t: 'Baldur\'s Gate 3: ALL 12 New Classes Ranked & Explained', views: 455964 } },
  { ep: 4, when: 'Launch week', opt: 'A + B', h: 'Best Loadout: The Best Weapons And Armour Early', t: 'Where to find the strongest gear in the Calixis Sector, and how to equip the whole warband.',
    proof: { id: 'pLTI8-K7hLc', t: 'Baldur\'s Gate 3: ALL 17 Legendary Weapons & Armor Ranked', views: 988617 } },
  { ep: 5, when: 'Launch week', opt: 'B', h: 'Level Up Fast And Get OP Early', t: 'Rage\'s signature format: the fastest way to power up your acolyte in the first acts.',
    proof: { id: 'dFsM-g4xMGw', t: 'Elden Ring: How to Get 5 MILLION Runes an Hour', views: 2445548 } },
  { ep: 6, when: 'Week 2', opt: 'B', h: 'Best Warband: Every Companion Ranked', t: 'From the Catachan Guardsman to the Kroot mercenary: who to bring, who to build and the strongest party.',
    proof: { id: '9MjAD0U3mL8', t: 'Clair Obscur Expedition 33: Best Build Guide, ALL 5 Characters', views: 377249 } },
  { ep: 7, when: 'Week 3', opt: 'B', h: 'Don\'t Miss These: Missable Cases And Rewards', t: 'The clues, choices and rewards that are easy to miss in the investigations.',
    proof: { id: 'o1KKfM95tPM', t: 'Dragon\'s Dogma 2: 16 MISSABLE Things You Need to Do Early', views: 392207 } },
  { ep: 8, when: 'Week 4', opt: 'B', h: 'The Most OP Psyker Build', t: 'An endgame build for the Mystic and sanctioned psykers: the guide players keep coming back to.',
    proof: { id: 'i2w-1eJIN-s', t: 'Elden Ring: Sorcery is OVERPOWERED, How to One Shot ANY Boss', views: 2412340 } }
];

// Every Warhammer video on the roster's channels (YouTube)
var WH = [
  { id: 'rPDXru_K_ug', who: 'Captain Eggcellent', t: 'Video Game Easter Eggs #133 (Warhammer 40,000: Boltgun, Trail Out & More)', views: 126946, d: 'May 2024' },
  { id: 'bd5avb22Egs', who: 'RageGamingVideos', t: 'HERESY & HUNTING: Warhammer 40,000 Space Marine 2 VS Pro and Noob!', views: 29651, d: 'Sep 2024' },
  { id: 'Ul_ZLHVPd_A', who: 'RageGamingVideos', t: 'DAMN THE EMPEROR: Warhammer 40,000 Space Marine 2 VS Pro and Noob!', views: 18248, d: 'Sep 2024' },
  { id: '_TXvJEGl6Pg', who: 'RageGamingVideos', t: 'NEW KIND OF MONSTER HUNTING: Vermintide 2!', views: 19322, d: 'Mar 2018' },
  { id: 'etv0hSR8fqQ', who: 'Retro For The First Time', t: '40K for Switch 2?! (30 sec quick dip)', views: 13834, d: 'Feb 2025', short: true },
  { id: 'gBQ1WSLP534', who: 'Cloudual', t: '[Ad] Warhammer 40K Just Got Multiplayer Crossplay (Speed Freeks)', views: 4911, d: 'May 2026', short: true, ad: true }
];

var FANS = [
  {
    name: 'RageGamingVideos', initials: 'RG', avatar: AV.rage, meta: 'United Kingdom / 1.43M subscribers', big: true,
    nums: [['2,580+', 'RPG videos on YouTube'], ['333M', 'Views on them'], ['168', 'Baldur\'s Gate 3 guides'], ['26.7M', 'Views on those']],
    quote: 'First video on November 11, 2011, the day Skyrim launched. Since then he has become a go-to guide channel for every big RPG: builds, best gear, missables and "do this early" guides. Turn-based too: XCOM 2, Darkest Dungeon and a Divinity: Original Sin 2 alpha dev session back in 2015.',
    games: [['Diablo', '1,033'], ['Elden Ring', 915], ['Dragon\'s Dogma', 192], ['Baldur\'s Gate 3', 168], ['Path of Exile', 119], ['Expedition 33', 19], ['Gothic', 13], ['XCOM', 11], ['Space Marine 2', 6]],
    vids: [
      { id: 'dFsM-g4xMGw', t: 'How to Get 5 MILLION Runes an Hour: Best New Rune Farm, Elden Ring', views: 2445548, d: 'Mar 2022' },
      { id: 'i2w-1eJIN-s', t: 'Sorcery is OVERPOWERED: How to One Shot ANY Boss, Best Elden Ring Magic Build', views: 2412340, d: 'Mar 2022' },
      { id: 'mYLBheFzDkI', t: 'Baldur\'s Gate 3: 10 IMPORTANT Things You Need to Do Early in Act 1', views: 1441585, d: 'Aug 2023' },
      { id: 'pLTI8-K7hLc', t: 'Baldur\'s Gate 3: ALL 17 Legendary Weapons & Armor Ranked', views: 988617, d: 'Sep 2023' },
      { id: '_xXJDM50pGk', t: 'Diablo 4: New PERFECT Best Sorcerer Build', views: 849104, d: 'Jun 2023' },
      { id: 'iVcZd1VZeEw', t: 'Baldur\'s Gate 3: 12 IMPORTANT Act 1 Things You Need to Do', views: 762718, d: 'Jan 2024' },
      { id: 'sd2x5qWD2BM', t: 'Baldur\'s Gate 3: ALL 12 New Classes Ranked & Explained', views: 455964, d: 'Apr 2025' },
      { id: 'o1KKfM95tPM', t: 'Dragon\'s Dogma 2: 16 MISSABLE Things You Need to Do Early', views: 392207, d: 'Mar 2024' },
      { id: 'r4LeBA576VI', t: 'Path of Exile 2: How to Make Ascendancy Trials EASY', views: 385750, d: 'Dec 2024' },
      { id: 'zqeiqRmueMc', t: 'Is Elder Scrolls Online Worth Playing in 2021? (Level 1 to Endgame)', views: 379309, d: 'Aug 2020' },
      { id: '9MjAD0U3mL8', t: 'Clair Obscur Expedition 33: New Best MOST OP Build Guide', views: 377249, d: 'May 2025' },
      { id: 'TJPjftc0qqg', t: 'Gothic 1 Remake: Get OP Fast, Best Weapon Early', views: 28110, d: 'Jun 2026', keep: true }
    ]
  },
  {
    name: 'Captain Eggcellent', initials: 'CE', avatar: AV.cap, meta: 'United Kingdom / 1.6M followers',
    nums: [['85', 'RPG videos and shorts'], ['16.8M', 'Views on them'], ['1.24M', 'Cyberpunk 2077 Easter eggs'], ['127K', 'Boltgun Easter eggs']],
    quote: 'The Easter egg king digs through RPGs for the details players miss: 30 secrets in Cyberpunk 2077, hidden details in Fallout, Mass Effect and Hogwarts Legacy, the Gothic Remake, Expedition 33 and Warhammer 40,000: Boltgun.',
    games: [['Fallout', 27], ['Cyberpunk 2077', 21], ['The Elder Scrolls', 6], ['Gothic', 5], ['Hogwarts Legacy', 4], ['Kingdom Come', 4], ['Expedition 33', 3], ['Boltgun', 1]],
    vids: [
      { id: 'uWxliCQl04E', t: 'CYBERPUNK 2077: 30 Easter Eggs, Secrets & References', views: 1238364, d: 'Dec 2020' },
      { id: 'V6Yq7jtXXyI', t: 'Hidden Video Game Details #113 (Cyberpunk 2077, High On Life & More)', views: 581756, d: 'Dec 2022' },
      { id: 'A3AdH_tUjqg', t: 'Hidden Video Game Details #30 (Mass Effect 2, Red Dead Redemption 2 & More)', views: 484269, d: 'Mar 2021' },
      { id: 'LwBzKBOHM_Y', t: 'Video Game Easter Eggs #94 (Hogwarts Legacy, Goat Simulator 3 & More)', views: 446553, d: 'Mar 2023' },
      { id: 'Dkd0uwXEi3I', t: '29 INSANE Hidden Details In Fallout 3, New Vegas, Fallout 4 & Fallout 76', views: 358829, d: 'Apr 2024' },
      { id: 'YKJayr53z0s', t: 'The SKELETONS in Fallout 3 are BRILLIANT', views: 282523, d: 'Jan 2026', short: true },
      { id: 'ATyityrpbGQ', t: 'Cyberpunk 2077 Rewards Players Who Pay Attention!', views: 153002, d: 'Nov 2026', short: true },
      { id: 'i7XHKll7GHU', t: 'Video Game Easter Eggs & Hidden Details #19 (Spider-Man, Gothic Remake & More)', views: 139295, d: 'Aug 2026' },
      { id: 'rPDXru_K_ug', t: 'Video Game Easter Eggs #133 (Warhammer 40,000: Boltgun, Trail Out & More)', views: 126946, d: 'May 2024', wh: true },
      { id: 'VdZZ4U1E5-0', t: 'INSANE Hidden Video Game Details #181 (Doom: The Dark Ages, Expedition 33 & More)', views: 119155, d: 'May 2025' },
      { id: 'US3h7_i_l4g', t: 'Dune: Awakening Has Changed Completely', views: 59311, d: 'Sep 2026' }
    ]
  },
  {
    name: 'Retro For The First Time', initials: 'RF', avatar: AV.retro, meta: 'Canada / 244K followers',
    nums: [['99', 'RPG news shorts'], ['554K', 'YouTube views on them'], ['42.9K', 'Expedition 33 GOTY news'], ['53', 'Shorts in the last 30 days']],
    quote: 'Daily gaming news, always on camera. When an RPG makes news, Retro has it the same day: Expedition 33\'s Game of the Year drama, Mass Effect, Avowed, The Witcher 3 and Elden Ring on Switch 2. He covered Warhammer 40K for Switch 2 too.',
    games: [['Elden Ring', 35], ['Dark Souls', 25], ['Starfield', 8], ['Mass Effect', 5], ['The Witcher', 5], ['Expedition 33', 3], ['Diablo', 3], ['Warhammer 40K', 1]],
    vids: [
      { id: 'FPzje0Y9B3c', t: 'Expedition 33 Gets Game Of The Year Award Taken Away', views: 42907, d: 'Dec 2025', short: true },
      { id: '6R2g4FRblio', t: 'You Can Get Witcher 3 for Free?!', views: 36847, d: 'Sep 2026', short: true },
      { id: 'fgqUbs8_2Xw', t: 'EA Cancelled Mass Effect to Make a Star Wars Game', views: 34901, d: 'Oct 2026', short: true },
      { id: 'SVT-LGJmenw', t: 'Switch 2 Playing 35 Minutes of Cyberpunk 2077', views: 34321, d: 'May 2025', short: true },
      { id: 'V5YK2jg308s', t: 'Elden Ring on Switch 2 Situation', views: 31662, d: 'Oct 2025', short: true },
      { id: 'IyOdhBuql5c', t: 'Obsidian Continues to Work on Cancelled Avowed 2', views: 31287, d: 'Jul 2026', short: true },
      { id: 'UaOy6lbIHlM', t: 'Expedition 33 Art Book CONFISCATED by the Government', views: 22707, d: 'Feb 2026', short: true },
      { id: 'etv0hSR8fqQ', t: '40K for Switch 2?! (30 sec quick dip)', views: 13834, d: 'Feb 2025', short: true, wh: true }
    ]
  },
  {
    name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: 'United States / 109K followers',
    nums: [['29', 'RPG shorts'], ['236K', 'YouTube views on them'], ['5', 'Paid RPG and 40K shorts in 2026'], ['54K', 'Avg Facebook views per short']],
    quote: 'Co-op first: the RPGs you can play with friends, from Baldur\'s Gate 3 and Expedition 33 co-op mods to indie co-op RPGs before they blow up. Warhammer already trusted him with a paid short for Warhammer 40,000: Speed Freeks in May 2026.',
    games: [['Baldur\'s Gate 3', 3], ['Expedition 33', 2], ['Cyberpunk 2077', 2], ['Elden Ring', 2], ['Diablo', 2], ['Dune: Awakening', 1], ['Warhammer 40K', 1]],
    vids: [
      { id: 'z24QRGXLwD0', t: 'Baldur\'s Gate 3\'s Act 2 Expansion Mod is Now Available', views: 31694, d: 'Sep 2026', short: true },
      { id: '8di6gSZhVCc', t: '[Ad] This RPG Has a Villain in Your Basement, and It\'s Your Best Employee', views: 26808, d: 'Apr 2026', short: true },
      { id: '4a7MCEAQWnM', t: 'The Indie Co-Op RPG at 300,000 Wishlists Nobody\'s Talking About', views: 25593, d: 'Jun 2026', short: true },
      { id: 'MBhpLIle6B8', t: 'Cyberpunk 2077 Just Got Multiplayer From Modders (Kind Of)', views: 25193, d: 'Sep 2026', short: true },
      { id: 'C0JYstis8ro', t: 'Online Co-Op Expedition 33 Is Now Here for Free', views: 11084, d: 'Oct 2026', short: true },
      { id: 'gBQ1WSLP534', t: '[Ad] Warhammer 40K Just Got Multiplayer Crossplay (Speed Freeks)', views: 4911, d: 'May 2026', short: true, wh: true }
    ]
  },
  {
    name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: 'Australia / 194K followers',
    nums: [['29', 'RPG recommendation shorts'], ['349K', 'YouTube views on them'], ['80.5K', 'Best: a new pirate RPG'], ['20K', 'Avg Instagram views per short']],
    quote: 'Recommendation shorts that tell RPG fans what to play next: "Disco Elysium meets Groundhog Day", "Minecraft meets Skyrim", the game that inspired The Witcher. Built for the weeks before launch, when players decide what to wishlist.',
    games: [['Indie RPGs', 14], ['The Elder Scrolls', 3], ['Expedition 33', 2], ['Gothic', 2], ['Kingdom Come', 2], ['Disco Elysium', 1], ['The Witcher', 1], ['Dune: Awakening', 1]],
    vids: [
      { id: '_9Is1YQnRpA', t: 'NetEase Games Are Making A New Pirate RPG! (Sea Of Remnants)', views: 80464, d: 'Jun 2025', short: true },
      { id: 'UIv3BGLv9Ps', t: 'This Game Is Minecraft But As An RPG And In The Sky! (Everwind)', views: 33067, d: 'Aug 2025', short: true },
      { id: 'eX00Oz2DJr4', t: 'The Witcher Series Was Inspired By A Game That Was Never Finished', views: 31746, d: 'Apr 2026', short: true },
      { id: 'n4YnTE-zj1o', t: 'Minecraft Meets Skyrim!', views: 21478, d: 'Mar 2026', short: true },
      { id: 'GIPhirAUAnc', t: 'Does Dune Awakening Deserve A Second Chance?', views: 13904, d: 'Feb 2026', short: true },
      { id: '7n-vIdH53KI', t: 'Disco Elysium Meets Groundhog Day!', views: 10604, d: 'Nov 2025', short: true },
      { id: 'i2QOKOwzzUA', t: 'Clair Obscur: Expedition 33 Has Reached A Massive Milestone!', views: 6296, d: 'May 2025', short: true }
    ]
  },
  {
    name: 'Gem Gaming Network', initials: 'GG', avatar: AV.gem, meta: 'United States / 137K followers',
    nums: [['13', 'RPG shorts'], ['1.35M', 'YouTube views on them'], ['1.27M', 'Best: Cyberpunk 2077'], ['2', 'Paid RPG shorts in 2026']],
    quote: 'Quick-hook shorts for a young adult audience. His Cyberpunk 2077 short passed 1.2M views on YouTube alone, and RPG studios already book him: paid shorts for Dune: Awakening and a realistic RPG in 2026.',
    games: [['Cyberpunk 2077', 4], ['Indie RPGs', 4], ['Hogwarts Legacy', 2], ['Dune: Awakening', 2]],
    vids: [
      { id: 'o2VRyQUDSZA', t: 'Cyberpunk Edgerunners is CARRYING!', views: 1265796, d: 'Oct 2022', short: true },
      { id: 'C5fJ5lLggyk', t: 'This Realistic RPG Game Shocked Me #ad', views: 23155, d: 'Jun 2026', short: true },
      { id: 'l6ND-0z-eaI', t: 'This Game is a Masterpiece for RPG Enjoyers', views: 17277, d: 'Jun 2026', short: true },
      { id: 'h5hJpyTZk6s', t: 'Me 10 Seconds Into Hogwarts Legacy!', views: 12161, d: 'Feb 2023', short: true },
      { id: 'PkOzRrUtVKE', t: '[AD] Dune Awakening has Released on Consoles', views: 6848, d: 'Sep 2026', short: true }
    ]
  },
  {
    name: 'David Jaffe', initials: 'DJ', avatar: AV.jaffe, meta: 'United States / 66K followers / creator of God of War',
    nums: [['129', 'RPG videos'], ['764K', 'Views on them'], ['28', 'Elden Ring videos'], ['11.7K', 'Best: Baldur\'s Gate 3']],
    quote: 'The creator of God of War talks RPGs as a designer: why Baldur\'s Gate 3 shook up AAA development, an honest Diablo IV review, Expedition 33\'s awards and live plays of Dune: Awakening. He has played Vermintide 2 with his kid and covered Space Marine 2 from Gamescom.',
    games: [['Starfield', 32], ['Elden Ring', 28], ['Diablo', 11], ['Cyberpunk 2077', 11], ['Dragon Age', 10], ['Baldur\'s Gate 3', 6], ['Dune: Awakening', 5], ['Warhammer', 2]],
    vids: [
      { id: 'J7v-OjqDKHU', t: 'Baldur\'s Gate 3 vs. AAA Devs vs. IGN: My Response', views: 11685, d: 'Aug 2023' },
      { id: 'a1c0Z87xL6s', t: 'The Only HONEST Diablo 4 Review', views: 8769, d: 'Jun 2023' },
      { id: '0I5AXN2_y7w', t: 'DUNE AWAKENING: FEAR IS THE MIND KILLER!', views: 5771, d: 'Sep 2026' },
      { id: 'z_mYgoWr_S4', t: 'ROBBED?! Expedition 33 STRIPPED of GOTY AWARD!', views: 4336, d: 'Dec 2025' },
      { id: '8yImnb49gYA', t: 'BALDUR\'S GATE CEO GAME AWARD SPEECH: Harmful or Inspiring?', views: 4117, d: 'Dec 2024' },
      { id: 'a531k3myOek', t: 'SILENT HILL 2, AVOWED, SPACE MARINE 2 DEEP DIVES GAMESCOM!', views: 3109, d: 'Aug 2024', wh: true },
      { id: 'jQm-7tykgHg', t: 'THEY ARE HERE DEMO (w/ my kid!) And VERMINTIDE 2!', views: 2813, d: 'Jun 2021', wh: true }
    ]
  },
  {
    name: 'Ettnix', initials: 'ET', avatar: AV.ett, meta: 'Sweden / 167K followers', twitch: true,
    nums: [['1,430', 'Hours of RPG streams'], ['404K', 'Hours watched on them'], ['3,556', 'Peak viewers, Mistfall Hunter'], ['47%', 'Of his stream time']],
    quote: 'Known for FPS, but nearly half of his last twelve months live went to RPGs: Mistfall Hunter, AION 2, Torchlight: Infinite, Last Epoch, Diablo IV and Titan Quest II. Dark Heresy\'s online co-op is made for a launch stream.',
    games: [],
    rows: [
      ['Mistfall Hunter', 421, 290075, 3556],
      ['AION 2', 272, 40905, 554],
      ['Farever', 154, 20938, 256],
      ['SpiritVale', 113, 14291, 213],
      ['Torchlight: Infinite', 109, 4798, 348],
      ['The Quinfall', 85, 8743, 210],
      ['ArcheAge Chronicles', 55, 7730, 279],
      ['Last Epoch', 31, 1620, 83],
      ['Diablo IV', 14, 569, 73],
      ['Titan Quest II', 6, 553, 138]
    ]
  }
];

var CREATORS = [
  {
    country: 'uk', name: 'RageGamingVideos', initials: 'RG', avatar: AV.rage, meta: 'United Kingdom / 1.43M subscribers',
    hook: 'One of YouTube\'s go-to guide channels for big RPGs. 88 videos in the last 30 days.',
    idea: 'A full guide playlist, from the beta to the endgame build.',
    stats: [['73K', 'Avg views'], ['88', 'Videos, 30 days'], ['1.43M', 'Subscribers']],
    total: ['73K', 'Per long-form video'],
    kit: 'https://july.bio/ragegamingvideos',
    channels: [['YouTube', 'https://www.youtube.com/@RageGamingVideos']]
  },
  {
    country: 'uk', name: 'Captain Eggcellent', initials: 'CE', avatar: AV.cap, meta: 'United Kingdom / 1.6M followers',
    hook: 'The Easter egg king. Shorts that reach 237K views on average across four platforms, with single videos up to 2M.',
    idea: 'Hidden details and lore in the Calixis Sector, once the game is out.',
    stats: [['48K', 'YT Shorts'], ['56K', 'TikTok'], ['105K', 'Instagram'], ['28K', 'Facebook']],
    total: ['237K', 'Per short, all platforms'],
    kit: 'https://july.bio/CaptainEggcellent',
    channels: [['YouTube', 'https://www.youtube.com/@captaineggcellentbutshorter'], ['TikTok', 'https://www.tiktok.com/@captaineggcellent'], ['Instagram', 'https://www.instagram.com/captaineggcellent/'], ['Facebook', 'https://www.facebook.com/captaineggcellent']]
  },
  {
    country: 'ca', name: 'Retro For The First Time', initials: 'RF', avatar: AV.retro, meta: 'Canada / 244K followers',
    hook: 'Daily gaming news, always on camera. 53 Shorts in the last 30 days.',
    idea: 'Beta, pre-order and launch news, the moment it lands.',
    stats: [['37K', 'YT Shorts'], ['16K', 'TikTok'], ['9K', 'Instagram'], ['5K', 'Facebook']],
    total: ['67K', 'Per short, all platforms'],
    kit: 'https://july.bio/rftft',
    channels: [['YouTube', 'https://www.youtube.com/@RetroForTheFirstTime'], ['TikTok', 'https://www.tiktok.com/@retroforthefirsttime'], ['Instagram', 'https://www.instagram.com/retroftft'], ['Facebook', 'https://www.facebook.com/retroforthefirsttime']]
  },
  {
    country: 'us', name: 'Cloudual', initials: 'CL', avatar: AV.cloud, meta: 'United States / 109K followers',
    hook: 'On camera in every video, with co-op and RPG news for a highly engaged audience. Reels up to 17M views.',
    idea: 'Two acolytes, one investigation: Dark Heresy\'s online co-op.',
    stats: [['10K', 'YT Shorts'], ['8K', 'TikTok'], ['33K', 'Instagram'], ['54K', 'Facebook']],
    total: ['104K', 'Per short, all platforms'],
    kit: 'https://july.bio/cloudual',
    channels: [['YouTube', 'https://www.youtube.com/@Cloudual'], ['TikTok', 'https://www.tiktok.com/@cloudual'], ['Instagram', 'https://www.instagram.com/cloudual'], ['Facebook', 'https://www.facebook.com/profile.php?id=61560614766005']]
  },
  {
    country: 'us', name: 'Gem Gaming Network', initials: 'GG', avatar: AV.gem, meta: 'United States / 137K followers',
    hook: 'Daily game discovery for a young adult audience, posting on four platforms.',
    idea: '"Play as an Inquisitor who decides who is a heretic", in Gem\'s quick-hook format.',
    stats: [['9K', 'YT Shorts'], ['13K', 'TikTok'], ['14K', 'Instagram'], ['5K', 'Facebook']],
    total: ['41K', 'Per short, all platforms'],
    kit: 'https://july.bio/gemgamingnetwork',
    channels: [['YouTube', 'https://www.youtube.com/@gemgamingnetwork'], ['TikTok', 'https://www.tiktok.com/@gemgamingnetwork'], ['Instagram', 'https://www.instagram.com/gemgamingnetwork'], ['Facebook', 'https://www.facebook.com/gemgamingnetwork']]
  },
  {
    country: 'au', name: 'Games Explorer', initials: 'GE', avatar: AV.exp, meta: 'Australia / 194K followers',
    hook: 'Recommendation Shorts that help players find their next game, built for the weeks before launch.',
    idea: '"Baldur\'s Gate 3 fans, this is your next RPG": hype that turns into wishlists.',
    stats: [['16K', 'YT Shorts'], ['9K', 'TikTok'], ['20K', 'Instagram'], ['1K', 'Facebook']],
    total: ['45K', 'Per short, all platforms'],
    kit: 'https://july.bio/gamesexplorer',
    channels: [['YouTube', 'https://www.youtube.com/@explorerdotgames'], ['TikTok', 'https://www.tiktok.com/@explorerdotgames'], ['Instagram', 'https://www.instagram.com/explorer.games'], ['Facebook', 'https://www.facebook.com/explorerdotgames']]
  },
  {
    country: 'us', name: 'David Jaffe', initials: 'DJ', avatar: AV.jaffe, meta: 'San Diego, California / 66K followers',
    hook: 'Creator of God of War, co-creator of Twisted Metal. When he covers a game, it is a headline. An older, hardcore audience that listens.',
    idea: 'A game designer\'s take on Owlcat\'s investigation system, live with VOD.',
    stats: [['5K', 'YouTube'], ['2K', 'Instagram'], ['500', 'TikTok']],
    total: ['8K', 'Per video, all platforms'],
    kit: 'https://july.bio/davidjaffe',
    channels: [['YouTube', 'https://www.youtube.com/@DavidJaffeGames'], ['Twitch', 'https://www.twitch.tv/jaffegamesontwitch'], ['TikTok', 'https://www.tiktok.com/@gabbinandgames'], ['Instagram', 'https://www.instagram.com/davidscottjaffe/']]
  },
  {
    country: 'se', name: 'Ettnix', initials: 'ET', avatar: AV.ett, meta: 'Sweden / 167K followers',
    hook: 'Veteran FPS and RPG streamer with nearly 14 years live. 1,430 hours of RPG streams in the last twelve months.',
    idea: 'A launch-day stream for his RPG audience, in online co-op.',
    stats: [['152K', 'Twitch followers'], ['347K', 'Watch hours'], ['12K', 'YouTube subs']],
    total: ['174', 'Average viewers per stream'],
    kit: 'https://july.bio/ettnix',
    channels: [['Twitch', 'https://www.twitch.tv/ettnix'], ['YouTube', 'https://www.youtube.com/@Ettnix'], ['Instagram', 'https://www.instagram.com/ettnix']]
  }
];

// Example budget. Option A: guide series part 1 (episodes 1 to 4). Option B: the full series (episodes 1 to 8).
// The launch round and streams are the same in both. Views from the plain 30-day averages above.
var BUDGET = [
  { tag: 'Option A', who: 'RageGamingVideos', what: 'Guide series part 1: 4 dedicated YouTube videos (episodes 1 to 4), before launch to launch week', price: 28000, views: '~292,000' },
  { tag: 'Option B', who: 'RageGamingVideos', what: 'The full guide series: 8 dedicated YouTube videos (episodes 1 to 8), before launch to week four', price: 56000, views: '~584,000' },
  { who: 'Captain Eggcellent', what: 'Short on YouTube, TikTok, Instagram and Facebook: hidden details and lore, launch week', price: 6500, views: '~237,000' },
  { who: 'Cloudual', what: 'Short on YouTube, TikTok, Instagram and Facebook: online co-op on launch day', price: 2600, views: '~104,000' },
  { who: 'Retro For The First Time', what: 'Short on YouTube, TikTok, Instagram and Facebook: launch news', price: 2600, views: '~67,000' },
  { who: 'Games Explorer', what: 'Short on YouTube, TikTok, Instagram and Facebook: "your next RPG" recommendation', price: 2600, views: '~45,000' },
  { who: 'Gem Gaming Network', what: 'Short on YouTube, TikTok, Instagram and Facebook: launch day first look', price: 2600, views: '~41,000' },
  { who: 'David Jaffe', what: '1 hour live stream + VOD on launch day: a game designer\'s take', price: 2500, views: '~8,000' },
  { who: 'Ettnix', what: '4 hour launch stream on Twitch, USD 300 per hour', price: 1200, views: '~174 avg viewers' },
  { sub: true, who: 'Organic subtotal', what: 'Option A / Option B', price: '48,600 / 76,600', views: '~794K / ~1.09M' },
  { ads: true, who: 'TikTok Spark Ads (example)', what: 'RPG and strategy interest, 18 to 44, US, Canada and UK. Also the fallback plan.', price: 5000, views: '~330,000 to 500,000' },
  { total: true, who: 'Total', what: 'Option A / Option B', price: '53,600 / 81,600', views: '~1.12M to 1.29M / ~1.42M to 1.59M' }
];

var METHOD = [
  'RPG and Warhammer history: each channel\'s full YouTube upload history, pulled on November 27, 2026. A video counts when its title names a Warhammer game or an RPG (Baldur\'s Gate 3, Diablo, Path of Exile, Elden Ring, Divinity, The Elder Scrolls, Gothic, Expedition 33 and others), or uses the word RPG. Videos that only name a game in their tags are left out, and so are a few title matches that were not about RPGs.',
  'Views on this page are YouTube views on November 27, 2026. Most short-form creators also post the same shorts on TikTok, Instagram and Facebook, so their real totals are higher.',
  'Ettnix: Twitch statistics from SullyGnome for the last 365 days, pulled on November 27, 2026. RPG means role-playing, action RPG and MMORPG games.',
  'Creator averages: plain average views per video over the last 30 days, pulled on November 18, 2026. Every video counts. Nothing is removed at the top or the bottom. "All platforms" adds up each platform\'s average for one short posted everywhere.',
  'Followers: total across YouTube, TikTok, Instagram and Facebook, pulled on November 18, 2026. RageGamingVideos subscribers on November 27, 2026.',
  'Estimated views are estimates, not guarantees. Single videos can land above or below. RageGamingVideos\' Baldur\'s Gate 3 guides averaged 159K views each, so the 73K average used here is a careful baseline. Spark Ads ranges use 2026 TikTok benchmarks of USD 10 to 15 per 1,000 impressions.'
];
