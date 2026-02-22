export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative h-screen">
    <div className="bg-blue-500 absolute top-0 left-0 w-full h-1/2 z-0" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>;
}
