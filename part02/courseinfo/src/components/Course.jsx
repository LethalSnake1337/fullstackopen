import Content from "./Content";
import Header from "./Header";
import Part from "./Part";

const Course = ({ course }) => {
  console.log(course);

  const parts = course.parts;

  const initialValue = 0;
  const totalExercises = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue
  );

  console.log(totalExercises);
  return (
    <>
      <Header name={course.name} />
      <Content>
        {course.parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </Content>
      <p>total of {totalExercises} Exercises</p>
    </>
  );
};

export default Course;
