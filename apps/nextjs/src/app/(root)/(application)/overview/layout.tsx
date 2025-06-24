const OverviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col px-6 pt-6 pb-24 lg:pb-0">
      {children}
    </div>
  );
};

export default OverviewLayout;
