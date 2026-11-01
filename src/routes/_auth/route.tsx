import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthenticationLayout,
})

function AuthenticationLayout() {
  return (
    <>
      <div className="flex min-h-screen">
        <section className="
          hidden
          w-1/2
          items-center
          justify-center
          bg-brand-primary
          p-10
          lg:flex
          xl:w-2/5
          ">
          <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
            <img
              src="logo.png"
              alt="logo"
              width={16}
              height={16}
              className="h-auto"
            />
            <div className="space-y-5 text-white">
              <h1 className="h1">Manage your files the best way</h1>
              <p className="body-1">
                This is a place where you can store all your documents.
              </p>
            </div>
            <img
              src="file-img"
              alt="Files images"
              width={342}
              height={342}
              className="transition-all hover:rotate-2 hover:scale-105"
            />
          </div>
        </section>
        <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
          <div className="mb-16 lg:hidden">
            <img
              src="logo-full-brand"
              alt="Logo full brand"
              width={224}
              height={82}
              className="h-auto w-[200px] lg:w-[250px]"
            />
          </div>
        </section>
        <Outlet />
      </div>
    </>
  )
}
