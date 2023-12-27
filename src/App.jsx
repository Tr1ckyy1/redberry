import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import BlogPage from "./pages/BlogPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route
          path="blogs/:blogId"
          errorElement={<h1>There are no blogs created currently</h1>}
          element={<BlogPage />}
        />
      </Route>
      <Route
        path="/createblog"
        element={
          <ProtectedRoutes>
            <CreateBlog />
          </ProtectedRoutes>
        }
      />
    </>,
  ),
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
