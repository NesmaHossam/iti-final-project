export const useAuth = () => {
  const router = useRouter();
  const token = useCookie("token");
  const refreshToken = useCookie("refreshToken");

  // login
  async function login(credentials) {
    try {
      const res = await useApi("/auth/login", "POST", credentials);

      token.value = res.accessToken;
      refreshToken.value = res.refreshToken;

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
      router.push("/login");
    }
  }

  // logout
  async function logout() {
    token.value = null;
    refreshToken.value = null;
    router.push("/login");
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
      throw new Error(error.response?._data?.message || "Failed to reset password");
    }
  }

  return {
    login,
    logout,
    silentMe,
    silentRefresh,
    loginWithGoogle,
    requestPasswordReset,
    resetPassword,
    token,
  };
};
