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
