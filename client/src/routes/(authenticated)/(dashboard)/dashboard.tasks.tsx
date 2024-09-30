import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/tasks')({
  component: () => <div>Hello /(authenticated)/(dashboard)/dashboard/tasks!</div>
})