import { useEffect, useState } from "react";
import { countryService } from "./services";
import CountryListView from "./views/country-list-view";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getCountries().then((data) => setCountries(data));
  }, []);

  return <CountryListView countries={countries} />;
}

export default App;
