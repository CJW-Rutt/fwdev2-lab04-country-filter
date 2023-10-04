import { useState } from "react";
import Country from "./components/Country";
import data from "./data/countries.json";

import "./styles.css";

function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function ascCompare(a, b) {
  return a.population - b.population;
}

function descCompare(a, b) {
  return b.population - a.population;
}

function sort(list, compareFunc) {
  return list.sort(compareFunc);
}

function filter(list, option) {
  if (option === "all") {
    return list;
  } else if (
    option === "1" ||
    option === "100m" ||
    option === "200m" ||
    option === "500m" ||
    option === "1b"
  ) {
    switch (option) {
      case "1":
        return list.filter((item) => item.population < 100000000);
      case "100m":
        return list.filter((item) => item.population >= 100000000);
      case "200m":
        return list.filter((item) => item.population >= 200000000);
      case "500m":
        return list.filter((item) => item.population >= 500000000);
      case "1b":
        return list.filter((item) => item.population >= 1000000000);
      default:
        return list;
    }
  } else {
    return list.filter(function (item) {
      return item.continent.toLowerCase() === option.toLowerCase();
    });
  }
}

export default function App() {
  const [sortOption, setSortOption] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  const countries = data.countries;

  let sortedCountries = sort(countries.slice(), ascCompare);

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function sortCountries() {
    let func;
    if (sortOption === "alpha") {
      func = alphaCompare;
    } else if (sortOption === "<") {
      func = ascCompare;
    } else if (sortOption === "shuffle") {
      let shuffledList = [...countries];
      for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
      }
      return shuffledList;
    } else {
      func = descCompare;
    }
    return sort(countries.slice(), func);
  }

  sortedCountries = sortCountries();
  const filteredCountries = filter(sortedCountries.slice(), filterOption);

  return (
    <div className="App">
      <h1>World's largest countries by population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select onChange={handleSort} value={sortOption}>
            <option value="alpha">Alphabetically</option>
            <option value="<">Population Asc</option>
            <option value=">">Population Desc</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
        <label>
          Filters:
          <select onChange={handleFilter} value={filterOption}>
            <optgroup label="By continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="By population size">
              <option value="1">Less than 100m</option>
              <option value="100m">100m or more</option>
              <option value="200m">200m or more</option>
              <option value="500m">500m or more</option>
              <option value="1b">1b or more</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div className="countries">
        {filteredCountries.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}
