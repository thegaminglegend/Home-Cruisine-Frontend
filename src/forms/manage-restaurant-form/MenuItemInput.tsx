import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  //So that we can link the price and name of menu item the RHF library
  //and to the fields array in parent
  const { control } = useFormContext();
  return (
    <div className="flex flex-row items-end gap-2">
      {/* Name Field */}
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Dumplings" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Price Field */}
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price ($) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="10.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Remove Button */}
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
