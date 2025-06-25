import { formatDate } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_ID_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import MarkdownIt from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'

const md = new MarkdownIt()
export const experimental_ppr = true

const page = async({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id
    const post = await client.fetch(STARTUPS_BY_ID_QUERY, {id})
    if(!post) notFound();

    const parsecontent = md.render(post?.pitch || '')
  return (
    <>
       <section className='pink_container pattern !min-h-[250px]'>
            <p className='tag tag-tri'>{formatDate(post?._createdAt)}</p>
            <h1 className='heading'>{post?.title}</h1>
            <p className='sub-heading'>{post?.description}</p>
       </section>
       <section className='section_container'>
            <img  src={post?.image} alt='thumbnail' className='w-full h-auto rounded-xl'/>
            <div className='space-y-5 mt-10 max-w-6xl mx-auto'>
                <div className='flex-between gap-5'>
                    <Link href={`/user/${post?.author?._id}`} className='flex gap-2 items-center mb-3'>
                        <img src={post?.author?.image} alt='avatar' width={64} height={64} className='rounded-full drop-shadow-lg'/>
                        <div>
                            <p className='text-20-medium'>{post?.author?.name}</p>
                            <p className='text-16-medium !text-black-300'>{post?.author?.username}</p>
                        </div>
                    </Link>
                    <p className='font-medium text-[16px] bg-[#FFE8F0] px-4 py-2 rounded-full'>{post?.category}</p>
                </div>
                <h3 className='text-30-bold'>Pitch Details</h3>
                {parsecontent ? (
                    <article dangerouslySetInnerHTML={{__html: parsecontent}} className='prose lg:prose-xl max-4xl break-all'/>
                ): <p className='text-black-100 text-sm font-normal'>No Result</p>}
            </div>
            <hr className='divider'/>

            {/* todo: recommended section */}

            <Suspense fallback={<Skeleton className='bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3'/>}>
                <View id={id}/>
            </Suspense>
       </section>
    </>
  )
}

export default page
