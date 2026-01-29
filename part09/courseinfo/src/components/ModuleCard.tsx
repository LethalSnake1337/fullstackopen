import { CoursePart } from "../types";

interface ModuleCardProps {
  module: CoursePart;
}

const ModuleCard = ({ module }: ModuleCardProps) => {
  const renderContent = () => {
    switch (module.kind) {
      case "basic":
        return (
          <>
            <h3>
              {module.name} {module.exerciseCount}
            </h3>
            <p>
              <em>{module.description}</em>
            </p>
          </>
        );
      case "group":
        return (
          <>
            <h3>
              {module.name} {module.exerciseCount}
            </h3>
            <p>project exercises {module.groupProjectCount}</p>
          </>
        );
      case "background":
        return (
          <>
            <h3>
              {module.name} {module.exerciseCount}
            </h3>
            <p>
              <em>{module.description}</em>
            </p>
            <p>background material: {module.backgroundMaterial}</p>
          </>
        );
      case "special":
        return (
          <>
            <h3>
              {module.name} {module.exerciseCount}
            </h3>
            <p>
              <em>{module.description}</em>
            </p>
            <p>required skills: {module.requirements.join(", ")}</p>
          </>
        );
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default ModuleCard;
