import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderNav from "./auth/Auth0ProviderNav";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

// Create a new react query client
const queryClient = new QueryClient({
  defaultOptions: {
    // Disable refetch on window focus for development
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* For handling Routing */}
    <Router>
      {/* For handling API Calls */}
      <QueryClientProvider client={queryClient}>
        {/* For handling Auth logins */}
        <Auth0ProviderNav>
          {/* All routes components*/}
          <AppRoutes />
          {/* For handling notifications on top level*/}
          <Toaster
            visibleToasts={1}
            position="top-right"
            richColors
            duration={1000}
          />
        </Auth0ProviderNav>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
