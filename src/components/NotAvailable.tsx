import React from "react";

function NotAvailable({ item }: { item: string }) {
  return (
    <div className="h-full w-full max-w-[1280px] flex flex-grow items-center justify-center">
      <h2 className="text-4xl text-red-500">
        We're sorry, but the {item} you're trying to load is currently
        unavailable.
      </h2>
    </div>
  );
}

export default NotAvailable;
