export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
      <h2>Course Status</h2>
      
      {/* Publish/Unpublish Buttons */}
      <button style={{ marginRight: "10px" }}>Unpublish</button> 
      <button style={{ marginRight: "10px" }}>Publish</button>

      {/* View Notifications */}
      <button style={{ marginBottom: "10px" }}>View Course Notifications</button>
      
      <hr />

      {/* Custom Content */}
      <h3>Course Summary</h3>
      <ul>
        <li>Total Students Enrolled: 120</li>
        <li>Assignments Published: 5</li>
        <li>Modules Completed: 3/10</li>
      </ul>

      <h3>Actions</h3>
      <button style={{ marginRight: "10px" }}>Import Existing Content</button>
      <button style={{ marginRight: "10px" }}>Add New Module</button>
      <button>Generate Course Report</button>

      <hr />

      <h3>Resourses</h3>
      <button style={{ marginRight: "10px" }}>Syllabus</button>
      <button>Calendar</button>
    </div>
  );
}
