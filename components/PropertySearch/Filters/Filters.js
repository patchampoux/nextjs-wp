import { useEffect, useState } from "react";
import { Input } from "components/Input";
import queryString from "query-string";

export const Filters = ({ onSearch }) => {
  const [petFriendly, setPetFriendly] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const {
      petFriendly: petFriendlyArg,
      hasParking: hasParkingArg,
      minPrice: minPriceArg,
      maxPrice: maxPriceArg
    } = queryString.parse(window.location.search);

    setPetFriendly(petFriendlyArg === "true");
    setHasParking(hasParkingArg === "true");
    setMinPrice(minPriceArg || "");
    setMaxPrice(maxPriceArg || "");
  }, []);

  const handleSearch = () => {
    onSearch({
      petFriendly,
      hasParking,
      minPrice,
      maxPrice
    });
  };

  return (
    <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={hasParking}
              onChange={() => setHasParking(value => !value)}
            />
            <span className="pl-2">Has Parking</span>
          </label>
        </div>
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={petFriendly}
              onChange={() => setPetFriendly(value => !value)}
            />
            <span className="pl-2">Pet Friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min Price</span>
        <Input
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <span>Max Price</span>
        <Input
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <button className="btn" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};