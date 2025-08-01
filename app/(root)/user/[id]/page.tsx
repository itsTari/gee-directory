import { auth } from '@/auth'
import UserStartups, { StartupCardSkeleton } from '@/components/UserStartups'
import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'


export const experimental_ppr = true

const page = async ({params}: {params: Promise<{id:string}>}) => {
    const id = (await params).id
    const session = await auth()
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id})
    if(!user) return notFound()
  return (
    <>
        <section className='profile_container'>
            <div className="w-80 px-6 pb-6 pt-20 flex flex-col justify-center items-center bg-[#EE2B69] border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit max-lg:w-full">
                <div className="w-11/12 bg-white border-[5px] border-black rounded-[20px] px-5 py-3 absolute -top-9 after:absolute after:content-[''] after:-top-1 after:right-0 after:-skew-y-6 after:bg-black after:-z-[1] after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[''] before:-bottom-1 before:left-0  before:-skew-y-6 before:w-full before:h-[60px] before:bg-black  before:-z-[1] before:rounded-[20px] shadow-100">
                    <h3 className='text-24-black uppercase text-center line-clamp-1'>
                        {user.name}
                    </h3>
                </div>
                <img src={user.image} alt={user.name} width={220} height={220} className='rounded-full object-cover border-[3px] border-black'/>
                <p className='text-30-extrabold mt-7 text-center'>@{user.username}</p>
                <p className="mt-1 text-center font-normal text-sm text-[#F7F7F7]">{user.bio}</p>
            </div>
            <div className="flex-1 flex flex-col gap-5 lg:mt-5">
                <p className='text-30-bold'>
                    {session?.id == id ? 'Your' : 'All'} Startups
                </p>
                <ul className='grid sm:grid-cols-2 gap-5'>
                    <Suspense fallback={<StartupCardSkeleton />}>
                        {/* Dynamic component */}
                        <UserStartups id={id}/>
                    </Suspense>
                </ul>
            </div>
        </section>
    </>
  )
}

export default page