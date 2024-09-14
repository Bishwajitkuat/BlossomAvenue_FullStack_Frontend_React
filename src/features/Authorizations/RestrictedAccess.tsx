function RestrictedAccess({ role }: { role: string }) {
  return (
    <div>
      <h2>This route only restricted to {role} user!</h2>
    </div>
  );
}

export default RestrictedAccess;
