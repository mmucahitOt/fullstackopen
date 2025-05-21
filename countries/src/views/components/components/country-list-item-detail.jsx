import { useState } from "react";
import CountryDetail from "./country-detail";

const CountryListItemDetail = ({ country }) => {
  const [showCountryDetail, setShowCountryDetail] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {showCountryDetail ? (
          <CountryDetail country={country} />
        ) : (
          <h2>{country.name.common}</h2>
        )}
        <button
          style={{
            height: "fit-content",
            padding: "4px 8px",
            marginLeft: "10px",
          }}
          onClick={() => setShowCountryDetail(!showCountryDetail)}
        >
          {showCountryDetail ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default CountryListItemDetail;
