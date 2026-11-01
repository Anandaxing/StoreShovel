import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <>
      <div>
        <h1 className="text-3xl text-red-500">Hello user, this is an about page</h1>
      </div>
    </>
  )
}