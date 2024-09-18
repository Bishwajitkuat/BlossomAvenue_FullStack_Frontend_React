function Error({ message }: { message: string }) {
  return (
    <div className="h-full w-full max-w-[1280px] flex flex-col gap-8 flex-grow items-center justify-center">
      <h2 className="text-2xl text-red-500">
        We're sorry, Some error occurred. Please try again!
      </h2>
      <h3 className="text-xl text-red-500">Error: {message}</h3>
    </div>
  );
}

export default Error;
