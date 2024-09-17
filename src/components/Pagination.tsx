import { useSearchParams } from "react-router-dom";
import { PaginationPropType } from "../utils/types/pagination";

function Pagination({
  currentPage,
  itemPerPage,
  totalItemCount,
  totalPageCount,
}: PaginationPropType) {
  const [searchParams, setSearchParams] = useSearchParams();
  const nextPage = () => {
    if (totalPageCount && currentPage && totalPageCount > currentPage) {
      const nextPageNum = currentPage + 1;
      searchParams.set("PageNo", nextPageNum.toString());
      setSearchParams(searchParams);
    }
  };

  const previousPage = () => {
    if (currentPage && 1 < currentPage) {
      const previousPageNum = currentPage - 1;
      searchParams.set("PageNo", previousPageNum.toString());
      setSearchParams(searchParams);
    }
  };

  const pageSize = (count: string) => {
    searchParams.set("PageSize", count);
    setSearchParams(searchParams);
  };
  return (
    <div className="w-full flex gap-8 justify-center min-h-[4rem]">
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          title={
            currentPage === 1
              ? "You are in the first page"
              : "go to previous page"
          }
        >
          Previous
        </button>
        <p className="flex items-center justify-center">
          {currentPage && currentPage}
        </p>
        <button
          onClick={nextPage}
          disabled={totalPageCount === currentPage}
          title={
            totalPageCount === currentPage
              ? "You are in the last page"
              : "go to next page."
          }
        >
          Next
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <p>Item per page</p>
        <select
          className="bg-pink-200 outline-none"
          name="itemPerPage"
          id="itemPerPage"
          value={itemPerPage}
          onChange={(e) => pageSize(e.target.value)}
        >
          <option value="2">2</option>
          <option value="10">10</option>
          <option value="10">20</option>
          <option value="10">50</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
