export default function getClientUrl() {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";

  if (process.env.APP_NAME === "Paving") return "https://paving.bowmark.ca";
  if (process.env.APP_NAME === "Concrete") return "https://concrete.bowmark.ca";

  return "error://";
}
