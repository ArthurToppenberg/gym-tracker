interface OverviewGridProps {
  children: React.ReactNode;
}

const OverviewGrid = ({ children }: OverviewGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

export default OverviewGrid;
