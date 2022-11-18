export const SMOKE = ['nesmēķēju', 'reti', 'ikdienā', 'elektronisko'];
export const ALCOHOL = ['nelietoju', 'svētkos', 'reizēm', 'regulāri'];
export const KIDS = ['nav', 'ir'];
export const EDUCATION = ['pamata', 'vidējā', 'augstākā', 'šobrīd studēju'];
export const BODY_TYPE = ['tievs', 'vidējs', 'atlētisks', 'liels'];
export const HOROSCOPE = [
  'ūdensvīrs',
  'zivs',
  'auns',
  'vērsis',
  'dvīņi',
  'vēzis',
  'lauva',
  'jaunava',
  'svari',
  'skorpions',
  'strēlnieks',
  'mežāzis',
];
export const GOALS = ['iepazīties', 'diskusijas', 'izklaide', 'sekss'];
export const GENDER = ['vīrietis', 'sieviete'];

export const SMOKE_SEARCH = ['nesmēķē', 'reti', 'ikdienā', 'elektronisko', 'nav svarīgi'];
export const ALCOHOL_SEARCH = ['nelieto', 'svētkos', 'reizēm', 'regulāri', 'nav svarīgi'];
export const KIDS_SEARCH = ['ir', 'nav', 'nav nozīmes'];
export const EDUCATION_SEARCH = ['pamata', 'vidējā', 'augstākā', 'šobrīd studē', 'nav svarīgi'];
export const LANGUAGE_SEARCH = ['Latviešu', 'Krievu', 'Angļu', 'cita'];

export const PAGIN_SIZE = 19;

export const TEST_QUESTIONS = [
  {
    question: 'q1',
    type: [
      'Kad apkārt ir cilvēki, jūtos enerģiskāk un labāk veicas darbs.',
      'Labāk veicas darbs, kad strādāju vienatnē.',
    ],
  },
  {
    question: 'q9',
    type: [
      'Mierīgs tikai tad, kad iesāktais ir pabeigts.',
      'Grūti pabeigt iesāktos darbus, varu atstāt iesākto uz nenotektu laku',
    ],
  },
  {
    question: 'q21',
    type: ['Labi orientējos loģiskās sistēmās.', 'Labi jūtu apkārtējo emocionālo noskaņojumu.'],
  },
  {
    question: 'q20',
    type: ['Visā balstos uz kritērijiem un aprēķiniem.', 'Izjūtu attiecības un simpātijas.'],
  },
  {
    question: 'q5',
    type: ['Labāk strādāju grupā.', 'Patīk strādāt vienatnē.'],
  },
  {
    question: 'q8',
    type: [
      'Labāk jūtos, ja esmu iepriekš sagatavojies situācijai',
      'Labāk jūtos, kad neplānojis rīkojos saskaņā ar situāciju',
    ],
  },
  {
    question: 'q22',
    type: ['Dzīvoju vairāk ar prātu, nekā ar sirdi.', 'Dzīvoju vairāk ar sirdi, nekā ar prātu.'],
  },
  {
    question: 'q2',
    type: [
      'Viegi uzsāku kontaktu ar nepazīstamiem cilvēkiem.',
      'Parasti pirmais neuzsāku kontaktu va ir grūtības to darīt.',
    ],
  },
  {
    question: 'q18',
    type: ['Emocijas nekad mani dziļi neskar.', 'Es esmu pārdzīvojumu un jūtu cilvēks.'],
  },
  {
    question: 'q10',
    type: [
      'Piemīt vienmērīgas darba spējas.',
      'Dzīvoju ar darba spēju ritmiskiem pacēlumiem un kritumiem',
    ],
  },
  {
    question: 'q4',
    type: [
      'Savu darbības lauku brīvi paplašinu, uzņemos jaunas lietas.',
      'Savu darbību veicu šaurās jomās, bet padziļināti.',
    ],
  },
  {
    question: 'q15',
    type: ['Vairāk īstenoju, nekā ieceru.', 'Vairāk ieceru, nekā īstenoju.'],
  },
  {
    question: 'q16',
    type: [
      'Ja nekas nav skaidrs, aktīvi ievācu informāciju.',
      'Ja nekas nav skaidrs, paļaujos uz savu intuīciju.',
    ],
  },
  {
    question: 'q19',
    type: [
      'Apkārtējie vairāk novērtē manu loģiskumu.',
      'Apkārtējie vairāk novērtē manu cilvēciskumu.',
    ],
  },
  {
    question: 'q17',
    type: [
      'Labāk orientējos darbā ar taustāmām lietām.',
      'Labāk orientējos darbā ar netaustāmām lietām.',
    ],
  },
  {
    question: 'q14',
    type: [
      'Veiksmīgi nodarbojos ar to, kas ir pārbaudīts un drošs.',
      'Efektīvs neparastā, nesaprotamā, jaunās nezināmās lietās.',
    ],
  },
  {
    question: 'q12',
    type: [
      'Vairāk dzīvoju šodienai un tuvākai nākotnei.',
      'Daru lietas nākotnes attīstībai, kavējos gan atmiņās, gan nākotnes vīzijās.',
    ],
  },
  {
    question: 'q6',
    type: [
      'Patīk, kad apstākļi nemainās bieži. Rutīna netraucē.',
      'Patīk apstākļu maiņa, dzīvē bieži kaut kas jāpamaina, lai būtu interesanti.',
    ],
  },
  {
    question: 'q7',
    type: [
      'Secīgs un drošs, bet pietrūkst elastības.',
      'Elastīgs un mainīgs, bet nepietiek secīguma.',
    ],
  },
  {
    question: 'q3',
    type: [
      'Man ir liels paziņu un draugu loks. Brīvi komunicēju un to nepārtraukti paplašinu.',
      'Man ir neliels draugu un paziņu loks.',
    ],
  },
];
export type Interests = {
  icon: string;
  name: string;
};

