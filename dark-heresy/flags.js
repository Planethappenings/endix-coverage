var STAR_PTS = '0,-3.08 .69,-.95 2.93,-.95 1.12,.36 1.81,2.49 0,1.18 -1.81,2.49 -1.12,.36 -2.93,-.95 -.69,-.95';
var US_STARS = '';
for (var _r = 1; _r <= 9; _r++) { for (var _c = 1; _c <= 11; _c++) { if ((_r + _c) % 2 === 0) { US_STARS += "<polygon fill='#fff' points='" + STAR_PTS + "' transform='translate(" + (_c * 6.333).toFixed(2) + "," + (_r * 5.385).toFixed(2) + ")'/>";  } } }

var COUNTRIES = {
  uk: {
    name: 'United Kingdom', html: '&#127468;&#127463;',
    svgFlag: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30' preserveAspectRatio='xMinYMin meet'><rect width='60' height='30' fill='#012169'/><path d='M0,0 L60,30 M60,0 L0,30' stroke='#fff' stroke-width='6'/><path d='M0,0 L27,12 M33,18 L60,30 M60,0 L33,12 M27,18 L0,30' stroke='#C8102E' stroke-width='4'/><rect x='24' width='12' height='30' fill='#fff'/><rect y='9' width='60' height='12' fill='#fff'/><rect x='26' width='8' height='30' fill='#C8102E'/><rect y='11' width='60' height='8' fill='#C8102E'/></svg>"
  },
  us: {
    name: 'United States', html: '&#127482;&#127480;',
    svgFlag: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 190 100' preserveAspectRatio='xMinYMin meet'><rect width='190' height='100' fill='#fff'/><rect y='0' width='190' height='7.7' fill='#B22234'/><rect y='15.4' width='190' height='7.7' fill='#B22234'/><rect y='30.8' width='190' height='7.7' fill='#B22234'/><rect y='46.2' width='190' height='7.7' fill='#B22234'/><rect y='61.5' width='190' height='7.7' fill='#B22234'/><rect y='76.9' width='190' height='7.7' fill='#B22234'/><rect y='92.3' width='190' height='7.7' fill='#B22234'/><rect width='76' height='53.8' fill='#3C3B6E'/>" + US_STARS + "</svg>"
  },
  ca: {
    name: 'Canada', html: '&#127464;&#127462;',
    svgFlag: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9600 4800' preserveAspectRatio='xMinYMin meet'><path fill='#d52b1e' d='m0 0h2400l99 99h4602l99-99h2400v4800h-2400l-99-99h-4602l-99 99H0z'/><path fill='#fff' d='m2400 0h4800v4800h-4800zm2490 4430-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z'/></svg>"
  },
  au: {
    name: 'Australia', html: '&#127462;&#127482;',
    svgFlag: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10080 5040' preserveAspectRatio='xMinYMin meet'><defs><clipPath id='auC1'><path d='M0,0H6V3H0z'/></clipPath><clipPath id='auC2'><path d='M0,0V1.5H6V3H6zM6,0H3V3H0V3z'/></clipPath><path id='auS7' d='M0,-360 69.421398,-144.155019 281.459334,-224.456329 155.988466,-35.603349 350.974048,80.107536 125.093037,99.758368 156.198146,324.348792 0,160 -156.198146,324.348792 -125.093037,99.758368 -350.974048,80.107536 -155.988466,-35.603349 -281.459334,-224.456329 -69.421398,-144.155019z'/><path id='auS5' d='M0,-210 54.859957,-75.508253 199.721868,-64.893569 88.765275,28.841586 123.434903,169.893569 0,93.333333 -123.434903,169.893569 -88.765275,28.841586 -199.721868,-64.893569 -54.859957,-75.508253z'/></defs><g transform='scale(840)'><rect width='12' height='6' fill='#00008b'/><path d='M0,0 6,3M6,0 0,3' stroke='#fff' stroke-width='0.6' clip-path='url(#auC1)'/><path d='M0,0 6,3M6,0 0,3' stroke='#f00' stroke-width='0.4' clip-path='url(#auC2)'/><path d='M3,0V3M0,1.5H6' stroke='#fff'/><path d='M3,0V3M0,1.5H6' stroke='#f00' stroke-width='0.6'/></g><g fill='#fff'><use href='#auS7' transform='translate(2520,3780) scale(2.1)'/><use href='#auS7' x='7560' y='4200'/><use href='#auS7' x='6300' y='2205'/><use href='#auS7' x='7560' y='840'/><use href='#auS7' x='8680' y='1869'/><use href='#auS5' x='8064' y='2730'/></g></svg>"
  },
  de: {
    name: 'Germany', html: '&#127465;&#127466;',
    svgFlag: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2' preserveAspectRatio='xMinYMin meet'><rect width='3' height='0.667' fill='#000'/><rect y='0.667' width='3' height='0.667' fill='#DD0000'/><rect y='1.333' width='3' height='0.667' fill='#FFCE00'/></svg>"
  },
  se: {
    name: 'Sweden', html: '&#127480;&#127466;',
    svgFlag: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10' preserveAspectRatio='xMinYMin meet'><rect width='16' height='10' fill='#006AA7'/><rect x='4' width='3' height='10' fill='#FECC02'/><rect y='3.5' width='16' height='3' fill='#FECC02'/></svg>"
  }
};
