import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, BookOpen, FileText, BarChart2, Menu, X, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../store/auth-store";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/user-services";
import { ROUTES } from "../constants/route";
import { toast } from "sonner";
import { AuthStorage } from "../lib/local-storage";

const Error = React.lazy(() => import("../pages/Error"));
const Loading = React.lazy(() => import("../pages/Loading"));

const adminLinks = Object.freeze([
  { path: "/admin", label: "Trang chủ", icon: <BarChart2 className="w-5 h-5" /> },
  { path: "/admin/courses", label: "Khóa học", icon: <BookOpen className="w-5 h-5" /> },
  { path: "/admin/exams", label: "Kiểm tra", icon: <FileText className="w-5 h-5" /> },
  { path: "/admin/questions", label: "Câu hỏi", icon: <HelpCircle className="w-5 h-5" /> },
  
]);

const userLinks = Object.freeze([
  { path: "/dashboard", label: "Trang chủ", icon: <BarChart2 className="w-5 h-5" /> },
  { path: "/lessons", label: "Bài học", icon: <BookOpen className="w-5 h-5" /> },
  { path: "/practice", label: "Ôn tập", icon: <FileText className="w-5 h-5" /> },
  { path: "/exams", label: "Kiểm tra", icon: <FileText className="w-5 h-5" /> },
]);

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout, login: loginStore } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const activeLinks = user?.role === "admin" ? adminLinks : userLinks;

  const handleLogout = () => {
    AuthStorage.clearToken();
    logout();
    navigate(ROUTES.LOGIN);
    toast.success("Đăng xuất thành công");
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [`user-profile`],
    queryFn: () => userService.me(),
    refetchOnWindowFocus: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (data) loginStore(data?.data!);
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Ôn thi THPT môn Tin</span>
            </Link>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
                {activeLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="w-5 h-5" />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đăng kí
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {isAuthenticated &&
                activeLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === link.path
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
            </div>
            <div className="px-4 py-3 border-t">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center text-gray-700 hover:text-blue-600 py-2 transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Đăng kí
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
