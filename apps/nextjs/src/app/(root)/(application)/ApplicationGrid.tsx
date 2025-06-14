import { SidebarProvider } from "@gym/ui/components/sidebar";
import { AppSidebar } from "./(sidebar)/AppSidebar";

interface ApplicationGridProps {
  children: React.ReactNode;
}

const ApplicationGrid = ({ children }: ApplicationGridProps) => {
  return (
    <SidebarProvider>
      <div className="flex w-full flex-row">
        <AppSidebar />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default ApplicationGrid;
