import { useEffect, useState } from 'react';

export default function usePageFocused() {
  const [focused, setFocused] = useState(true);

  useEffect(() => {
    function getStatus() {
      if (document.visibilityState === 'visible') {
        setFocused(true);
      } else {
        setFocused(false);
      }
    }
    document.addEventListener('visibilitychange', getStatus);

    return () => {
      document.removeEventListener('visibilitychange', getStatus);
    };
  }, []);

  return focused;
}
