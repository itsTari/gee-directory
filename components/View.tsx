import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUPS_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after} from 'next/server'

const View = async({id}:{id:string}) => {
    const {views: totalViews} = await client.withConfig({useCdn:false}).fetch(STARTUPS_VIEWS_QUERY, {id})

    after(async () => await writeClient.patch(id).set({views: totalViews + 1}).commit() )
  return (
    <div className='flex justify-end items-center mt-5 fixed bottom-3 right-5'>
        <div className='absolute -top-2 -right-2'>
            <Ping/>
        </div>
        <p className='font-medium text-[16px] bg-[#FFE8F0] px-4 py-2 rounded-lg capitalize'>
            <span className='text-black'>{totalViews >1 ? totalViews + ' Views' : totalViews + ' View'}</span>
        </p>
    </div>
  )
}

export default View