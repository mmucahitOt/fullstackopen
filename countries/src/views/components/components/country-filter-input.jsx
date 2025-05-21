const CountryFilterInput = ({ filter, setFilter }) => {
  return (
    <div>
      {"find countries "}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

export default CountryFilterInput;
