import axios from "axios";
import { useEffect, useState } from "react";
import Row from "./Row";
import List from "./List";
import styles from "./Search.module.css";
import { ACTIONS } from "./Sidebar";

function parseData({
  id,
  name,
  latitude,
  longitude,
  timezone,
  admin1,
  country,
}) {
  return { id, name, country, latitude, longitude, timezone, admin1 };
}

function Search({ dispatch }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`https://geocoding-api.open-meteo.com/v1/search?name=${search}`)
      .then((resp) =>
        setResults(resp.data.results.map((result) => parseData(result)) || [])
      )
      .catch(() => setResults([]));
  }, [search]);

  return (
    <>
      <div className={styles.nav_search}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.nav_search_input}
          placeholder="Another location"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {results.length > 0 && (
        <List>
          {results.map((result) => {
            return (
              <Row
                key={result.id}
                result={result}
                dispatch={dispatch}
                setSearch={setSearch}
              >
                <span>
                  {result.name} / {result.admin1}
                </span>
                <span>{result.country}</span>
              </Row>
            );
          })}
        </List>
      )}
    </>
  );
}

export default Search;
