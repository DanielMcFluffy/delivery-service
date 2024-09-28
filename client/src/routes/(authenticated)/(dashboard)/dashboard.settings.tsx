import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/settings')({
  component: () => <div>Hello /(authenticated)/(dashboard)/dashboard/settings!</div>
})