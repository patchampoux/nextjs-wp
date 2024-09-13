import { getTextAlign } from "utils/fonts";
import { ButtonLink } from "../ButtonLink";

export const CallToActionButton = ({ align = "left", destination, label }) => {
  return (
    <div className={`${getTextAlign(align)}`}>
      <ButtonLink
        destination={destination}
        label={label}
      />
    </div>
  );
};