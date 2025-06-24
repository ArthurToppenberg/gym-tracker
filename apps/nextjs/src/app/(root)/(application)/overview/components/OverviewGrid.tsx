interface OverviewGridProps {
  children: React.ReactNode;
}

const OverviewGrid = ({ children }: OverviewGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-1 lg:grid-cols-2">
      {children}
    </div>
  );
};

export default OverviewGrid;
