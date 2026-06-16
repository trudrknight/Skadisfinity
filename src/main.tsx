import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadCloudflareAnalytics } from "./lib/cloudflareAnalytics";

loadCloudflareAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
