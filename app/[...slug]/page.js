import { notFound } from "next/navigation";
import { getPage } from "utils/getPage";
import { getSeo } from "utils/getSeo";
import { BlockRenderer } from "components/BlockRenderer";

export default async function Page({ params }) {
  const data = await getPage(params.slug.join("/"));

  if (!data) {
    notFound();
  }

  return <BlockRenderer blocks={data} />;
}

export async function generateMetadata({ params }) {
  const seo = await getSeo(params.slug.join("/"));

  return {
    title: seo?.title || "",
    description: seo?.metaDesc || ""
  };
}