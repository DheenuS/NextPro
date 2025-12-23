
import { AppSidebar } from "./AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <main>
            <div className="flex-1">{children}</div>
          </main>
        </div>
    </section>
  );
}
