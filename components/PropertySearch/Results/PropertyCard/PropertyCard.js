import Link from "next/link";
import Image from "next/image";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBathtub, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons";

export const PropertyCard = ({ title, destination, bedrooms, bathrooms, price, petFriendly, hasParking, image }) => {
  return (
    <Link className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200" href={destination}>
      <div className="flex w-full">
        <Image className="object-cover" src={image} alt="Property Image" width={300} height={200} />
      </div>
      <div className="mt-3 text-lg font-bold">{title}</div>
      <div className="text-lg">${numeral(price).format("0,0")}</div>
      <div className="flex justify-between text-sm mt-3">
        <div className="flex">
          <FontAwesomeIcon icon={faBathtub} />
          <div className="pl-2">{bathrooms} bathrooms</div>
        </div>
        <div className="flex">
          <FontAwesomeIcon icon={faBed} />
          <div className="pl-2">{bedrooms} bedrooms</div>
        </div>
      </div>
      {(!!hasParking || !!petFriendly) && (
        <div className="flex justify-between text-sm mt-3">
          {!!hasParking && (
            <div className="flex">
              <FontAwesomeIcon icon={faCar} />
              <div className="pl-2">Parking available</div>
            </div>
          )}
          {!!petFriendly && (
            <div className="flex">
              <FontAwesomeIcon icon={faDog} />
              <div className="pl-2">Pet friendly</div>
            </div>
          )}
        </div>
      )}
    </Link>
  );
};