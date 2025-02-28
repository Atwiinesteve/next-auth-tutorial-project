export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="h-full px-4 py-6 lg:px-8">{children}</div>
    </div>
  );
}
