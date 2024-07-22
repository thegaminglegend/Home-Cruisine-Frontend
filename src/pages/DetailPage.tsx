import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemCard from "@/components/MenuItemCard";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Define types for CartItem
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    //get cartItems from sessionStorage if exists
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  //show loading
  if (isLoading || !restaurant) {
    return <div>Loading...</div>;
  }

  //function to checkout cart items to stripe in backend
  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),

      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        email: userFormData.email as string, //since email is read only
        country: userFormData.country,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    //redirect to success or cancel page from stripe
    window.location.href = data.url;
  };

  //function to add item to cart
  const addToCart = (menuItem: MenuItem) => {
    //since setCartItems, (prevCartItems) is assumed to be the current state of cartItems
    setCartItems((prevCartItems) => {
      //Check if item is already in cart
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      //Update qunatity if item is already in cart
      let updatedCartItems;
      if (existingCartItem) {
        //map: iterate over each item in the cartItems array and return new array
        updatedCartItems = prevCartItems.map((cartItem) => {
          //if the item is already in the cart, increase the quantity
          if (cartItem._id === menuItem._id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          //otherwise, return the item as is
          return cartItem;
        });
        //Add new item if not exists in cart
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      //!!Interview: sessionStorage to store cartItems state to when browser is refreshed
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      //Add new item
      return updatedCartItems;
    });
  };

  //function to remove item from cart
  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      //filter: creates a new array with element that the argument returned true
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      //sessionStorage to store cartItems state to when browser is refreshed
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  //function to decrease a quantity of an item in cart
  const decreaseQuantity = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      //loop through the cartItems array and decrease the quantity of the item
      let updatedCartItems = prevCartItems.map((item) => {
        if (item._id === cartItem._id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      //filter out items with quantity 0
      updatedCartItems = updatedCartItems.filter((item) => item.quantity > 0);
      return updatedCartItems;
    });
  };

  //function to add quantity of an item in cart
  const addQuantity = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      //loop through the cartItems array and decrease the quantity of the item
      let updatedCartItems = prevCartItems.map((item) => {
        if (item._id === cartItem._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedCartItems;
    });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Image */}
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt=""
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      {/* Main contents */}
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        {/* Info and menu item */}
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((item) => (
            <MenuItemCard menuItem={item} addToCart={() => addToCart(item)} />
          ))}
        </div>
        {/* Cart */}
        <div className="">
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              decreaseQuantity={decreaseQuantity}
              addQuantity={addQuantity}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
