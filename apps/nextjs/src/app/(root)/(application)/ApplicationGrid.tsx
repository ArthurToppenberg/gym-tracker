import { SidebarProvider } from "@gym/ui/components/sidebar";
import { AppSidebar } from "./components/AppSidebar";

const ApplicationGrid = () => {
  return (
    <SidebarProvider>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
};

export default ApplicationGrid;
