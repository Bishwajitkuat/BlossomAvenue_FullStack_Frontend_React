import { TailSpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-zinc-800/20">
      <TailSpin
        visible={true}
        height="240"
        width="240"
        color="#a15bb665"
        ariaLabel="tail-spin-loading"
        radius="3"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
