import { PersonalityTestQuestions } from '@/types';

const tips = (value: string) => {
  switch (value) {
    case 'I:S:F:P':
      return 'dimā';
    case 'I:N:F:P':
      return 'jeseņins';
    case 'I:N:T:P':
      return 'balzaks';
    case 'I:S:T:P':
      return 'gabēns';
    case 'I:N:F:J':
      return 'dostojevskis';
    case 'I:S:F:J':
      return 'draizers';
    case 'I:N:T:J':
      return 'robespjērs';
    case 'I:S:T:J':
      return 'maksims';
    case 'E:N:F:P':
      return 'hakslijs';
    case 'E:S:F:P':
      return 'napoleons';
    case 'E:N:T:P':
      return 'donkihots';
    case 'E:S:T:P':
      return 'žukovs';
    case 'E:N:F:J':
      return 'hamlets';
    case 'E:S:F:J':
      return 'igo';
    case 'E:N:T:J':
      return 'džeks';
    case 'E:S:T:J':
      return 'štirlics';
    default:
      return '?!';
  }
};
// I = INTROVERTS E = EKSTRAVERTS
// J = IRACIONALS P = RACIONALS
// F = ETISKAIS T = LOGISKAIS
// S = SENSORS N = INTUITS
// i j n f intro iracionals intuits etisks

export const testResult = (values: PersonalityTestQuestions) => {
  const {
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    // q11,
    q12,
    // q13,
    q14,
    q15,
    q16,
    q17,
    q18,
    q19,
    q20,
    q21,
    q22,
  } = values;

  let EI = 0;
  let RI = 0;
  let SI = 0;
  let LE = 0;
  const sociotips = [];
  // ekstraverts vs intraverts

  if (q1 === '1') {
    EI += 1;
  }
  if (q2 === '1') {
    EI += 1;
  }
  if (q3 === '1') {
    EI += 1;
  }
  if (q4 === '1') {
    EI += 1;
  }
  if (q5 === '1') {
    EI += 1;
  }
  if (EI > 2) {
    sociotips[0] = 'E';
  } else {
    sociotips[0] = 'I';
  }
  // racionals vs iracionals
  if (q6 === '1') {
    RI += 1;
  }
  if (q7 === '1') {
    RI += 1;
  }
  if (q8 === '1') {
    RI += 1;
  }
  if (q9 === '1') {
    RI += 1;
  }
  if (q10 === '1') {
    RI += 1;
  }
  if (RI > 2) {
    sociotips[3] = 'J';
  } else {
    sociotips[3] = 'P';
  }

  // logisks vs etisks

  if (q18 === '1') {
    LE += 1;
  }
  if (q19 === '1') {
    LE += 1;
  }
  if (q20 === '1') {
    LE += 1;
  }
  if (q21 === '1') {
    LE += 1;
  }
  if (q22 === '1') {
    LE += 1;
  }
  if (LE > 2) {
    sociotips[2] = 'T';
  } else {
    sociotips[2] = 'F';
  }
  // sensors vs intuīts
  if (q12 === '1') {
    SI += 1;
  }
  if (q14 === '1') {
    SI += 1;
  }
  if (q15 === '1') {
    SI += 1;
  }
  if (q16 === '1') {
    SI += 1;
  }
  if (q17 === '1') {
    SI += 1;
  }
  if (SI > 2) {
    sociotips[1] = 'S';
  } else {
    sociotips[1] = 'N';
  }

  return tips(sociotips.join(':'));
};

// 1, 2, 3, 4, 5 === 1 = ekstraverts
// 1, 2, 3, 4, 5 === 2 = intraverts
// 6, 7, 8, 9, 10, 11 === 1 = racionāls
// 6, 7, 8, 9, 10, 11 === 2 = iracionāls
// 12, 13, 14, 15, 16, 17 === 1 = sensors
// 12, 13, 14, 15, 16, 17 === 2 = intuīts
// 18, 19, 20, 21, 22 === 1 = loģiskais
// 18, 19, 20, 21, 22 === 2 = etiskais
