import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import LoadingButton from "../../components/LoadingButton";
import { User } from "../../types";
import { useEffect } from "react";

// Define the schema for form validaiton
const formSchema = z.object({
  email: z.string().optional(), // Email is read only so is optional
  name: z.string().min(1, "name is required"),
  addressLine1: z.string().min(1, "address is required"),
  city: z.string().min(1, "city is required"),
  country: z.string().min(1, "country is required"),
});

//Use zod to automatically determine the type based on the schema
export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: UserFormData) => void; //Define function type
  isLoading: boolean;
  currentUser: User; //Define user type
  title?: string;
  buttonText?: string;
};

// Form for showing and updating user info
const UserProfileForm = ({
  isLoading,
  onSave,
  currentUser,
  title = "User Profile", // Default title
  buttonText = "Submit", // Default button text
}: Props) => {
  // Use the useForm hook to create a form with the schema
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema), // Define Zod validation schema
    defaultValues: currentUser, // Set default values to the current user info
  });

  // Reset the form when the current user changes
  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    // pass form to shadcn Form
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg p-3 md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>View and update your user profile</FormDescription>
        </div>

        <FormField
          // pass previously defined form control to FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          // pass previously defined form control to FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            // pass previously defined form control to FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              // flex-1: take up all available space
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            // pass previously defined form control to FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            // pass previously defined form control to FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
