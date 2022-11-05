import { useState, useEffect } from 'react';

export default function useDynamicMinMax(minWatch: number, maxWatch: number) {
  const [minVal, setMinVal] = useState(18);
  const [maxVal, setMaxVal] = useState(99);

  function createRange(min: number, max: number) {
    const range = [];

    for (let i = min; i <= max; i++) {
      range.push(i);
    }
    return range;
  }

  const MIN = createRange(18, maxVal - 1);
  const MAX = createRange(minVal + 1, 99);

  useEffect(() => {
    setMinVal(Number(minWatch));
    setMaxVal(Number(maxWatch));
  }, [minWatch, maxWatch]);

  return { MIN, MAX };
}
