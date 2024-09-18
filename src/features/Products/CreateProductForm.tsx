import React, { useState } from "react";
import {
  CreateUpdateProductCategoryDto,
  ProductCreateUpdateImage,
  ProductCreateUpdateVariation,
} from "../../utils/types/product";
import toast from "react-hot-toast";
import useGetAllCatagories from "../../hooks/useGetAllCatagories";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";
import useCreateProduct from "../../hooks/products/useCreateProduct";

function CreateProductForm() {
  const {
    isCategoriesLoading,
    categories,
    isCategoriesError,
    categoriesError,
  } = useGetAllCatagories();
  const { isCreateProductLoading, createProduct } = useCreateProduct();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const newImage: ProductCreateUpdateImage = { imageUrl: "" };
  const newVariation: ProductCreateUpdateVariation = {
    variationName: "",
    price: "",
    inventory: "",
  };
  const newProductCategory: CreateUpdateProductCategoryDto = {
    categoryId: "",
  };
  const [images, setImages] = useState<ProductCreateUpdateImage[]>([newImage]);
  const [variations, setVariations] = useState<ProductCreateUpdateVariation[]>([
    newVariation,
  ]);

  const [productCategories, setProductCategories] = useState<
    CreateUpdateProductCategoryDto[]
  >([newProductCategory]);

  const handleAddNewImage = () => {
    const newImages = [...images, newImage];
    setImages(newImages);
  };
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    if (newImages.length >= 2) {
      newImages.splice(index, 1);
      setImages(newImages);
    } else {
      toast.error("Sorry! you can not remove all images.");
    }
  };

  const handelAddNewVari = () => {
    const newVaris = [...variations, newVariation];
    setVariations(newVaris);
  };

  const handleRemoveVeri = (index: number) => {
    const newVeris = [...variations];
    if (newVeris.length >= 2) {
      newVeris.splice(index, 1);
      setVariations(newVeris);
    } else {
      toast.error("Sorry! you can not remove all variations.");
    }
  };

  const handelAddProductCategory = () => {
    const newProductCategories = [...productCategories, newProductCategory];
    setProductCategories(newProductCategories);
  };

  const handleRemoveProductCategory = (index: number) => {
    const newProductCatagories = [...productCategories];
    if (newProductCatagories.length >= 2) {
      newProductCatagories.splice(index, 1);
      setProductCategories(newProductCatagories);
    } else {
      toast.error("Sorry! you can not remove all product categories.");
    }
  };

  const handelImages = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newImages = [...images];

    newImages[index][e.target.name as keyof ProductCreateUpdateImage] =
      e.target.value;
    setImages(newImages);
  };

  const handelVariations = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newVariations = [...variations];

    newVariations[index][e.target.name as keyof ProductCreateUpdateVariation] =
      e.target.value;
    setVariations(newVariations);
  };

  const handelProductCategory = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newProductCategories = [...productCategories];
    newProductCategories[index][
      e.target.name as keyof CreateUpdateProductCategoryDto
    ] = e.target.value;
    setProductCategories(newProductCategories);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      images,
      variations,
      productCategories,
    };
    createProduct(newProduct);
  };

  if (isCategoriesLoading || !categories || isCreateProductLoading)
    return <Loader />;
  if (isCategoriesError || categoriesError)
    return <Error message={"Failed to load product categories"} />;

  return (
    <div className="flex justify-center">
      <div className="m-2 rounded-md bg-pink-900/10 p-2 shadow-md shadow-zinc-900/30 md:m-8 md:w-full md:p-8">
        <form className="grid w-full gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="flex items-center py-8 text-2xl">
              <div className="flex h-full items-center justify-center  px-2"></div>
              <h3 className="text-2xl tracking-widest font-semibold ">
                Create New Product
              </h3>
            </div>
            <div className="flex items-center rounded-full bg-pink-100">
              <label
                htmlFor="title"
                className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
              >
                Title
              </label>
              <input
                className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                type="text"
                name="title"
                placeholder="Title of the product group"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center rounded-full bg-pink-100">
              <label
                htmlFor="description"
                className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
              >
                Description
              </label>
              <textarea
                className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                name="description"
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <h3 className="text-2xl tracking-widest font-semibold ">Images</h3>
            {images.map((img, index) => (
              <div className="flex flex-col gap-4" key={index}>
                <div className="flex items-center rounded-full bg-pink-100">
                  <label
                    htmlFor="address"
                    className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
                  >
                    Image url
                  </label>
                  <input
                    className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                    type="text"
                    name="imageUrl"
                    placeholder="Image url"
                    value={images[index].imageUrl}
                    onChange={(e) => handelImages(e, index)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 py-4">
                  <button
                    className="min-h-[3rem] rounded-xl bg-lime-300 px-4 py-2 uppercase  shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-lime-300/50 hover:shadow-lime-200/50"
                    type="button"
                    onClick={handleAddNewImage}
                  >
                    +
                  </button>
                  <button
                    className="min-h-[3rem] rounded-xl bg-orange-200 px-4 py-2 uppercase  shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-orange-300 hover:shadow-orange-300/50"
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <h3 className="text-2xl tracking-widest font-semibold ">
              Variations
            </h3>
            {variations.map((veri, index) => (
              <div className="flex flex-col gap-4" key={index}>
                <div className="flex items-center rounded-full bg-pink-100">
                  <label
                    htmlFor="variationName"
                    className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
                  >
                    Variation
                  </label>
                  <input
                    className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                    type="text"
                    name="variationName"
                    placeholder="variation name"
                    value={variations[index].variationName}
                    onChange={(e) => handelVariations(e, index)}
                    required
                  />
                </div>
                <div className="flex items-center rounded-full bg-pink-100">
                  <label
                    htmlFor="price"
                    className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
                  >
                    Price
                  </label>
                  <input
                    className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                    type="text"
                    name="price"
                    placeholder="product price as number. eg 60.50"
                    value={variations[index].price}
                    onChange={(e) => handelVariations(e, index)}
                    required
                  />
                </div>
                <div className="flex items-center rounded-full bg-pink-100">
                  <label
                    htmlFor="inventory"
                    className="min-w-[7rem] border-e border-pink-400 py-4 px-4"
                  >
                    inventory
                  </label>
                  <input
                    className="w-full rounded-full rounded-s bg-pink-100 px-2 py-3 outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-400 focus:ring-opacity-30"
                    type="text"
                    name="inventory"
                    placeholder="product stock amount in number. eg. 10"
                    value={variations[index].inventory}
                    onChange={(e) => handelVariations(e, index)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 py-4">
                  <button
                    className="min-h-[3rem] rounded-xl bg-lime-300 px-4 py-2 uppercase  shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-lime-300/50 hover:shadow-lime-200/50"
                    type="button"
                    onClick={handelAddNewVari}
                  >
                    +
                  </button>
                  <button
                    className="min-h-[3rem] rounded-xl bg-orange-200 px-4 py-2 uppercase  shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-orange-300 hover:shadow-orange-300/50"
                    type="button"
                    onClick={() => handleRemoveVeri(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <h3 className="text-2xl tracking-widest font-semibold ">
              Product Categories
            </h3>
            {productCategories.map((img, index) => (
              <div className="flex gap-4" key={index}>
                <select
                  name="categoryId"
                  id="categoryId"
                  onChange={(e) => handelProductCategory(e, index)}
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
                <div className="flex justify-end gap-4 py-4">
                  <button
                    className="min-h-[3rem] rounded-xl bg-lime-300 px-4 py-2 uppercase  shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-lime-300/50 hover:shadow-lime-200/50"
                    type="button"
                    onClick={handelAddProductCategory}
                  >
                    +
                  </button>
                  <button
                    className="min-h-[3rem] rounded-xl bg-orange-200 px-4 py-2 uppercase  shadow-md shadow-zinc-500 outline-none duration-200 ease-in hover:bg-orange-300 hover:shadow-orange-300/50"
                    type="button"
                    onClick={() => handleRemoveProductCategory(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button type="submit">Create Product</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProductForm;
