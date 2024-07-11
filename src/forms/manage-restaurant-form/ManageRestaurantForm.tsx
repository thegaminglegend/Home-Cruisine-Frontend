import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSecetion from "./DetailsSecetion";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

// Define the schema for form validaiton
const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "Restaurant name is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    //coerce: converts the string value to number
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated Delivery Time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      })
    ),
    //register the image url
    imageUrl: z.string().optional(),
    //Check if image file exists
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

//form property types
type RestaurantFormData = z.infer<typeof formSchema>;
//prop types
type Props = {
  restaurant?: Restaurant; //Restaurant data that might be undefined since user not created
  onSave: (restaurantFormData: FormData) => void; //Function to save the form data
  isLoading: boolean; //Flag to show loading spinner
};

// Form for creating and managing restaurant info
const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  // Use the useForm hook to create a form with the schema
  // Manages all the form data
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  //Populate the form with restaurant data if available
  //Data will be updated with react hook form
  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    //map((item) => ({}）returns an object instead of a function
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item, //copy current item properties
      price: parseInt((item.price / 100).toFixed(2)), //replace price of each item with formatted price
    }));

    //Update the restaurant object with formatted data
    const updatedRestaurant = {
      ...restaurant, //copy existing restaurant object properties
      //overwrite the following properties
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    //reset the form with updated restaurant data
    //form included all the properties of the restaurant object
    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  //Function to call when form is submitted
  const onSubmit = (formDataJson: RestaurantFormData) => {
    //Convert formDataJson js object to a new FormData Object
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    //Store money as lowest unit (cents) for consistency
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    //Append cuisines and menuItems as arrays
    formDataJson.cuisines.forEach((cuisine, index) =>
      formData.append(`cuisines[${index}]`, cuisine)
    );
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    //Append image file if it exists
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    //send data to createRestaurant API
    onSave(formData);
  };

  return (
    //Passes form data to all the children
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} //first validate the form and then call onSubmit
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSecetion />

        <Separator />
        <CuisinesSection />

        <Separator />
        <MenuSection />

        <Separator />
        <ImageSection />

        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
