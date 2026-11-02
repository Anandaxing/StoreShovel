import { createFileRoute } from '@tanstack/react-router'
import AuthForm from '../../components/AuthForm'

export const Route = createFileRoute('/_auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <AuthForm type="sign-up" />
      </div>
    </>
  )
}
