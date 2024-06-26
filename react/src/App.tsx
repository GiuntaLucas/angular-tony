import {
  ActionFunctionArgs,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Links from "./pages/Links";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData();
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));
      return redirect("links");
    },
  },
  {
    path: "/links",
    element: <Links />,
  },
]);

function App() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="btn btn-ghost text-xl">Tony showcase</div>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
