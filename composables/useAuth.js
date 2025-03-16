export const useAuth = () => {
  const router = useRouter();
  const token = useCookie("token");
  const refreshToken = useCookie("refreshToken");

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

  async function logout() {
    token.value = null;
    refreshToken.value = null;
    router.push("/login");
  }

  return { login, logout, silentMe, silentRefresh, token };
};
