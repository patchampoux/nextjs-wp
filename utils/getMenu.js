import { mapMainMenuItems } from "utils/mapMainMenuItems";

export const getMenu = async () => {
  const params = {
    query: `
      query MenuQuery {
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
    `
  };

  const res = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(params)
  });

  const { data } = await res.json();

  return {
    mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
    callToActionButton: data.acfOptionsMainMenu.mainMenu.callToActionButton
  };
};