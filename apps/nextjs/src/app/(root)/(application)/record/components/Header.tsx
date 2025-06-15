interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex w-full items-center justify-center border-b pb-4">
      <h1 className="text-xl">{title}</h1>
    </div>
  );
};

export default Header;
