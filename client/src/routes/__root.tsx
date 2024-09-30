import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { useAxios } from "../hooks/useAxios";

export type MyRouterContext = {
    axios: ReturnType<typeof useAxios>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function Root() {

  return(
    <>
      <Outlet />
    </>
  )
}
