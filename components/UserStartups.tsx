import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { startupTypeCard } from './StartupCard'
import { cn } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'

const UserStartups = async ({id} : {id:string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id})
  return (
    <>
        {startups.length > 0 ? 
            startups.map((startup : startupTypeCard)=>
            <StartupCard key={startup._id} post={startup}/>) :
            <p className='text-black-100 text-sm font-normal'> No Post Found</p>
        }
    </>
  )
}
export const StartupCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4].map((index:number) => (
            <li key={cn('skeleton', index)}>
                <Skeleton className='w-full h-96 rounded-[22px] bg-zinc-400'/>
            </li>
        ))}
    </>
)
export default UserStartups