import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export const getPage = async uri => {
  const params = {
    query: `
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            blocks(postTemplate: false)
          }
          ... on Property {
            blocks(postTemplate: false)
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

  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);

  return blocks;
};