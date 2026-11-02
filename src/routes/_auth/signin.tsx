import { createFileRoute } from '@tanstack/react-router'
import AuthForm from '../../components/AuthForm'

export const Route = createFileRoute('/_auth/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>
        <h1>Sign In</h1>
        <AuthForm type="sign-in" />
      </div>
    </>
  )
}
