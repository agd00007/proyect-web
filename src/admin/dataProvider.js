const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const httpClient = async (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem("adminUser"));

  options.headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-user-role": user?.role || "",
  });

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    const error = new Error(json.message || "Error en la petición");
    error.status = response.status;
    throw error;
  }

  return json;
};

const dataProvider = {
  getList: async (resource) => {
    const data = await httpClient(`${API_URL}/admin/${resource}`);
    return {
      data,
      total: data.length,
    };
  },

  getOne: async (resource, params) => {
    const data = await httpClient(`${API_URL}/admin/${resource}/${params.id}`);
    return { data };
  },

  update: async (resource, params) => {
    const data = await httpClient(`${API_URL}/admin/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data };
  },

  getMany: async (resource, params) => {
    const results = await Promise.all(
      params.ids.map((id) => httpClient(`${API_URL}/admin/${resource}/${id}`))
    );

    return { data: results };
  },

  getManyReference: async () => {
    return { data: [], total: 0 };
  },

  create: async () => {
    throw new Error("Create no implementado todavía");
  },

  delete: async () => {
    throw new Error("Delete no implementado todavía");
  },

  deleteMany: async () => {
    return { data: [] };
  },

  updateMany: async () => {
    return { data: [] };
  },
};

export default dataProvider;