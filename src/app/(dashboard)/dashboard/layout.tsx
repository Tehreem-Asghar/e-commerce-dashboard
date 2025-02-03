import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
// import { AuthProvider } from "./provider/provider";
import { AuthProvider } from "@/app/provider/provider";


export default async function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
  <div>
        <AuthProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className="w-full">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
         
        </AuthProvider>
        </div>
  );
}
