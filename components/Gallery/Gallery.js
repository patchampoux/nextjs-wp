import Image from "next/image";

export const Gallery = ({ columns, cropImages, items }) => {
  const columnWitdh = 100 / columns;

  let maxHeight = 0;
  let maxWidth = 0;

  if (cropImages) {
    items.forEach(item => {
      if (item.attributes.height > maxHeight) {
        maxHeight = item.attributes.height;
      }

      if (item.attributes.width > maxWidth) {
        maxWidth = item.attributes.width;
      }
    });
  }

  return (
    <div className="flex flex-wrap max-w-5xl mx-auto">
      {items.map(item => (
        <div
          key={item.id}
          style={{ width: `${columnWitdh}%` }}
          className={`p-5 flex-grow`}
        >
          <Image
            className="object-cover"
            src={item.attributes.url}
            alt={item.attributes.alt || ""}
            width={maxWidth || item.attributes.width}
            height={maxHeight || item.attributes.height}
          />
        </div>
      ))}
    </div>
  );
};