import balzaks from './balzaks.svg';
import dima from './dima.svg';
import donkihots from './donkihots.svg';
import dostojevskis from './dostojevskis.svg';
import draizers from './draizers.svg';
import dzeks from './dzeks.svg';
import gabens from './gabens.svg';
import hakslijs from './hakslijs.svg';
import hamlets from './hamlets.svg';
import igo from './igo.svg';
import jesenins from './jesenins.svg';
import maksims from './maksims.svg';
import napoleons from './napoleons.svg';
import robespjers from './robespjers.svg';
import stirlics from './stirlics.svg';
import zukovs from './zukovs.svg';

type Personalities = {
  tipsImg: string;
  name: string;
  short: string;
  role: string;
  description: string;
};

export const PERSONALITIES: Personalities[] = [
  {
    tipsImg: balzaks,
    name: 'balzaks',
    short: 'ili',
    role: 'kritiķis',
    description: 'intuitīvi loģiskais introverts',
  },
  {
    tipsImg: dima,
    name: 'dimā',
    short: 'sei',
    role: 'starpnieks',
    description: 'sensori ētiskais introverts',
  },
  {
    tipsImg: donkihots,
    name: 'donkihots',
    short: 'ile',
    role: 'meklētājs',
    description: 'intuitīvi loģiskais ekstraverts',
  },
  {
    tipsImg: dostojevskis,
    name: 'dostojevskis',
    short: 'eii',
    role: 'humānists',
    description: 'ētiski intuitīvais introverts',
  },
  {
    tipsImg: draizers,
    name: 'draizers',
    short: 'esi',
    role: 'sargātājs',
    description: 'ētiski sensorais introverts',
  },
  {
    tipsImg: dzeks,
    name: 'džeks',
    short: 'lie',
    role: 'uzņēmējs',
    description: 'loģiski intuitīvais ekstraverts',
  },
  {
    tipsImg: gabens,
    name: 'gabēns',
    short: 'sli',
    role: 'amatnieks',
    description: 'sensori loģiskais introverts',
  },
  {
    tipsImg: hakslijs,
    name: 'hakslijs',
    short: 'iee',
    role: 'komunikators',
    description: 'intuitīvi ētiskais ekstraverts',
  },
  {
    tipsImg: hamlets,
    name: 'hamlets',
    short: 'eie',
    role: 'skolotājs',
    description: 'ētiski intuitīvais ekstraverts',
  },
  {
    tipsImg: igo,
    name: 'igo',
    short: 'ese',
    role: 'iedvesmotājs',
    description: 'etiski sensorais ekstraverts',
  },
  {
    tipsImg: jesenins,
    name: 'jeseņins',
    short: 'iei',
    role: 'motivētājs',
    description: 'intuitīvi ētiskais introverts',
  },
  {
    tipsImg: maksims,
    name: 'maksims',
    short: 'lsi',
    role: 'sistematizētājs',
    description: 'loģiski sensorais introverts',
  },
  {
    tipsImg: napoleons,
    name: 'napoleons',
    short: 'see',
    role: 'politiķis',
    description: 'sensori ētiskais ekstraverts',
  },
  {
    tipsImg: robespjers,
    name: 'robespjērs',
    short: 'lii',
    role: 'analītiķis',
    description: 'loģiski intuitīvais introverts',
  },
  {
    tipsImg: stirlics,
    name: 'štirlics',
    short: 'lse',
    role: 'administrētājs',
    description: 'loģiski sensorais ekstraverts',
  },
  {
    tipsImg: zukovs,
    name: 'žukovs',
    short: 'sle',
    role: 'rīkotājs',
    description: 'sensori loģiskais ekstraverts',
  },
];
