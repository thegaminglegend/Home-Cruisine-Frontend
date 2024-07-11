//type for user
export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

//Type for MenuItem
export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

//Type for Restaurant
export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageURL: string;
  lastUpdated: string;
};
