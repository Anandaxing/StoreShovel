import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="center h-screen bg-amber-100">
      <h1 className="h1">StoreShovel</h1>
    </div>
  )
}