'use server'

import { auth } from "@/auth"
import { parseServerActionRes } from "./utils"
import slugify from 'slugify'
import { writeClient } from "@/sanity/lib/write-client"

export const createPitch = async (state:any, form:FormData, pitch:string) =>{
    // getting info of the user that created the startup, if its an existing user
    const session = await auth()
    if(!session) return parseServerActionRes({error: 'not signed in', status:'Error'})
    
    const {title, description, category, link}  = Object.fromEntries(
        Array.from(form).filter(([key])=> key !== 'pitch')
    )
    const slug = slugify(title as string,  {lower:true, strict:true})
    try {
        const startup = {
            title,
            description,
            category,
            image:link,
            slug:{
                _type:slug,
                current:slug,
            },
            author:{
                _type:'reference',
                _ref:session?.id,
            },
            pitch
        }
        const result = await writeClient.create({_type:'startup', ...startup})
        return parseServerActionRes({...result, error:'', status:'SUCCESS'})
    } catch (error) {
        console.log(error)
        return parseServerActionRes({error:JSON.stringify(error), status:'ERROR'})
    }
}

// function slugify(arg0: string, arg1: { lower: boolean; strict: boolean }) {
//     throw new Error("Function not implemented.")
// }
