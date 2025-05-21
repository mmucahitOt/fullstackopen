const CountryDetail = ({ country }) => {
  if (!country) return null;

  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
      </div>
      <div>
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt={country.name.common} />
      </div>
    </div>
  );
};

export default CountryDetail;
