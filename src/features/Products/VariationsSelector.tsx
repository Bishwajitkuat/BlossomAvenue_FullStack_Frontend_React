import { Variation } from "../../utils/types/product";
import NotAvailable from "../../components/NotAvailable";

const VariationsSelector = ({
  variations,
  selectedVariation,
  setSelectedVariation,
}: {
  variations: Variation[] | undefined;
  selectedVariation: string | undefined;
  setSelectedVariation: (value: string) => void;
}) => {
  if (variations === undefined || variations.length < 1)
    return <NotAvailable item={"variations"} />;

  return (
    <div className="w-full mt-8">
      <h2 className="text-lg font-semibold text-pink-500 mb-4">
        Choose Variation
      </h2>

      <div className="space-y-4">
        {variations.map((v) => (
          <label
            key={v.variationId}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
              selectedVariation === v.variationName
                ? "border-pink-400"
                : "border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value={v.variationId}
                checked={selectedVariation === v.variationId}
                onChange={() => setSelectedVariation(v.variationId)}
                className="form-radio text-pink-500"
              />
              <span className="text-gray-700">{v.variationName}</span>
            </div>
            <span className="text-pink-500 font-semibold">
              € {v.price.toFixed(2)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default VariationsSelector;
