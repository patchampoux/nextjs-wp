import Head from "next/head";
import { MainMenu } from "components/MainMenu";
import { BlockRenderer } from "components/BlockRenderer";

export const Page = props => {
  return (
    <div>
      <Head>
        <title>{props.seo.title}</title>
        <meta name="description" content={props.seo.description} />
      </Head>
      <MainMenu
        items={props.mainMenuItems}
        callToActionButton={props.callToActionButton}
      />
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
};