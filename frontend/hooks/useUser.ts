import {
  api,
  fetchUser,
  loginUser,
  registerUser,
  resetOtp,
  resetPassword,
  verifyOtp,
} from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
}

interface verifyOtpInput {
  email: string;
  otp: number | string;
}

interface resetPasswordInput {
  email: string;
  password: string;
}

interface resetOtpInput {
  email: string;
  type: "reset" | "verify";
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginInput) =>
      loginUser({ email, password }),

    onMutate: () => {
      toast.loading("Logging you in...", { id: "login-loading" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Dismiss loading toast first
      toast.dismiss("login-loading");

      toast.success("Login successful!", {
        description: "Redirecting you shortly",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    },

    onError: (error: AxiosError<{ message: string }>) => {
      // Dismiss loading toast on error
      toast.dismiss("login-loading");

      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error("Login failed", {
        description: errorMessage,
      });
    },
  });

  return mutation;
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ name, email, password }: RegisterInput) =>
      registerUser({ name, email, password }),
    onMutate: () => {
      toast.loading("Creating your account", { id: "register-loading" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      toast.dismiss("register-loading");
      toast.success("Account Created Successfully!", {
        description: "Redirecting you shortly..",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.dismiss("register-loading");
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error("Register failed", {
        description: errorMessage,
      });
    },
  });
  return mutation;
}

export function useResetOtp() {
  const mutation = useMutation({
    mutationFn: ({ email, type }: resetOtpInput) => resetOtp({ email, type }),
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error("otp sending failed", {
        description: errorMessage,
      });
    },
  });

  return mutation;
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ email, otp }: verifyOtpInput) => verifyOtp({ email, otp }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error("otp verification failed", {
        description: errorMessage,
      });
    },
  });

  return mutation;
}

export function useResetPassword() {
  const mutation = useMutation({
    mutationFn: ({ email, password }: resetPasswordInput) =>
      resetPassword({ email, newPassword: password }),
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error("password reset failed", {
        description: errorMessage,
      });
    },
  });

  return mutation;
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: async () => {
      try {
        console.log("deleting user");
        const res = await api.delete("/api/auth/delete");
        return res.data;
      } catch (err: unknown) {
        if (err instanceof AxiosError)
          console.error("Delete user API error:", err.response || err);
        throw err; // let React Query handle it
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error("Account deletion failed", {
        description: errorMessage,
      });
    },
  });
}
