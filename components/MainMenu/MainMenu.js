import { FaHouseUser, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { ButtonLink } from "/components/ButtonLink";

export const MainMenu = ({ items, callToActionButton }) => {
  return (
    <div className="bg-slate-800 text-white px-5 h-16 sticky top-0 z-20 flex items-center">
      <div className="py-4 pl-5 flex text-pink-600">
        <FaHouseUser size={30} />
        <FaHeart size={30} />
      </div>
      <div className="flex flex-1 justify-end">
        {(items || []).map(item => (
          <div
            key={item.id}
            className="hover:bg-slate-700 cursor-pointer relative group"
          >
            <div>
              <Link className="p-5 block" href={item.destination}>
                {item.label}
              </Link>
            </div>
            {!!item.subMenuItems?.length && (
              <div className="hidden group-hover:block bg-slate-800 text-right absolute right-0 top-full">
                {item.subMenuItems.map(subMenuItem => (
                  <Link
                    key={subMenuItem.id}
                    className="block whitespace-nowrap p-5 hover:bg-slate-700"
                    href={subMenuItem.destination}
                  >
                    {subMenuItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {!!callToActionButton && !!callToActionButton.destination?.uri && !!callToActionButton.label && (
          <div className="ml-3 my-auto">
            <ButtonLink
              destination={callToActionButton.destination.uri}
              label={callToActionButton.label}
            />
          </div>
        )}
      </div>
    </div>
  );
};