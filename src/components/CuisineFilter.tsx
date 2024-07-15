import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  //function to handle selecting and unchecking cuisines
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    //if the cuisine is checked, add it to the selectedCuisines array
    //if the cuisine is unchecked, remove it from the selectedCuisines array
    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };

  //function to handle resetting sekected cuisine filters
  const handleCuisinesReset = () => {
    onChange([]);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {cuisineList.map((cuisine) => {
          //check if the current cuisine is selected
          const isSelected = selectedCuisines.includes(cuisine);
          return (
            <div className="flex">
              <input
                id={`cuisine_${cuisine}`}
                type="checkbox"
                checked={isSelected}
                className="hidden"
                value={cuisine}
                onChange={handleCuisinesChange}
              />
              <Label
                htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 items-center cursor-pointer 
                    text-sm rounded-full px-4 py-2 font-semibold ${
                      isSelected
                        ? "border border-green-600 text-green-600"
                        : "border border-slate-300"
                    }`}
              >
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </Label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CuisineFilter;
