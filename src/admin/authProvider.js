const authProvider = {
  login: async ({ username, password }) => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error de login");
    }

    if (data.user.role !== "admin") {
      throw new Error("No eres administrador");
    }

    localStorage.setItem("adminUser", JSON.stringify(data.user));
    return Promise.resolve();
  },

  logout: async () => {
    localStorage.removeItem("adminUser");
    return Promise.resolve();
  },

  checkAuth: async () => {
    const user = localStorage.getItem("adminUser");

    if (!user) {
      return Promise.reject();
    }

    return Promise.resolve();
  },

  checkError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("adminUser");
      return Promise.reject();
    }

    return Promise.resolve();
  },

  getPermissions: async () => {
    const user = JSON.parse(localStorage.getItem("adminUser"));
    return user?.role || "user";
  },

  getIdentity: async () => {
    const user = JSON.parse(localStorage.getItem("adminUser"));

    if (!user) {
      return Promise.reject();
    }

    return Promise.resolve({
      id: user.email,
      fullName: user.name,
    });
  },
};

export default authProvider;