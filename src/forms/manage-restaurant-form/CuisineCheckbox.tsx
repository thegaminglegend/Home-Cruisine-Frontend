import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)} //Check field value array contains the current chosen cuisine
          //if checked add value to field value array
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]); //Add the cuisine to the field value array
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              ); //Remove the cuisine from the field value array
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
