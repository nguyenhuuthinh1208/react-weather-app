import { useEffect, useReducer, useState } from "react";
import Row from "./Row";
import List from "./List";
import Search from "./Search";
import styles from "./Sidebar.module.css";
import { ICON_MAP } from "../iconMap";
export const initializer =
  JSON.parse(localStorage.getItem("ls-locations")) || [];

export const ACTIONS = {
  ADD: "add-location",
  REMOVE: "remove-location",
};

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  day: "numeric",
});

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload];
      }
      return state;
    case ACTIONS.REMOVE:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      throw new Error();
  }
}

function Sidebar({ selected, setSelected, data }) {
  const [locations, dispatch] = useReducer(reducer, initializer);

  useEffect(() => {
    localStorage.setItem("ls-locations", JSON.stringify(locations));
    setSelected(locations[locations.length - 1] || null);
  }, [locations]);

  return (
    <section className={styles.sidebar}>
      <Search dispatch={dispatch} />
      {locations.length > 0 && (
        <List>
          {locations.map((location) => {
            return (
              <Row
                key={location.id}
                result={location}
                dispatch={dispatch}
                setSelected={setSelected}
                selected_id={selected?.id}
              >
                <span>
                  {location.name} / {location.admin1}
                </span>
                <span>
                  {location.country}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: ACTIONS.REMOVE, payload: location });
                    }}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </span>
              </Row>
            );
          })}
        </List>
      )}
      {data.length > 0 && selected && (
        <>
          <List title={"Weather Details"} className={null}>
            <Row>
              <span>High Temparature</span>
              <span>{data[0].highTemp}&deg;</span>
            </Row>
            <Row>
              <span>Low Temparature</span>
              <span>{data[0].lowTemp}&deg;</span>
            </Row>
            <Row>
              <span>Precipitation</span>
              <span>{data[0].precip}%</span>
            </Row>
            <Row>
              <span>Wind</span>
              <span>{data[0].windSpeed} kmh/h</span>
            </Row>
          </List>
          <List title={"Next Days"} className={null}>
            {data[1].map((weather) => {
              return (
                <Row key={weather.timestamp}>
                  <span>{DAY_FORMATTER.format(weather.timestamp)}</span>
                  <span>
                    <img
                      src={`https://raw.githubusercontent.com/dogankocadayilar/react-weather-app/main/src/assets/weather-icons/${ICON_MAP.get(
                        weather.iconCode
                      )}.svg`}
                      alt="Weather Icon"
                    />
                  </span>
                  <span>{weather.maxTemp}&deg;</span>
                </Row>
              );
            })}
          </List>
        </>
      )}
    </section>
  );
}

export default Sidebar;
