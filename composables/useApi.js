export const useApi = (request, method, payload, moreHeaders) => {
  const token = useCookie("token");
  const config = useRuntimeConfig();
  const headers = {
    ...moreHeaders,
  };

  if (token.value) {
    headers["authorization"] = `User ${token.value}`;
  }

  return $fetch(request, {
    method: method,
    headers: headers,
    body: JSON.stringify(payload),
    baseURL: config.public.baseUrl,
  });
};
