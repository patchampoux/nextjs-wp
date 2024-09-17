"use client";

import { useEffect, useState } from "react";
import { Pagination } from "components/Pagination";
import { Filters } from "components/PropertySearch/Filters";
import { Results } from "components/PropertySearch/Results";
import { useRouter, usePathname } from "next/navigation";
import queryString from "query-string";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 3;
  const router = useRouter();
  const pathname = usePathname();

  const search = async () => {
    const { page, petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(window.location.search);
    const filters = {};

    if (petFriendly === "true") {
      filters.petFriendly = true;
    }

    if (hasParking === "true") {
      filters.hasParking = true;
    }

    if (minPrice) {
      filters.minPrice = parseInt(minPrice);
    }

    if (maxPrice) {
      filters.maxPrice = parseInt(maxPrice);
    }

    const res = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        ...filters
      })
    });
    const data = await res.json();

    setProperties(data.properties);
    setTotalResults(data.total);
  };

  const handlePageClick = async (pageNumber) => {
    const {
      petFriendly,
      hasParking,
      minPrice,
      maxPrice
    } = queryString.parse(window.location.search);

    router.push(`${pathname}?page=${pageNumber}&petFriendly=${petFriendly === "true"}&hasParking=${hasParking === "true"}&minPrice=${minPrice || ""}&maxPrice=${maxPrice || ""}`, {});
  };

  useEffect(() => {
    search();
  }, []);

  const handleSearch = async ({ petFriendly, hasParking, minPrice, maxPrice }) => {
    router.push(`${pathname}?page=1&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {});
  };

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination totalPages={Math.ceil(totalResults / pageSize)} onPageClick={handlePageClick} />
    </div>
  );
};