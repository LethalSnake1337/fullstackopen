interface ModuleHeaderProps {
  title: string;
}

const ModuleHeader = ({ title }: ModuleHeaderProps) => {
  return <h1>{title}</h1>;
};

export default ModuleHeader;
