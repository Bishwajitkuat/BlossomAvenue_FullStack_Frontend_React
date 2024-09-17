import { useSearchParams } from "react-router-dom";
import useGetAllCatagories from "../../hooks/useGetAllCatagories";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useDebounce from "../../hooks/useDebounce";

function FilterProduct() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isCategoriesLoading,
    categories,
    isCategoriesError,
    categoriesError,
  } = useGetAllCatagories();
  const [searchKey, setSearchKey] = useState<string>("");

  const { debounceValue } = useDebounce<string>(searchKey);

  useEffect(() => {
    if (!debounceValue) {
      searchParams.delete("Search");
    } else searchParams.set("Search", debounceValue);
    setSearchParams(searchParams);
    if (isCategoriesError && categoriesError)
      toast.error(categoriesError.message);
  }, [
    isCategoriesError,
    categoriesError,
    isCategoriesLoading,
    debounceValue,
    searchParams,
    setSearchParams,
  ]);

  const filterByCategory = (value: string) => {
    if (!value) {
      searchParams.delete("CategoryId");
    } else searchParams.set("CategoryId", value);
    setSearchParams(searchParams);
  };

  const sortProduct = (value: string) => {
    if (!value) {
      searchParams.delete("ProductOrderWith");
      searchParams.delete("OrderBy");
    } else if (value === "CheapestFirst") {
      searchParams.set("ProductOrderWith", "Price");
      searchParams.set("OrderBy", "ASC");
    } else if (value === "ExpensiveFirst") {
      searchParams.set("ProductOrderWith", "Price");
      searchParams.set("OrderBy", "DESC");
    } else if (value === "titleAsc") {
      searchParams.set("ProductOrderWith", "Title");
      searchParams.set("OrderBy", "ASC");
    } else if (value === "titleDesc") {
      searchParams.set("ProductOrderWith", "Title");
      searchParams.set("OrderBy", "DESC");
    } else if (value === "newestFirst") {
      searchParams.set("ProductOrderWith", "CreatedAt");
      searchParams.set("OrderBy", "DESC");
    } else if (value === "oldestFirst") {
      searchParams.set("ProductOrderWith", "CreatedAt");
      searchParams.set("OrderBy", "ASC");
    } else if (value === "lowStock") {
      searchParams.set("ProductOrderWith", "Inventory");
      searchParams.set("OrderBy", "ASC");
    } else if (value === "highStock") {
      searchParams.set("ProductOrderWith", "Inventory");
      searchParams.set("OrderBy", "DESC");
    } else if (value === "") {
      searchParams.set("ProductOrderWith", "");
      searchParams.set("OrderBy", "");
    }
    setSearchParams(searchParams);
  };
  return (
    <div className="text-xl pt-12 pb-8 flex justify-between gap-12">
      <div className="justify-self-start">
        <input
          type="text"
          name="searchProduct"
          id="searchProduct"
          placeholder="Search products"
          className="py-4 px-8 bg-pink-100 tracking-widest shadow-sm shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-200 rounded-md"
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-12">
        <div>
          <label hidden htmlFor="filterByCategory">
            Categories
          </label>
          {isCategoriesLoading ? (
            <p>mini loader</p>
          ) : (
            <select
              name="filterByCategory"
              id="filterByCategory"
              onChange={(e) => filterByCategory(e.target.value)}
              className="bg-pink-100 py-4 px-8 tracking-widest shadow-sm shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-200 rounded-md"
            >
              <option value="">Categories</option>
              {Array.isArray(categories) &&
                categories.map((c) => (
                  <option key={c.categoryId} value={c.categoryId}>
                    {c.categoryName}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div>
          <label hidden htmlFor="productSort">
            Sort products
          </label>
          <select
            name="productSort"
            id="productSort"
            onChange={(e) => sortProduct(e.target.value)}
            className="bg-pink-100 py-4 px-8 tracking-widest shadow-sm shadow-zinc-500 outline-none duration-200 ease-in hover:bg-pink-200 rounded-md"
          >
            <option value="">Sort</option>
            <option value="CheapestFirst">cheapest first</option>
            <option value="ExpensiveFirst">expensive first</option>
            <option value="titleAsc">title a-z</option>
            <option value="titleDesc">title z-a</option>
            <option value="newestFirst">newest first</option>
            <option value="oldestFirst">oldest first</option>
            <option value="lowStock">low stock</option>
            <option value="highStock">high stock</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterProduct;
