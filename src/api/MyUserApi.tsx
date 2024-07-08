import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "../types";

//Base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//*****************Get User Info*************************************

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  //Form the fetch request
  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest); //For fetching data

  //If error in fetch call set toast
  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading, error };
};

//*****************Create User***************************************
//User Type
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

//Custom Hook to create a user in backend
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  //Form the fetch request
  const createMyUserRequest = async (user: CreateUserRequest) => {
    //Get access token
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  //pass fetch request to be managed by useMutation react-query
  const {
    mutateAsync: createUser, //function to call the fetch request
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return { createUser, isLoading, isError, isSuccess };
};

//*****************Update User Info*********************************

//Define form element type
type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

//Cutom Hook to send request to update user profile
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  //If success in fetch call set toast
  if (isSuccess) {
    toast.success("User updated successfully");
  }

  //If error in fetch call set toast
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};
