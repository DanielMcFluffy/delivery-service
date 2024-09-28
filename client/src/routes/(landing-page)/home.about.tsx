import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(landing-page)/home/about')({
  component: () => <div>Hello /(landing-page)/home/about!</div>
})