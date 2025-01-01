import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, User, UserPlus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FORM_SIGN } from "../constants/auth";
import { ROUTES } from "../constants/route";
import { hashPassword } from "../lib/utils";
import authService from "../services/auth-services";

export default function Register() {
  const { mutate, isPending } = useMutation({ mutationFn: authService.register });
  const navigate = useNavigate();

  const methods = useForm();

  const {
    watch,
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = methods;

  const isFormValid = watch(FORM_SIGN.name) && watch(FORM_SIGN.email) && watch(FORM_SIGN.password);
  const isSubmitDisabled = isPending || !isFormValid;

  const onSubmit = async (data: any) => {
    if (isSubmitDisabled) return;
    const formatData = { ...data, password: hashPassword(data.password) };

    mutate(formatData, {
      onSuccess: (response) => {
        toast.success(response?.message);
        navigate(ROUTES.LOGIN);
        reset();
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "Đã có lỗi xảy ra");
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
            <UserPlus className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Tạo tài khoản của bạn
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng nhập
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    {...register(FORM_SIGN.name)}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
              </div>

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
                    {...register(FORM_SIGN.email)}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập email của bạn"
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
                    autoComplete="new-password"
                    required
                    {...register(FORM_SIGN.password)}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập mật khẩu mạnh"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                >
                  <span className="absolute right-3 inset-y-0 flex items-center">
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {isPending ? "Đang xử lý..." : "Tạo tài khoản"}
                </button>
              </div>
            </form>
          </FormProvider>

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc tiếp tục với</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                GitHub
              </button>
            </div>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
}
