import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import Searchbar, { SearchForm } from "@/components/Searchbar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
};

const SearchPage = () => {
  //use the city parameter from the url
  //Because of react life cycle, city might be undefined at first
  const { city } = useParams();
  //search state
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  //Edge Cases:
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!results?.data || results.data.length === 0 || !city) {
    return <span>No Results Found</span>;
  }

  //Function to update selected cuisines
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1, //bring user back to page 1
    }));
  };

  //Function to update page number
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  //Function to update search query
  const setSearchQuery = (searchFormData: SearchForm) => {
    //update search state by copying the previous state and updating the searchQuery
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1, //bring user back to page 1
    }));
  };

  //function to reset search query
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1, //bring user back to page 1
    }));
  };

  return (
    // grid-cols-[250px_1fr]: 2 column layout, left fixed to 250px and right takes the remaining space
    <div className="grid gird-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      {/* cuisines list */}
      <div className="" id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
        />
      </div>
      {/* main content */}
      <div id="main-content" className="flex flex-col gap-5">
        {/* Search Bar */}
        <Searchbar
          searchQuery={searchState.searchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
        />
        {/* Restraunts Info */}
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
