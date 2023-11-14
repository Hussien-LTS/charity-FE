import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CustomProvider } from "rsuite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./pages/Root";
import AllFamilies from "./components/Family/AllFamilies";
import FamilyMembers from "./components/Family/FamilyMembers";
import AddFamily from "./components/Family/AddFamily";

interface AppProps {
  children?: React.ReactNode;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/Families",
        element: <AllFamilies />,
      },
      {
        path: "/Families/:id",
        element: <FamilyMembers />,
      },
      {
        path: "/add-family",
        element: <AddFamily />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

function App(props: AppProps) {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CustomProvider
        // theme="dark"
        >
          {props.children}
        </CustomProvider>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
export default App;
