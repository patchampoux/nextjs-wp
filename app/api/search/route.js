import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const filters = await req.json();

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    if (filters.hasParking) {
      hasParkingFilter = `
      {
        key: "has_parking",
        compare: EQUAL_TO,
        value: "1"
      },
      `;
    }

    if (filters.petFriendly) {
      petFriendlyFilter = `
      {
        key: "pet_friendly",
        compare: EQUAL_TO,
        value: "1"
      },
      `;
    }

    if (filters.minPrice) {
      minPriceFilter = `
      {
        key: "price",
        compare: GREATER_THAN_OR_EQUAL_TO,
        type: NUMERIC,
        value: "${filters.minPrice}"
      },
      `;
    }

    if (filters.maxPrice) {
      maxPriceFilter = `
      {
        key: "price",
        compare: LESS_THAN_OR_EQUAL_TO,
        type: NUMERIC,
        value: "${filters.maxPrice}"
      },
      `;
    }

    const res = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: `
          query AllPropertiesQuery {
              properties(where: {
                  offsetPagination: {
                      size: 3,
                      offset: ${((filters.page || 1) - 1) * 3}
                  },
                  metaQuery: {
                      relation: AND,
                      metaArray: [
                          ${hasParkingFilter}
                          ${petFriendlyFilter}
                          ${minPriceFilter}
                          ${maxPriceFilter}
                      ]
                  }
              }) {
                  nodes {
                      databaseId
                      title
                      uri
                      featuredImage {
                          node {
                              uri
                              sourceUrl
                          }
                      }
                      propertyFeatures {
                          bathrooms
                          bedrooms
                          hasParking
                          petFriendly
                          price
                      }
                  }
                  pageInfo {
                      offsetPagination {
                          total
                      }
                  }
              }
          }
      `
      })
    });

    const { data } = await res.json();

    return NextResponse.json({
      total: data.properties.pageInfo.offsetPagination.total,
      properties: data.properties.nodes
    });
  } catch (e) {
    console.error(e);
  }
}