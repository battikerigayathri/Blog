'use client';

import { useState } from 'react';

// write a hook which takes a promise and returns the data, loading and error but triggers the promise only when a callback is called

const useLazyQuery = (promise: any): any[] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any>(null);
 const execute = (...args: any) => {
    setLoading(true);
    setError(null);
    promise(...args)
      .then((data: any) => {
        if (data.error) {
          throw data.error;
        }
       if (data == null) {
          setData(true);
        } else {
          setData(data);
        }
        setError(null);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err);
        setData(null);
        setLoading(false);
      });
  };

  return [execute, { loading, error, data }];
};

export { useLazyQuery };
