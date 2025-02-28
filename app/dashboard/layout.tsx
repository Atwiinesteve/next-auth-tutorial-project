import { DashboardNav } from '@/components/dashboard-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Dashboard Grid */}
      <div className="grid lg:grid-cols-5">
        <DashboardNav className="hidden lg:block" />
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}