import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(landing-page)/home/main')({
  component: () => <div>Hello /(landing-page)/home/main!</div>
})