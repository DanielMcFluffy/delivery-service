import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/profile')({
  component: () => <div>Hello /(authenticated)/(dashboard)/dashboard/profile!</div>
})