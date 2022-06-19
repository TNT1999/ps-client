import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';

export default function useUnloadBeacon(
  {
    url,
    startTime,
    payload
  }: {
    url: string;
    startTime: number;
    payload: (
      startTime: number,
      endTime: number,
      productId: string
    ) => { productId: string; time: string };
  },
  productId: string
) {
  const [start, setStart] = useState(startTime);
  const eventHandler = useCallback(() => {
    console.log('run beacon');
    const pageViewTime = new Date().getTime();
    console.log(pageViewTime);
    const cookies = parseCookies();
    const TOKENS = cookies['TOKENS'] || '{}';
    const TOKENS_VALUE = JSON.parse(TOKENS);
    const token = TOKENS_VALUE.accessToken;
    if (!token) return;
    const isChrome =
      navigator.userAgent.includes('Chrome') &&
      navigator.vendor.includes('Google Inc');

    let headers = {};
    if (isChrome) {
      headers = {
        type: 'application/x-www-form-urlencoded'
        // Authorization: `Bearer ${token}`
      };
    } else {
      headers = {
        type: 'application/json'
        // Authorization: `Bearer ${token}`
      };
    }

    const blob = new Blob(
      [JSON.stringify(payload(pageViewTime, start, productId))],
      headers
    );
    navigator.sendBeacon(url, blob);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, start]);

  // useEffect(() => {
  //   const pageViewTime = new Date().getTime();
  //   setStart(pageViewTime);
  // }, [productId]);

  useEffect(() => {
    console.log('reg');
    window.addEventListener('beforeunload', eventHandler, true);
    return () => {
      window.removeEventListener('beforeunload', eventHandler, true);
    };
  }, []);
}
