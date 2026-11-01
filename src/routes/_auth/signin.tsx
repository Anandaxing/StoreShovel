import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>
        <h1>Sign In</h1>
      </div>
    </>
  )
}
