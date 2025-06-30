import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity.types'

export type startupTypeCard = Omit<Startup, "author"> & {author?: Author}

const StartupCard = ({post}:{post: startupTypeCard}) => {
  const {_createdAt, views, author, category, title, description, image, _id } = post
  return (
    <li className=' group bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-[#EE2B69] transition-all duration-500 hover:shadow-300 hover:bg-[#FFE8F0]'>
        <div className='flex-between'>
          <p className='font-medium text-[16px] bg-[#FFE8F0] px-4 py-2 rounded-full group-hover:bg-white-100'>
            {formatDate(_createdAt)}
          </p>
          <div className='flex gap-1.5'>
            <EyeIcon className='size-6 text-[#ee2b69]'/>
            <span className='font-medium text-[16px] text-black;'>{views}</span>
          </div>
        </div>

        <div className='flex-between gap-5 mt-5'>
          <div className='flex-1'>
              <Link href={`/user/${author?._id}`}>
                  <p className='text-16-medium line-clamp-1'>{author?.name}</p>
              </Link>
              <Link href={`/startup/${_id}`}>
                <h3 className='font-semibold text-[26px] text-black line-clamp-1'>{title}</h3>
              </Link>
          </div>
          <Link href={`/user/${author?._id}`}>
            <img src={author?.image} alt={author?.name} width={48} height={48} className='rounded-full'/>
          </Link>
        </div>
        <Link href={`/startup/${_id}`}>
            <p className='font-normal text-xl line-clamp-2 my-3 text-black-100 break-all'>{description}</p>
            <img src={image} alt='thumbnail' className='startup-card_img'/>
        </Link>
        <div className='flex-between gap-3 mt-5'>
          <Link href={`/?query=${category?.toLowerCase()}`}>
              <p className="text-16-medium">{category}</p>
          </Link>
          <Button className='startup-card_btn' asChild>
            <Link href={`/startup/${_id}`}>Details</Link>
          </Button>
        </div>
    </li>
  )
}

export default StartupCard