export const useApi = (request, method, payload, moreHeaders) => {
  const token = useCookie("token");
  const user = useCookie("userData")
  const config = useRuntimeConfig();
  const headers = {
    ...moreHeaders,
  };

  if (token.value && user.value.role == 'User') {
    headers["authorization"] = `User ${token.value}`;
    
  }
  if (token.value && user.value.role == 'Admin') {
    headers["authorization"] = `Admin ${token.value}`;
  }


  const body = payload instanceof FormData ? payload : JSON.stringify(payload);


  return $fetch(request, {
    method: method,
    headers: headers,
    body: body,
    baseURL: config.public.baseUrl,
  });
};
