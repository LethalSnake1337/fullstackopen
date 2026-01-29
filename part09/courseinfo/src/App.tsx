import ModuleHeader from "./components/ModuleHeader";
import ModuleContainer from "./components/ModuleContainer";
import ExerciseStats from "./components/ExerciseStats";
import { CURRICULUM_TITLE, CURRICULUM_MODULES } from "./data/curriculum";

const App = () => {
  return (
    <div>
      <ModuleHeader title={CURRICULUM_TITLE} />
      <ModuleContainer modules={CURRICULUM_MODULES} />
      <ExerciseStats modules={CURRICULUM_MODULES} />
    </div>
  );
};

export default App;
