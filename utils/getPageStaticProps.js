import client from "../client";
import { gql } from "@apollo/client";
import { mapMainMenuItems } from "./mapMainMenuItems";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";

export const getPageStaticProps = async context => {
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  const { data } = await client.query({
    query: gql`
        query PageQuery($uri: String!) {
            nodeByUri(uri: $uri) {
                ... on Page {
                    id
                    blocks(postTemplate: false)
                    seo {
                        title
                        metaDesc
                    }
                }
                ... on Property {
                    id
                    blocks(postTemplate: false)
                    seo {
                        title
                        metaDesc
                    }
                }
            }
            acfOptionsMainMenu {
                mainMenu {
                    menuItems {
                        items {
                            destination {
                                ... on Page {
                                    uri
                                }
                            }
                            label
                        }
                        menuItem {
                            destination {
                                ... on Page {
                                    uri
                                }
                            }
                            label
                        }
                    }
                    callToActionButton {
                        label
                        destination {
                            ... on Page {
                                uri
                            }
                        }
                    }
                }
            }
        }
    `,
    variables: {
      uri
    }
  });

  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);

  return {
    props: {
      seo: data.nodeByUri.seo,
      mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
      callToActionButton: data.acfOptionsMainMenu.mainMenu.callToActionButton,
      blocks
    }
  };
};