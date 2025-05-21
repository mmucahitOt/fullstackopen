import CountryListItemDetail from "./country-list-item-detail";
const Countries = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <CountryListItemDetail key={country.name.common} country={country} />
      ))}
    </div>
  );
};

export default Countries;
