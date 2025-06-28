'use client'
import { useState, useActionState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import {z} from 'zod'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'



const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string,string>>({})
    const [pitch, setPitch] = useState("");
    const router = useRouter()
    

    const handleFormSubmit = async (prevState: any, formData:FormData )=> {
          try {
               const formValues = {
                    title: formData.get("title") as string,
                    description:formData.get("description") as string,
                    category: formData.get("category") as string,
                    link: formData.get("link") as string ,
                    pitch,
               }
               // now that we have the form values, we want to validate them
               await formSchema.parseAsync(formValues)
               // console.log(formValues)
               //  setErrors({})
               const result = await createPitch(prevState, formData, pitch)
               if(result.status == 'SUCCESS'){
                    toast("your startup pitch has been created successfully")
                    router.push(`/startup/${result._id}`)
                    // console.log('result.id:', result.id) 
               }
               return result
          } catch (error) {
               if(error instanceof z.ZodError){
                    const fieldErrors: Record<string, string> = {}
                    error.errors.forEach((err) => {
                         if (err.path) {
                              fieldErrors[err.path[0]] = err.message
                         }
                    })
                    setErrors(fieldErrors)
                    toast("please check your inputs and try again")
                    return {...prevState, error: 'Validation failed', status: 'ERROR' }
               }
                toast("An unexpected error has occured, please try again")
                return {...prevState, error: 'Something went wrong', status: 'ERROR' }
          }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error:'', status:'INITIAL' })
    

  return (
    <form action={formAction} className='max-w-2xl mx-auto bg-white my-10 space-y-8 px-6' >
       <div>
            <label htmlFor='title' className='startup-form_label'>Title</label>
            <Input id='title' name='title' className='startup-form_input placeholder:text-black-300 !important' required placeholder='Startup Title'/>
            {errors.title && <p className='startup-form_error'>{errors.title}</p>}
       </div>
       <div>
            <label htmlFor='description' className='startup-form_label'>Description</label>
            <Textarea id='description' name='description' className='startup-form_textarea placeholder:text-black-300 !important' required placeholder='Startup description'/>
            {errors.description && <p className='startup-form_error'>{errors.description}</p>}
       </div>
       <div>
            <label htmlFor='category' className='startup-form_label'>Category</label>
            <Input id='category' name='category' className='startup-form_input placeholder:text-black-300 !important' required placeholder='Startup category (e.g Tech, Health, Education.......)'/>
            {errors.category && <p className='startup-form_error'>{errors.category}</p>}
       </div>
       <div>
            <label htmlFor='link' className='startup-form_label'>Image Url</label>
            <Input id='link' name='link' className='startup-form_input placeholder:text-black-300 !important' required placeholder='Startup image url'/>
            {errors.link && <p className='startup-form_error'>{errors.link}</p>}
       </div>
       <div data-color-mode='light'>
            <label htmlFor='pitch' className='startup-form_label'>Pitch</label>
            <MDEditor value={pitch}
             id='pitch'
             onChange={(value)=>setPitch(value as string)}
             preview='edit'
             height={300}
             style={{borderRadius: 20, overflow:'hidden'}}
             textareaProps={{
               placeholder:'Briefly describe your ideas and what problems it solves', 
             }}
             previewOptions={{
               disallowedElements:['style']
             }}
             /> 
            {/* <MDEditor.Markdown source={pitch} style={{ whiteSpace: 'pre-wrap' }} /> */}
            {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
       </div>
       <Button type='submit' className='startup-form_btn' disabled={isPending}>
          {isPending ? 'Submiting...' : 'Submit Your Pitch'}
          <Send className='size-6 ml-2'/>
       </Button>
    </form>
  )
}

export default StartupForm