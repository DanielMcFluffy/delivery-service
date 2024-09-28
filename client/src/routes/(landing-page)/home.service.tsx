import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(landing-page)/home/service')({
  component: () => <div>Hello /(landing-page)/home/service!</div>
})