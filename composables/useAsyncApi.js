export const useAsyncApi = (request, method = "get", payload, moreHeaders) => {
  const token = useCookie("token");
  const config = useRuntimeConfig();
  const headers = {
    ...moreHeaders,
  };

  console.log(token.value);
  
  if (token.value) {
    headers["authorization"] = `User ${token.value}`;
  }



  return useFetch(request, {
    lazy: true,
    method: method,
    headers: headers,
    body: payload,
    baseURL: config.public.baseUrl,
  });
};
