import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number; //current page number
  pages: number; //total number of pages
  onPageChange: (page: number) => void; //function to change the page
};

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  //create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Display Previous Page Button if there is one; Pass previous page
            #: link that goes no where
        */}
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}

        {/* Page numbers in between; Pass page number clicked */}
        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(number)}
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* display Next Page Button when there is next page; 
        Pass next page*/}
        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
