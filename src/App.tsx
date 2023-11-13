import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import { CustomProvider } from "rsuite";
import ShowAllFamilies from "./components/Family/ShowAllFamilies";
interface AppProps {
  children?: React.ReactNode;
}
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        path: "/dashboard/fam",
        element: <ShowAllFamilies />,
      },
    ],
  },
]);

function App(props: AppProps) {
  return (
    <div>
      <CustomProvider theme="dark">{props.children}</CustomProvider>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
