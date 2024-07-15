import { Restaurant } from "@/types";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      // grid-cols-[2fr_3fr]: 2 column layout, left takes 2/5 and right takes 3/5
      //grid default: 1 column
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      {/* Restaurant Image */}
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          //object-cover: crop image from center
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>

      <div className="">
        {/* restaurant title */}
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>

        {/* Restaurant info container card*/}
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          {/* list of cuisines */}
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex flex-row">
                <span>{item}</span>
                {/* add a dot except for the last one */}
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          {/* restaurant specific info */}
          <div className="flex gap-2 flex-col">
            {/* Delivery time */}
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            {/* delivery price  */}
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
