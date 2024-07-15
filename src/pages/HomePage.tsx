import landing from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";
import Searchbar, { SearchForm } from "@/components/Searchbar";
import { useNavigate } from "react-router-dom";

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
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Testing testing testing
        </h1>
        <span className="text-xl">Testing testing testing</span>
        {/* Search Bar */}
        <Searchbar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* grid for pictures */}
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landing} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            testing testing testing
          </span>
          <span>testing testing testing testing testing testing testing</span>
          <img src={appDownload} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
