import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON));

  const assingIds = (b) => {
    b.forEach(block => {
      block.id = uuid();

      if (block.innerBlocks?.length) {
        assingIds(block.innerBlocks);
      }
    });
  };

  assingIds(blocks);

  return blocks;
};