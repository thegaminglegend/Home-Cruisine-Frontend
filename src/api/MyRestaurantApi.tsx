import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Hook to get the restaurant of the logged in user
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Function that makes the request to get the restaurant and returns a Restaurant object
  const useGetMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }

    return response.json();
  };

  // Use Query to manage the get restaurant object returned
  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    useGetMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

// Hook to create a new restaurant
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Function that makes the request to create a restaurant and returns a Restaurant object
  const useCreateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  //Use Mutation to manage the create restaurant request
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(useCreateMyRestaurantRequest);

  //Show toast messages based on the request status
  if (isSuccess) {
    toast.success("Restaurant created successfully");
  }
  if (error) {
    toast.error("Failed to create restaurant");
  }

  return { createRestaurant, isLoading };
};

// Hook to update a restaurant
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Function that makes the request to update a restaurant and returns a Restaurant object
  const useUpdateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  //Use Mutation to manage the update restaurant request
  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(useUpdateMyRestaurantRequest);

  //Show toast messages based on the request status
  if (isSuccess) {
    toast.success("Restaurant updated");
  }
  if (error) {
    toast.error("Failed to update restaurant");
  }

  return { updateRestaurant, isLoading };
};
