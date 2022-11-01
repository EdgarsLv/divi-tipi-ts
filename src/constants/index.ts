export type Relations = {
  key: string;
  name: string;
  description: string;
};

export const RELATIONS = [
  { key: 'D', name: 'duālās', description: 'Saderīgas attiecības' },
  { key: 'A', name: 'aktivācijas', description: 'Saderīgas attiecības' },
  { key: 'M', name: 'mirāžas', description: 'Saderīgas attiecības' },
  { key: 'pd', name: 'pusduālās', description: 'Saderīgas attiecības' },
  { key: 'V', name: 'vienādās', description: 'Lietišķas attiecības' },
  { key: 'S', name: 'spoguļa', description: 'Lietišķas attiecības' },
  { key: 'd', name: 'darba', description: 'Lietišķas attiecības' },
  { key: 'šv', name: 'šķietami vienādo', description: 'Lietišķas attiecības' },
  { key: 'pp', name: 'pilnīga pretstata', description: 'Nesaderigas attiecības' },
  { key: 'se', name: 'super ego', description: 'Nesaderigas attiecības' },
  { key: 'sp', name: 'sociālā pasūtījuma', description: 'Nesaderigas attiecības' },
  { key: 're', name: 'revīzijas', description: 'Nesaderigas attiecības' },
  { key: 'K', name: 'konflikta', description: 'Nesaderigas attiecības' },
  { key: 'ra', name: 'radniecīgo', description: 'Nesaderigas attiecības' },
];

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
