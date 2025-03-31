// import * as dao from "../../components/kambaz-node-server-app/Kambaz/Courses/dao.js";
// export default function CourseRoutes(app) {
//   app.get("/api/courses", (req, res) => {
//     const courses = dao.findAllCourses();
//     res.send(courses);
//   });

//   app.delete("/api/courses/:courseId", (req, res) => {
//     const { courseId } = req.params;
//     const status = dao.deleteCourse(courseId);
//     res.send(status);
//   });

//   app.put("/api/courses/:courseId", (req, res) => {
//     const { courseId } = req.params;
//     const courseUpdates = req.body;
//     const status = dao.updateCourse(courseId, courseUpdates);
//     res.send(status);
//   });

// }

