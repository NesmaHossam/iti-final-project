export const useAsyncApi = (request, method = "get", payload, moreHeaders) => {
  const token = useCookie("token");
  const config = useRuntimeConfig();
  const headers = {
    ...moreHeaders,
  };

  if (token.value) {
    headers["Authorization"] = `Bearer ${token.value}`;
  }

  return useFetch(request, {
    lazy: true,
    method: method,
    headers: headers,
    body: payload,
    baseURL: config.public.baseUrl,
  });
};
