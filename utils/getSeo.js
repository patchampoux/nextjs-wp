export const getSeo = async uri => {
  const params = {
    query: `
      query SeoQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            seo {
              title
              metaDesc
            }
          }
          ... on Property {
            seo {
              title
              metaDesc
            }
          }
        }
      }
    `,
    variables: {
      uri
    }
  };

  const res = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(params)
  });

  const { data } = await res.json();

  if (!data.nodeByUri) {
    return null;
  }

  return data.nodeByUri.seo;
};