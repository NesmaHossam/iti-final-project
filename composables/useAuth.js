export const useAuth = () => {
  const router = useRouter();
  const token = useCookie("token");
  const refreshToken = useCookie("refreshToken");

  // sign up 
  async function signup (data) {
    try {
      const res = await useApi("/auth/signup", "POST", data);
      console.log(res);
      return res;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?._data?.message || "Login failed");
    }
  }
  // login
  async function login(data) {
    try {
      const res = await useApi("/auth/login", "POST", data);
      token.value = res.accessToken;
      refreshToken.value = res.refreshToken;
      router.push('/')
      return res;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?._data?.message || "Login failed");
    }
  }

  async function loginWithGoogle() {
    try {
      const res = await useApi("/auth/google/login", "POST");
      token.value = res.accessToken;
      refreshToken.value = res.refreshToken;
      return res;
    } catch (error) {
      console.error("Google login error:", error);
      throw new Error(error.response?._data?.message || "Google login failed");
    }
  }

  async function silentMe() {
    try {
      const res = await useApi("/auth/me", "GET");
      return res;
    } catch (error) {
      console.log(error.response?._data?.message || "Login failed");
      router.push("/login");
    }
  }

  async function silentRefresh() {
    try {
      const res = await useApi("/auth/refresh", "POST", {
        refreshToken: refreshToken.value,
      });
      token.value = res.accessToken;
      return res;
    } catch (error) {
      console.log(error.response?._data?.message || "Login failed");
      router.push("/auth/Login");
    }
  }

  // logout
  async function logout() {
    token.value = null;
    refreshToken.value = null;
    router.push("/auth/Login");
  }
  // forget password
  async function requestPasswordReset(email) {
    try {
      const res = await useApi("/auth/forgot-password", "POST", { email });
      return res;
    } catch (error) {
      console.error("Password reset error:", error);
      throw new Error(
        error.response?._data?.message || "Failed to send reset link"
      );
    }
  }

  // reset password

  async function resetPassword(newPassword) {
    try {
      const res = await useApi("/auth/reset-password", "POST", { newPassword });
      return res;
    } catch (error) {
      console.error("Password reset error:", error);
      throw new Error(
        error.response?._data?.message || "Failed to reset password"
      );
    }
  }

  // OTP
  const isAuthenticated = ref(false);
  const requestOTP = async (email) => {
    console.log(`Requesting password reset for ${email}`);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };
  const verifyOTP = async (otp) => {
    console.log(`Verifying OTP: ${otp}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (otp === "1234") {
          isAuthenticated.value = true;
          resolve();
        } else {
          throw new Error("Invalid OTP");
        }
      }, 1000);
    });
  };

  return {
    signup,
    login,
    logout,
    silentMe,
    silentRefresh,
    loginWithGoogle,
    requestPasswordReset,
    resetPassword,
    isAuthenticated,
    requestOTP,
    verifyOTP,
    token,
  };
};
