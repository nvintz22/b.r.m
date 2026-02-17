import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("apply-now", "routes/apply-now.tsx"),
  route("services", "routes/services.tsx"),
  route("licenses", "routes/licenses.tsx"),
  route("partners", "routes/partners.tsx"),
  route("partners/:partnerId", "routes/partners.$partnerId.tsx"),
] satisfies RouteConfig;
