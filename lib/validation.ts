import {z} from 'zod'
export const formSchema = z.object({
    title:z.string().min(3).max(100),
    description:z.string().min(20).max(500),
    category:z.string().min(3).max(20),
    pitch:z.string().min(10),
    link: z.string().url("Please enter a valid URL"),
})
// link:z.string().url().refine(async(url)=>{
//     try {
//         const res = await fetch(url, {method:'HEAD'})
//         const contentType = res.headers.get('content-type')
//         return (contentType?.startsWith('image/'))
//     } catch {
//         return false
//     }
// })