import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { createAccount } from "#/lib/actions/user.action"

// const formSchema = z.object({
//   fullName: z
//     .string()
//     .min(5, "Bug title must be at least 5 characters.")
//     .max(64, "Bug title must be at most 64 characters."),
//   email: z
//     .string()
//     .min(5, "Description must be at least 5 characters.")
//     .max(96, "Description must be at most 96 characters."),
// })

type AuthFormTypes = {
  fullName: string,
  email: string,
}

type FormType = "sign-in" | "sign-up"

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z
      .string()
      .min(5, "Your email must be at least 5 characters long.")
      .max(96, "Your email must be at most 96 characters long.")
      .email()
    ,
    fullName: formType == 'sign-up' ?
      z.string()
        .min(5, "Your name must be at least 5 characters.")
        .max(64, "Your name must be at most 64 characters.")
      :
      z.string()
    ,
  })
}

export default function AuthForm({ type }: { type: FormType }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [accountId, setAccountId] = useState(null)
  const formSchema = authFormSchema(type)
  
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({value}) => {
      setIsLoading(true)
      setErrorMessage("")
        
      try {      
        const user = await createAccount({
          data: {          
            fullName: value.fullName || "",
            email: value.email
          }
        })
      } catch (error) {
        setErrorMessage('Failed to create an account, please try again.')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
      

      setAccountId(user.accountId)
    },
  })
  return (
    <>
      <form
        id="bug-report-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="auth-form"
      >
        <h1 className="form-title">
          {type == 'sign-in' ? "Sign In" : "Sign Up"}
        </h1>
        {type == 'sign-up' && (
          <FieldGroup>
            <form.Field
              name="fullName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="shad-form-item">
                      <FieldLabel
                        className="shad-form-label"
                        htmlFor={field.name}>Full Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter your full name"
                        className="shad-input"
                        autoComplete="off"
                      />
                    </div>
                      <p className="px-[8px]  text-xs text-red-400">
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                          )}
                      </p>
                  </Field>
                )
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="shad-form-item">
                      <FieldLabel
                        className="shad-form-label"
                        htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter your email"
                        className="shad-input"
                        autoComplete="off"
                      />
                    </div>
                    <p className="px-[8px]  text-xs text-red-400">
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                        )}
                    </p>
                  </Field>
                )
              }}
            />
          </FieldGroup>
        )}
        <Button type="submit" className="form-submit-button" disabled={isLoading}>
          {type == 'sign-in' ? "Sign In" : "Sign Up"}
          {isLoading && (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="16" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="1.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="16" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="1.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="16" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="1.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
            </>
          )}
        </Button>

        {errorMessage && (
          <p className="error-message">*{errorMessage}</p>
        )}

        <div className="body-2 flex justify-center">
          <p className="text-gray-900">
            {type=='sign-in' ? "Don't have an account?" : "Already have an account?"}
          </p>
          <a className="ml-1 font-bold text-brand-primary" href={type == 'sign-in' ? "/signup" : '/signin'}>
            {type=='sign-in' ? "Sign-up" : "Sign-in"}
          </a>
        </div>
      </form>
      {accountId && (<OTPModal email={form.getFieldValue("email")} accountId={acco} /> )}
    </>
  )
}
