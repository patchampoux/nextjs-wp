import { theme } from "theme";
import Image from "next/image";
import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { FormspreeForm } from "components/FormspreeForm";
import { Gallery } from "components/Gallery";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { PropertyFeatures } from "components/PropertyFeatures";
import { PropertySearch } from "components/PropertySearch";
import { Spacer } from "components/Spacer";
import { TickItem } from "components/TickItem";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map(block => {
    switch (block.name) {
      case "acf/cta-button": {
        return <CallToActionButton
          key={block.id}
          align={block.attributes.data.align}
          destination={block.attributes.data.destination}
          label={block.attributes.data.label}
        />;
      }
      case "acf/formspree-form": {
        return <FormspreeForm
          key={block.id}
          formId={block.attributes.data.form_id}
        />;
      }
      case "acf/property-features": {
        return <PropertyFeatures
          key={block.id}
          price={block.attributes.price}
          bedrooms={block.attributes.bedrooms}
          bathrooms={block.attributes.bathrooms}
          hasParking={block.attributes.has_parking}
          petFriendly={block.attributes.pet_friendly}
        />;
      }
      case "acf/property-search": {
        return <PropertySearch key={block.id} />;
      }
      case "acf/tick-item": {
        return (
          <TickItem key={block.id}>
            <BlockRenderer blocks={block.innerBlocks} />
          </TickItem>
        );
      }
      case "core/column": {
        return (
          <Column
            key={block.id}
            width={block?.attributes?.width}
            textColor={theme[block?.attributes?.textColor] || block.attributes?.style?.color?.text}
            backgroundColor={theme[block?.attributes?.backgroundColor] || block.attributes?.style?.color?.background}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      case "core/columns": {
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
            textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
            backgroundColor={theme[block.attributes.backgroundColor] || block.attributes.style?.color?.background}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
      }
      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }
      case "core/gallery": {
        return <Gallery
          key={block.id}
          columns={block.attributes.columns || 3}
          cropImages={block.attributes.imageCrop}
          items={block.innerBlocks}
        />;
      }
      case "core/group":
      case "core/block": {
        return <BlockRenderer
          key={block.id}
          blocks={block.innerBlocks}
        />;
      }
      case "core/heading":
      case "core/post-title": {
        return <Heading
          key={block.id}
          content={block.attributes.content}
          level={block.attributes.level}
          textAlign={block.attributes.textAlign}
        />;
      }
      case "core/image": {
        return <Image
          key={block.id}
          alt={block.attributes.alt || ""}
          height={block.attributes.height}
          src={block.attributes.url}
          width={block.attributes.width}
        />;
      }
      case "core/paragraph": {
        return <Paragraph
          key={block.id}
          content={block.attributes.content}
          textAlign={block.attributes.textAlign}
          textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
        />;
      }
      case "core/spacer": {
        return <Spacer
          key={block.id}
          height={block.attributes.height}
        />;
      }
      default:
        console.log("UNKNOWN", block);
        return null;
    }
  });
};