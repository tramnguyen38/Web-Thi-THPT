import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Lock, LogIn, Mail } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FORM_LOGIN } from "../constants/auth";
import { AuthStorage } from "../lib/local-storage";
import authService from "../services/auth-services";
import useAuthStore from "../store/auth-store";
import { hashPassword } from "../lib/utils";

export default function Login() {
  const navigate = useNavigate();
  const { login: loginStore } = useAuthStore();
  const { mutate, isPending } = useMutation({ mutationFn: authService.login });

  const methods = useForm();

  const {
    watch,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  const isFormValid = watch(FORM_LOGIN.email) && watch(FORM_LOGIN.password);
  const isSubmitDisabled = isPending || !isFormValid;

  const onSubmit = async (data: any) => {
    if (isSubmitDisabled) return;
    const formatData = { ...data };

    mutate(formatData, {
      onSuccess: (response) => {
        loginStore(response?.data?.user!);
        AuthStorage.setAccessToken(response?.data?.tokens?.access_token!);
        AuthStorage.setRefreshToken(response?.data?.tokens?.refresh_token!);
        toast.success(response?.message);
        if (response?.data?.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
        reset();
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "Đã xảy ra lỗi trong quá trình đăng nhập");
      },
    });
  };
  const onErrors = (errors: any) => console.error(errors);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="bg-blue-600 p-3 rounded-full">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Chào mừng trở lại
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng ký miễn phí
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-xl shadow-blue-100/50 sm:rounded-xl sm:px-10">
          <FormProvider {...methods}>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onErrors)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Địa chỉ email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...register(FORM_LOGIN.email)}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    {...register(FORM_LOGIN.password)}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                  disabled={isPending}
                >
                  <span className="absolute right-3 inset-y-0 flex items-center">
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </motion.div>
    </div>
  );
}
