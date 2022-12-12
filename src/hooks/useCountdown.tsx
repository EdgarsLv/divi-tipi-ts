import { useState, useEffect } from 'react';

export default function useCountdown(date: Date) {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const startTime = date.getTime();
      const endTime = new Date().getTime();

      const distanceToNow = startTime - endTime;

      const getDays = `${Math.floor(distanceToNow / (1000 * 60 * 60 * 24))}`;
      const getHours = `0${Math.floor(
        (distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )}`.slice(-2);
      const getMinutes = `0${Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60))}`.slice(
        -2,
      );
      const getSeconds = `0${Math.floor((distanceToNow % (1000 * 60)) / 1000)}`.slice(-2);

      setCountdown({
        days: getDays || '000',
        hours: getHours || '000',
        minutes: getMinutes || '000',
        seconds: getSeconds || '000',
      });

      if (distanceToNow < 0) {
        clearInterval(interval);
        setExpired(true);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { countdown, expired };
}
