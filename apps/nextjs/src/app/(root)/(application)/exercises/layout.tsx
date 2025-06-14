const ExercisesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-4 px-2 pt-2 pb-20 lg:px-[25%] lg:pt-6 lg:pb-0">
      {children}
    </div>
  );
};

export default ExercisesLayout;
