import { Provider, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import store from "./store";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import People from "./Courses/People";
import Enrollment from "./Courses/Enrollment";
import Session from "./Account/Session";

import "./Kambaz.css";
import "./styles.css";

// import * as db from "./Database";

import * as client from "./Courses/client";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";




export default function Kambaz() {

  console.log(store.getState()); // 打印初始状态


  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };


  const fetchCourses = async () => {
    // console.log('findMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCoursesfindMyCourses');

    // try {
    const courses = await userClient.findMyCourses();
    setCourses(courses);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);




  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })
    );
  };





  return (


    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>

            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="Dashboard" element={<ProtectedRoute>
              <Dashboard
                courses={courses}

                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
              />
            </ProtectedRoute>} />

            <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />

            <Route path="Courses/:cid/People" element={<ProtectedRoute><People /></ProtectedRoute>} />
            <Route path="Courses/:cid/Enrollment" element={<ProtectedRoute><Enrollment /></ProtectedRoute>} />

            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>

  );
}

