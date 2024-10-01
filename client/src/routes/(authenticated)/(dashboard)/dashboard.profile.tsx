import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/profile')({
  component: Profile,
})

function Profile() {
  return (
    <>
      <div 
        className='grid grid-cols-1 sm:grid-cols-2 w-full gap-4'>
          <div className='flex gap-2 items-center'>
            <label htmlFor="username"
              className='min-w-[80px] sm:min-w-max'>
              Username
            </label>
            <input 
              type="text"
              id='username'
              placeholder='username'
              className='input' />
          </div>
          <div className='flex gap-2 items-center'>
            <label htmlFor="email"
              className='min-w-[80px] sm:w-max'>
              Email
            </label>
            <input 
              type="text"
              id='email'
              placeholder='emaail'
              className='input' />
          </div>
      </div>
    </>
  )
}