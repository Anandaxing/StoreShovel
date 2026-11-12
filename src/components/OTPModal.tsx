import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"
import React from "react"
import Loader from "./ui/loader"
import { verifySecret } from "#/lib/actions/user.action"
import { useRouter } from "@tanstack/react-router"

const OTPModal = ({ email, accountId }: { email: string, accountId: string }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call API to verify the OTP
      const sessionId = await verifySecret({
        data: { accountId, password }
      })

      if (sessionId) router.navigate({ to: "/" })
      
    } catch (error) {
      console.error(error)
      console.log("Failed to verify OTP")
    } 

    return
  }
  
  const handleResendOTP = async () => {
    
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <form onSubmit={handleSubmit}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader className="flex justify-center relative">
              <DialogTitle className="h2 text-center">Enter your OTP</DialogTitle>
              <DialogDescription className="subtitle-2 text-center text-gray-500">
                We have send the OTP code to <span className="pl-1 text-brand-primary">{email}</span>
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="flex w-full justify-center items-center">
              <InputOTP maxLength={6} value={ password } >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="text-lg" />
                  <InputOTPSlot index={1} className="text-lg" />
                  <InputOTPSlot index={2} className="text-lg" />
                  <InputOTPSlot index={3} className="text-lg" />
                  <InputOTPSlot index={4} className="text-lg" />
                  <InputOTPSlot index={5} className="text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </FieldGroup>
            <DialogFooter className="flex flex-wrap items-center">
              <Button type="submit" className="w-full">
                Submit
                {isLoading && (
                  <Loader />
                )}
              </Button>
              <div>
                Didn't receive the code?
                <button type="button" className="pl-1 text-brand-primary" onClick={handleResendOTP}>
                  Click to resend
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default OTPModal