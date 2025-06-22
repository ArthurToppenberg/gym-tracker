interface HeaderProps {
  title: string;
  description: string;
}

const Section = ({ title, description }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-0 rounded-lg border border-gray-200 bg-white px-4 py-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default Section;
