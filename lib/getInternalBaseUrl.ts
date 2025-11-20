import { headers } from "next/headers";

const getInternalBaseUrl = async (): Promise<string> => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  const hdrs = await headers();
  const host = hdrs.get("host");
  if (host) {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    return `${protocol}://${host}`;
  }

  return "http://localhost:3000";
};

export default getInternalBaseUrl;
