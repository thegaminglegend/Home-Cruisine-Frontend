import food1 from "../assets/top-view-vegetables-pan-with-vegetable-soup-with-fusilli.jpg";
import food2 from "../assets/composition-tasty-traditional-pizza.jpg";
import Searchbar, { SearchForm } from "@/components/Searchbar";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    //navigate to the search page with the search query parameter
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      {/* -mt: negative margin top */}
      {/* search bar card */}
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-secondaryColor">
          Get a Tasty Home Made Meal
        </h1>
        <span className="text-xl">
          Find a Home Cuisine at Your City or Town
        </span>
        {/* Search Bar */}
        <Searchbar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* grid for pictures */}
      <div className="grid md:grid-cols-2 gap-5">
        <AspectRatio ratio={10 / 5}>
          <img src={food1} className="rounded-md object-cover h-full w-full" />
        </AspectRatio>

        <AspectRatio ratio={10 / 5}>
          <img src={food2} className="rounded-md object-cover h-full w-full" />
        </AspectRatio>
      </div>
    </div>
  );
};

export default HomePage;
