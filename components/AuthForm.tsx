
type FormType = "sign-in" | "sign-up"

export default function AuthForm({type}: {type: FormType}) {
  return (
    <>
      <div>
        <h1>This is Auth Form component</h1>
      </div>
    </>
  )
}