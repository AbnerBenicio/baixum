import { useState, useEffect } from "react";
import API from "../api/api4";

const useFetchArtigos = (apiUrl) => {
  const [artigos, setArtigos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await API.get(`${apiUrl}&page=${page}&limit=5`);
        setArtigos(res.data);

        const nextRes = await API.get(`${apiUrl}&page=${page + 1}&limit=5`);

        if (nextRes.data.length === 0) {
          setHasNextPage(false);
        } else {
          setHasNextPage(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setArtigos([]);
          setHasNextPage(false);
        }
      }
    };

    fetchApi();
  }, [apiUrl, page]);

  return { artigos, page, setPage, hasNextPage };
};

export default useFetchArtigos;
