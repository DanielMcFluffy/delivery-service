import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import React from "react";
import { useAxios } from "./hooks/useAxios";
import { BaseContext } from "./contexts/baseContext";
import { Loading } from "./components/Loading";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//where we create the instance of router to be used all over the application
const router = createRouter({
  routeTree,
  context: {
    axios: undefined!
  }
});

//we are extending the Register interface from the tanstack router module to include the router as a type of our router instance -- this establishes type-safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const [showLoading, setShowLoading] = React.useState(false);
  return (
    <BaseContext.Provider value={{
      showLoading, 
      setShowLoading,
      }}> 
      <Main />
    </BaseContext.Provider>
  );
};

const Main = () => {
  const axios = useAxios();

  const showLoading = React.useContext(BaseContext)!.showLoading;

  return (
    <>
    <ToastContainer />
    <Loading 
      showLoading={showLoading}/>
    <RouterProvider 
      router={router} 
      context={{ axios }} />
    </>
  );
};

export default App