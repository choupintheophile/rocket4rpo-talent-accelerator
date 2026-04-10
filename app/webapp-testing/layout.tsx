import { AppSidebar } from "@/components/webapp/AppSidebar";

export const metadata = {
  title: "Vivier TA/TAM | Rocket4RPO",
};

export default function WebappLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f7f7f5]">
      <AppSidebar />
      <main className="mt-14 lg:mt-0 lg:ml-[220px] flex-1">{children}</main>
    </div>
  );
}
