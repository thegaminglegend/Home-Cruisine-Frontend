import { useGetMyUser, useUpdateMyUser } from "../api/MyUserApi";
import UserProfileForm from "../forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  //Custom Hooks
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  //If loading getting user info show loading
  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  //If something went wrong with fetching user than show error
  //Back up just in case to prevent app from crashing
  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
