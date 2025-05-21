import { CapitalWeather, CountryDetail } from "./components";

export const CountryListSingleItem = ({ country }) => {
  return (
    <div>
      <CountryDetail country={country} />
      <CapitalWeather
        latitude={country.latlng[0]}
        longitude={country.latlng[1]}
      />
    </div>
  );
};
