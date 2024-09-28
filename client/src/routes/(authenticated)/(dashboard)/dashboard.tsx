import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard')({
  // beforeLoad: async({context}) => {
  //   const {AxiosGET} = context.axios
  //   await AxiosGET('/check-session')
  // },
})