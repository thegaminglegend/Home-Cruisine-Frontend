import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Minus, Plus, Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
  decreaseQuantity: (cartItem: CartItem) => void;
  addQuantity: (cartItem: CartItem) => void;
};

const OrderSummary = ({
  restaurant,
  cartItems,
  removeFromCart,
  decreaseQuantity,
  addQuantity,
}: Props) => {
  const getTotalCost = () => {
    // reduce: iterate over each item in the cartItems array and return total
    const totalInCent = cartItems.reduce(
      //function to calculate total cost starting at 0, returning total
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInCent + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span className="flex gap-1 items-center">
              <Badge variant="outline">{item.quantity}</Badge>
              {item.name}
              <Minus
                color="red"
                size={20}
                className="cursor-pointer mx-1"
                onClick={() => decreaseQuantity(item)}
              />
              <Plus
                className="cursor-pointer"
                color="green"
                size={20}
                onClick={() => addQuantity(item)}
              />
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              ${((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
