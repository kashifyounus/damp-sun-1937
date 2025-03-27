import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}
/// OLD
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });
  if (res.ok) {
    console.log("res", res);
    return res;
  }
  const error = await res.json();
  throw new Error(error?.error || "Request failed");
  //throw await res.json();
  //await throwIfResNotOk(res);
}
export async function apiFileRequest(
  method: string,
  url: string,
  file?: File | null
): Promise<Response> {
  try {
    if (!file) {
      throw new Error("Screenshot file not found");
    }
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    const options: RequestInit = {
      method,
      body: formData,
      credentials: "include",
    };
    const res = await fetch(url, options);
    if (res.ok) {
      console.log("res", res);
      return res;
    }
    throw await res.json(
      //new Error("Request failed")
    );
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}
//// NEW
export async function apiRequestNew(
  method: string,
  url: string,
  data?: Record<string, any>,
  file?: File | null
): Promise<Response> {
  if (!file) {
    throw new Error("Screenshot file not found");
  }

  const formData = new FormData();

  // Append JSON data as a string
  if (data) {
    formData.append("jsonData", JSON.stringify(data)); // Important: Stringify JSON
  }

  // Append file if provided
  if (file) {
    formData.append("file", file);
  }

  const options: RequestInit = {
    method,
    body: formData,
    credentials: "include",
  };

  try {
    const res = await fetch(url, options);
    if (res.ok) {
      console.log("res", res);
      return res;
    }
    throw await res.json();
    // if (!res.ok) {
    //   const errorText = await res.text();
    //   throw new Error(errorText || "Request failed");
    // }

    // console.log("Response:", res);
    // return res;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
