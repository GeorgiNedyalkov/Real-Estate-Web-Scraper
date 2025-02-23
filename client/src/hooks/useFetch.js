import { useState, useEffect } from "react";

const apiURL = "http://localhost:3001/api/v1/neighborhoods/centar";

export const useFetch = (initialURL = apiURL) => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(initialURL);

  const getApartments = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const apartments = data.neighborhood[0].apartments;
      setApartments(apartments);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    const getLocalApartments = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:5174/apartments.json");
        const result = await res.json();
        setLoading(false);
        setApartments(result.neighborhood[0].apartments);
      } catch (error) {
        console.log(error);
      }
    };
  };

  useEffect(() => {
    getApartments(url);
  }, [url]);
  useEffect(() => {
    getApartments(url);
    // setLoading(true);
    // fetch("http://127.0.0.1:5174/apartments.json")
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setLoading(false);
    //     setApartments(result.neighborhood[0].apartments);
    //   });
  }, [url]);

  return { apartments, loading, setUrl, setApartments };
};
