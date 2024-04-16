import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar, { initializer } from "./components/Sidebar";
import parsetWeatherData from "./helpers";
import { ICON_MAP } from "./iconMap";

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  weekday: "long",
});

function App() {
  const [selected, setcSelected] = useState(
    initializer[initializer.length - 1] || null
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(
          "https://api.open-meteo.com/v1/forecast?daily=weathercode,apparent_temperature_max,apparent_temperature_min,precipitation_sum,windspeed_10m_max&current_weather=true&timeformat=unixtime",
          {
            params: {
              latitude: selected.latitude,
              longitude: selected.longitude,
              timezone: selected.timezone,
            },
          }
        )
        .then((resp) => setData(parsetWeatherData(resp.data)));
    }
  }, [selected]);

  return (
    <main className="app">
      <section className="main">
        {/* <Navbar /> */}
        {data.length > 0 && selected && (
          <div className="current">
            <h2 className="temp">{data[0].currentTemp}&deg;</h2>
            <div className="location">
              <h1 className="location--name">{selected.name}</h1>
              <div className="location--time">
                {DAY_FORMATTER.format(data[0].timestamp)}
              </div>
            </div>
            <div className="icon-part">
              <img
                src={`../../src/assets/weather-icons/${ICON_MAP.get(
                  data[0].iconCode
                )}.svg`}
                alt="Weather Icon"
                className="icon"
              />
              <span>{ICON_MAP.get(data[0].iconCode).replace("-", " ")}</span>
            </div>
          </div>
        )}
      </section>
      <Sidebar selected={selected} setSelected={setcSelected} data={data} />
    </main>
  );
}

export default App;
