"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import SignInModal from "@/components/SignInModal"
import SignUpModal from "@/components/SignUpModal"

type AuthModalType = "signin" | "signup" | null

export default function AuthModalContainer() {
  const [modalType, setModalType] = useState<AuthModalType>(null)

  const closeModal = () => setModalType(null)

  return (
    <>
      <div className="flex gap-2">
        <button onClick={() => setModalType("signin")} className="px-4 py-2 rounded bg-primary text-primary-foreground">
          Sign In
        </button>
        <button
          onClick={() => setModalType("signup")}
          className="px-4 py-2 rounded border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          Sign Up
        </button>
      </div>

      <Dialog open={modalType !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-md p-0">
          {modalType === "signin" && <SignInModal onClose={closeModal} />}
          {modalType === "signup" && <SignUpModal onClose={closeModal} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
