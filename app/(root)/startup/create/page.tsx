import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const session = await auth()
    if(!session) redirect('/')
  return (
    <>
        <section className='pink_container pattern !min-h-[230px]'>
            <h1 className ='heading'>Create your StartUp Pitch</h1>
        </section>
        <StartupForm/>
    </>
  )
}

export default page