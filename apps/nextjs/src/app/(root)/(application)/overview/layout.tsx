const OverviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col px-6 pt-6">{children}</div>
  );
};

export default OverviewLayout;
