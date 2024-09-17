import client from "client";
import { gql } from "@apollo/client";

const handler = async (req, res) => {
  try {
    const filters = JSON.parse(req.body);

    let hasParkingFilter = ``;
    let petFriendlyFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    console.log(filters);

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

    const { data } = await client.query({
      query: gql`
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
    });

    return res.status(200).json({
      total: data.properties.pageInfo.offsetPagination.total,
      properties: data.properties.nodes
    });
  } catch (e) {
    console.error(e);
  }
};

export default handler;