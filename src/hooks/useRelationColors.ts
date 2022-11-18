import { selectAccountData } from '@/redux/slices/accountSlice';
import { useAppSelector } from '@/redux/store';
import { setRelations } from '@/utils/showRelations';

export default function useRelationColors() {
  const { sociotype } = useAppSelector(selectAccountData);

  const relationColor = (option: string) => {
    const name = setRelations(`${sociotype}:${option}`);

    switch (name) {
      case 'aktivācijas':
      case 'duālās':
        return 'green';
      case 'mirāžas':
      case 'pusduālās':
        return 'orange';
      case 'darba':
      case 'vienādās':
      case 'šķietami vienādo':
      case 'spoguļa':
        return null;

      default:
        return 'red';
    }
  };

  return relationColor;
}