export const INTERESTS: Interests[] = [
  {
    icon: 'simple-icons:yourtraveldottv',
    name: 'ceļošana',
  },
  {
    icon: 'ls:cookpad',
    name: 'gatavošana',
  },
  {
    icon: 'la:tv',
    name: 'filmas, tv',
  },
  {
    icon: 'mdi:dance-ballroom',
    name: 'dejot',
  },

  {
    icon: 'ic:outline-sports-esports',
    name: 'spēles',
  },
  {
    icon: 'ion:car-sport-outline',
    name: 'auto',
  },
  {
    icon: 'map:fishing-pier',
    name: 'makšķerēt',
  },
  {
    icon: 'jam:shopify-square',
    name: 'iepirkties',
  },
  {
    icon: 'wpf:books',
    name: 'lasīt',
  },
  {
    icon: 'icon-park-outline:replay-music',
    name: 'mūzika',
  },
  {
    icon: 'fluent:animal-cat-28-regular',
    name: 'kaķi',
  },
  {
    icon: 'fluent:animal-dog-24-regular',
    name: 'suņi',
  },
  {
    icon: 'fontisto:holiday-village',
    name: 'atpūta',
  },
  {
    icon: 'icon-park-outline:sport',
    name: 'skriešana',
  },
  {
    icon: 'iconoir:cycling',
    name: 'riteņbraukšana',
  },
  {
    icon: 'mdi:ski',
    name: 'slēpošana',
  },
  {
    icon: 'ic:sharp-fitness-center',
    name: 'fitness',
  },
  {
    icon: 'emojione-monotone:ice-hockey',
    name: 'hokejs',
  },
  {
    icon: 'fluent:sport-24-regular',
    name: 'sports',
  },
  {
    icon: 'carbon:drop-photo',
    name: 'fotogrāfēt',
  },
];
export const PERSONALITIES = [
  'draizers',
  'hamlets',
  'džeks',
  'donkihots',
  'dimā',
  'igo',
  'robespjērs',
  'maksims',
  'žukovs',
  'jeseņins',
  'napoleons',
  'balzaks',
  'štirlics',
  'dostojevskis',
  'hakslijs',
  'gabēns',
];
