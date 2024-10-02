import { useState, useEffect } from 'react';

const useFetch = (url, method, headers, body=null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if(body){
          response = await fetch(url, { method, headers, body: JSON.stringify(body) });
        }else{
          response = await fetch(url, { method, headers });
        }
        if (!response.ok) throw new Error('Error fetching data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;