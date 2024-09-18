function RestrictedAccess({ role }: { role: string }) {
  return (
    <div className="h-full w-full flex flex-grow items-center justify-center">
      <h2 className="text-4xl text-red-500">
        This route only restricted to {role} user!
      </h2>
    </div>
  );
}

export default RestrictedAccess;
