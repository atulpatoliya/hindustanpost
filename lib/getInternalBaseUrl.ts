const ensureProtocol = (url: string) => {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  const isLocal = url.includes("localhost") || url.startsWith("127.");
  return `${isLocal ? "http" : "https"}://${url}`;
};

const getInternalBaseUrl = async (): Promise<string> => {
  const explicit =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.BASE_URL;
  if (explicit) {
    return ensureProtocol(explicit);
  }

  const vercelHost = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelHost) {
    return ensureProtocol(vercelHost);
  }

  return "http://localhost:3000";
};

export default getInternalBaseUrl;
