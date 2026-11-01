import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>
        <h1>Sign Up</h1>
      </div>
    </>
  )
}
