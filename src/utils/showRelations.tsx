import { Tooltip } from '@mui/material';

export const setRelations = (value: string) => {
  switch (value) {
    //   vienādās
    case 'donkihots:donkihots':
    case 'dimā:dimā':
    case 'igo:igo':
    case 'robespjērs:robespjērs':
    case 'hamlets:hamlets':
    case 'maksims:maksims':
    case 'žukovs:žukovs':
    case 'jeseņins:jeseņins':
    case 'napoleons:napoleons':
    case 'balzaks:balzaks':
    case 'džeks:džeks':
    case 'draizers:draizers':
    case 'štirlics:štirlics':
    case 'dostojevskis:dostojevskis':
    case 'hakslijs:hakslijs':
    case 'gabēns:gabēns':
      return 'vienādās';
    //   duālās
    case 'donkihots:dimā':
    case 'dimā:donkihots':
    case 'robespjērs:igo':
    case 'igo:robespjērs':
    case 'maksims:hamlets':
    case 'hamlets:maksims':
    case 'jeseņins:žukovs':
    case 'žukovs:jeseņins':
    case 'balzaks:napoleons':
    case 'napoleons:balzaks':
    case 'draizers:džeks':
    case 'džeks:draizers':
    case 'dostojevskis:štirlics':
    case 'štirlics:dostojevskis':
    case 'gabēns:hakslijs':
    case 'hakslijs:gabēns':
      return 'duālās';
    //   aktivācijas
    case 'donkihots:igo':
    case 'igo:donkihots':
    case 'robespjērs:dimā':
    case 'dimā:robespjērs':
    case 'žukovs:hamlets':
    case 'hamlets:žukovs':
    case 'maksims:jeseņins':
    case 'jeseņins:maksims':
    case 'džeks:napoleons':
    case 'napoleons:džeks':
    case 'draizers:balzaks':
    case 'balzaks:draizers':
    case 'hakslijs:štirlics':
    case 'štirlics:hakslijs':
    case 'gabēns:dostojevskis':
    case 'dostojevskis:gabēns':
      return 'aktivācijas';
    //   spoguļa
    case 'donkihots:robespjērs':
    case 'robespjērs:donkihots':
    case 'igo:dimā':
    case 'dimā:igo':
    case 'jeseņins:hamlets':
    case 'hamlets:jeseņins':
    case 'žukovs:maksims':
    case 'maksims:žukovs':
    case 'draizers:napoleons':
    case 'napoleons:draizers':
    case 'džeks:balzaks':
    case 'balzaks:džeks':
    case 'gabēns:štirlics':
    case 'štirlics:gabēns':
    case 'dostojevskis:hakslijs':
    case 'hakslijs:dostojevskis':
      return 'spoguļa';
    // darba
    case 'donkihots:žukovs':
    case 'žukovs:donkihots':
    case 'jeseņins:dimā':
    case 'dimā:jeseņins':
    case 'štirlics:igo':
    case 'igo:štirlics':
    case 'dostojevskis:robespjērs':
    case 'robespjērs:dostojevskis':
    case 'džeks:hamlets':
    case 'hamlets:džeks':
    case 'draizers:maksims':
    case 'maksims:draizers':
    case 'napoleons:hakslijs':
    case 'hakslijs:napoleons':
    case 'gabēns:balzaks':
    case 'balzaks:gabēns':
      return 'darba';
    //   mirāžas
    case 'donkihots:jeseņins':
    case 'jeseņins:donkihots':
    case 'dimā:žukovs':
    case 'žukovs:dimā':
    case 'igo:dostojevskis':
    case 'dostojevskis:igo':
    case 'robespjērs:štirlics':
    case 'štirlics:robespjērs':
    case 'hamlets:draizers':
    case 'draizers:hamlets':
    case 'maksims:džeks':
    case 'džeks:maksims':
    case 'napoleons:gabēns':
    case 'gabēns:napoleons':
    case 'balzaks:hakslijs':
    case 'hakslijs:balzaks':
      return 'mirāžas';
    //   superego
    case 'donkihots:napoleons':
    case 'napoleons:donkihots':
    case 'dimā:balzaks':
    case 'balzaks:dimā':
    case 'igo:džeks':
    case 'džeks:igo':
    case 'robespjērs:draizers':
    case 'draizers:robespjērs':
    case 'hamlets:štirlics':
    case 'štirlics:hamlets':
    case 'maksims:dostojevskis':
    case 'dostojevskis:maksims':
    case 'žukovs:hakslijs':
    case 'hakslijs:žukovs':
    case 'jeseņins:gabēns':
    case 'gabēns:jeseņins':
      return 'super ego';
    //   pilnīgi pretējās
    case 'donkihots:balzaks':
    case 'balzaks:donkihots':
    case 'dimā:napoleons':
    case 'napoleons:dimā':
    case 'igo:draizers':
    case 'draizers:igo':
    case 'robespjērs:džeks':
    case 'džeks:robespjērs':
    case 'hamlets:dostojevskis':
    case 'dostojevskis:hamlets':
    case 'maksims:štirlics':
    case 'štirlics:maksims':
    case 'žukovs:gabēns':
    case 'gabēns:žukovs':
    case 'jeseņins:hakslijs':
    case 'hakslijs:jeseņins':
      return 'pilnīga pretstata';
    //   šķietami vienādo
    case 'donkihots:džeks':
    case 'džeks:donkihots':
    case 'dimā:draizers':
    case 'draizers:dimā':
    case 'igo:napoleons':
    case 'napoleons:igo':
    case 'robespjērs:balzaks':
    case 'balzaks:robespjērs':
    case 'hamlets:hakslijs':
    case 'hakslijs:hamlets':
    case 'maksims:gabēns':
    case 'gabēns:maksims':
    case 'žukovs:štirlics':
    case 'štirlics:žukovs':
    case 'jeseņins:dostojevskis':
    case 'dostojevskis:jeseņins':
      return 'šķietami vienādo';
    //   konflikta
    case 'donkihots:draizers':
    case 'draizers:donkihots':
    case 'dimā:džeks':
    case 'džeks:dimā':
    case 'igo:balzaks':
    case 'balzaks:igo':
    case 'robespjērs:napoleons':
    case 'napoleons:robespjērs':
    case 'hamlets:gabēns':
    case 'gabēns:hamlets':
    case 'maksims:hakslijs':
    case 'hakslijs:maksims':
    case 'žukovs:dostojevskis':
    case 'dostojevskis:žukovs':
    case 'jeseņins:štirlics':
    case 'štirlics:jeseņins':
      return 'konflikta';
    //   pārraidītājs
    case 'donkihots:hamlets':
    case 'dimā:maksims':
    case 'igo:hakslijs':
    case 'robespjērs:gabēns':
    case 'hamlets:napoleons':
    case 'maksims:balzaks':
    case 'žukovs:igo':
    case 'jeseņins:robespjērs':
    case 'napoleons:štirlics':
    case 'balzaks:dostojevskis':
    case 'džeks:žukovs':
    case 'draizers:jeseņins':
    case 'štirlics:donkihots':
    case 'dostojevskis:dimā':
    case 'hakslijs:džeks':
    case 'gabēns:draizers':
    case 'donkihots:štirlics':
    case 'dimā:dostojevskis':
    case 'igo:žukovs':
    case 'robespjērs:jeseņins':
    case 'hamlets:donkihots':
    case 'maksims:dimā':
    case 'žukovs:džeks':
    case 'jeseņins:draizers':
    case 'napoleons:hamlets':
    case 'balzaks:maksims':
    case 'džeks:hakslijs':
    case 'draizers:gabēns':
    case 'štirlics:napoleons':
    case 'dostojevskis:balzaks':
    case 'hakslijs:igo':
    case 'gabēns:robespjērs':
      // return "uztvērējs";
      return 'sociālā pasūtījuma';
    //   revidents
    case 'donkihots:dostojevskis':
    case 'dimā:štirlics':
    case 'igo:jeseņins':
    case 'robespjērs:žukovs':
    case 'hamlets:dimā':
    case 'maksims:donkihots':
    case 'žukovs:draizers':
    case 'jeseņins:džeks':
    case 'napoleons:maksims':
    case 'balzaks:hamlets':
    case 'džeks:gabēns':
    case 'draizers:hakslijs':
    case 'štirlics:balzaks':
    case 'dostojevskis:napoleons':
    case 'hakslijs:robespjērs':
    case 'gabēns:igo':
    case 'donkihots:maksims':
    case 'dimā:hamlets':
    case 'igo:gabēns':
    case 'robespjērs:hakslijs':
    case 'hamlets:balzaks':
    case 'maksims:napoleons':
    case 'žukovs:robespjērs':
    case 'jeseņins:igo':
    case 'napoleons:dostojevskis':
    case 'balzaks:štirlics':
    case 'džeks:jeseņins':
    case 'draizers:žukovs':
    case 'štirlics:dimā':
    case 'dostojevskis:donkihots':
    case 'hakslijs:draizers':
    case 'gabēns:džeks':
      return 'revīzijas';
    //   radniecīgo
    case 'donkihots:hakslijs':
    case 'hakslijs:donkihots':
    case 'dimā:gabēns':
    case 'gabēns:dimā':
    case 'igo:hamlets':
    case 'hamlets:igo':
    case 'robespjērs:maksims':
    case 'maksims:robespjērs':
    case 'žukovs:napoleons':
    case 'napoleons:žukovs':
    case 'jeseņins:balzaks':
    case 'balzaks:jeseņins':
    case 'džeks:štirlics':
    case 'štirlics:džeks':
    case 'draizers:dostojevskis':
    case 'dostojevskis:draizers':
      return 'radniecīgo';
    //   pusduālās
    case 'donkihots:gabēns':
    case 'gabēns:donkihots':
    case 'dimā:hakslijs':
    case 'hakslijs:dimā':
    case 'igo:maksims':
    case 'maksims:igo':
    case 'robespjērs:hamlets':
    case 'hamlets:robespjērs':
    case 'žukovs:balzaks':
    case 'balzaks:žukovs':
    case 'jeseņins:napoleons':
    case 'napoleons:jeseņins':
    case 'džeks:dostojevskis':
    case 'dostojevskis:džeks':
    case 'draizers:štirlics':
    case 'štirlics:draizers':
      return 'pusduālās';
    //   default
    default:
      return 'nenoteikts';
  }
};

