const Header = ({ course }) => {
  if (course === undefined) {
    return <h1>No course</h1>;
  }
  return <h1>{course.name}</h1>;
};

export default Header;
