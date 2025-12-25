import React, { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          const msg = `Error: ${res.status}`;
          throw new Error(msg);
        }

        const disPlayData = await res.json();
        setData(disPlayData.results || disPlayData);
        setLoading(false);
        // console.log(disPlayData);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
}

export default useFetch;
