import { useEffect, useState } from "react";
import {
  CountryListSingleItem,
  CountryListBulk,
  CountryListSummary,
} from "./components";
import { CountryFilterInput } from "./components/components";

const CountryListView = ({ countries }) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    const countryWithNameMatchingFilter = filteredCountries.find(
      (country) => country.name.common.toLowerCase() === filter.toLowerCase()
    );

    if (countryWithNameMatchingFilter) {
      setFilteredCountries([countryWithNameMatchingFilter]);
    } else {
      setFilteredCountries(filteredCountries);
    }
  }, [filter, countries]);

  return (
    <div>
      <CountryFilterInput filter={filter} setFilter={setFilter} />
      {filteredCountries.length > 10 && (
        <CountryListSummary filter={filter} setFilter={setFilter} />
      )}
      {filteredCountries.length === 1 && (
        <CountryListSingleItem country={filteredCountries[0]} />
      )}
      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <CountryListBulk countries={filteredCountries} />
      )}
    </div>
  );
};

export default CountryListView;
