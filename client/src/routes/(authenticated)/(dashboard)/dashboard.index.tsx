import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/')({
  component: () => <div>Hello /(authenticated)/(dashboard)/dashboard/!</div>
})