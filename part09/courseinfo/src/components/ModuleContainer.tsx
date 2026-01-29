import ModuleCard from "./ModuleCard";
import { CoursePart } from "../types";

interface ModuleContainerProps {
  modules: CoursePart[];
}

const ModuleContainer = ({ modules }: ModuleContainerProps) => {
  return (
    <div>
      {modules.map((module, idx) => (
        <ModuleCard key={idx} module={module} />
      ))}
    </div>
  );
};

export default ModuleContainer;
