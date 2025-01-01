import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import useAuthStore from "./store/auth-store";
import AdminQuestions from "./pages/admin/AdminQuestions";

// Lazy load components
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const AdminCourses = React.lazy(() => import("./pages/admin/AdminCourses"));
const AdminExams = React.lazy(() => import("./pages/admin/AdminExams"));
const CourseDetail = React.lazy(() => import("./pages/admin/CourseDetail"));
const AdminExamDetail = React.lazy(() => import("./pages/admin/ExamDetail"));
const ExamDetail = React.lazy(() => import("./pages/user/ExamDetail"));
const ExamDetailTake = React.lazy(() => import("./pages/user/ExamDetailTake"));
const AdminAnalytics = React.lazy(() => import("./pages/admin/AdminAnalytics"));
const UserDashboard = React.lazy(() => import("./pages/user/Dashboard"));
const UserLessons = React.lazy(() => import("./pages/user/UserLessons"));
const LessonDetail = React.lazy(() => import("./pages/LessonDetail"));
const Practice = React.lazy(() => import("./pages/user/Practice"));
const Exams = React.lazy(() => import("./pages/user/Exams"));
const Error = React.lazy(() => import("./pages/Error"));
const Loading = React.lazy(() => import("./pages/Loading"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const { isAuthenticated, userRole } = useAuthStore();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loading />}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {isAuthenticated && userRole === "admin" && (
                    <>
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/admin/courses/:id" element={<CourseDetail />} />
                      <Route path="/admin/courses" element={<AdminCourses />} />
                      <Route path="/admin/exams/:id" element={<AdminExamDetail />} />
                      <Route path="/admin/exams" element={<AdminExams />} />
                      <Route path="/admin/questions" element={<AdminQuestions />} />
                      <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    </>
                  )}

                  {isAuthenticated && userRole === "user" && (
                    <>
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/lessons/:id" element={<LessonDetail />} />
                      <Route path="/lessons" element={<UserLessons />} />
                      <Route path="/practice" element={<Practice />} />
                      <Route path="/exams/take/:id" element={<ExamDetailTake />} />
                      <Route path="/exams/:id" element={<ExamDetail />} />
                      <Route path="/exams" element={<Exams />} />
                    </>
                  )}

                  <Route path="/error" element={<Error />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </Suspense>
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