export const setRelationSign = (value: string) => {
  switch (value) {
    case 'aktivācijas':
      return (
        <Tooltip placement='top' title='Aktivācijas'>
          <span style={{ color: '#1fc130', fontWeight: '600' }}>A</span>
        </Tooltip>
      );
    case 'duālās':
      return (
        <Tooltip placement='top' title='Duālās'>
          <span style={{ color: '#1fc130', fontWeight: '600' }}>D</span>
        </Tooltip>
      );
    case 'pusduālās':
      return (
        <Tooltip placement='top' title='Pusduālās'>
          <span style={{ color: 'orange', fontWeight: '600' }}>pd</span>
        </Tooltip>
      );
    case 'mirāžas':
      return (
        <Tooltip placement='top' title='Mirāžas'>
          <span style={{ color: 'orange', fontWeight: '600' }}>M</span>
        </Tooltip>
      );
    case 'spoguļa':
      return (
        <Tooltip placement='top' title='Spoguļa'>
          <span>S</span>
        </Tooltip>
      );
    case 'darba':
      return (
        <Tooltip placement='top' title='Darba'>
          <span>d</span>
        </Tooltip>
      );
    case 'vienādās':
      return (
        <Tooltip placement='top' title='Vienādās'>
          <span>V</span>
        </Tooltip>
      );
    case 'šķietami vienādo':
      return (
        <Tooltip placement='top' title='Šķietami Vienādo'>
          <span>šv</span>
        </Tooltip>
      );
    case 'radniecīgo':
      return (
        <Tooltip placement='top' title='Radniecīgo'>
          <span style={{ color: 'red' }}>ra</span>
        </Tooltip>
      );
    case 'pilnīga pretstata':
      return (
        <Tooltip placement='top' title='Pilnīga Pretstata'>
          <span style={{ color: 'red' }}>pp</span>
        </Tooltip>
      );
    case 'super ego':
      return (
        <Tooltip placement='top' title='Super Ego'>
          <span style={{ color: 'red' }}>se</span>
        </Tooltip>
      );
    case 'sociālā pasūtījuma':
      return (
        <Tooltip placement='top' title='Sociālā pasūtījuma'>
          <span style={{ color: 'red' }}>sp</span>
        </Tooltip>
      );

    case 'konflikta':
      return (
        <Tooltip placement='top' title='Konflikta'>
          <span style={{ color: 'red' }}>K</span>
        </Tooltip>
      );
    case 'revīzijas':
      return (
        <Tooltip placement='top' title='Revīzijas'>
          <span style={{ color: 'red' }}>R</span>
        </Tooltip>
      );

    default:
      return (
        <Tooltip placement='top' title='Nav noteikts'>
          <span>!?</span>
        </Tooltip>
      );
  }
};
