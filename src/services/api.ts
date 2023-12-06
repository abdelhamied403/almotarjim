import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    const locale = localStorage.getItem("locale");
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["App-Lang"] = locale;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// put formAxios in its own module to reuse it across the project
const formAxios = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  transformRequest: [
    function (data, headers) {
      if (
        headers["Content-Type"] &&
        typeof headers["Content-Type"] === "string" &&
        headers["Content-Type"].startsWith("multipart/form-data")
      ) {
        const form = new FormData();
        for (const key in data) {
          const value = data[key];
          if (Array.isArray(value)) {
            const arrayKey = `${key}[]`;
            value.forEach((v) => {
              form.append(arrayKey, v);
            });
          } else {
            form.append(key, value);
          }
        }
        return form;
      }

      return data;
    },
  ],
});

formAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { api, formAxios };
