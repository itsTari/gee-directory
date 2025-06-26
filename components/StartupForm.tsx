'use client'
import { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string,string>>({})
    const [pitch, setPitch] = useState("**Hello world!!!**");

  return (
    <form action={()=> {}} className='max-w-2xl mx-auto bg-white my-10 space-y-8 px-6' >
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
       <div data-color-mode='lght'>
            <label htmlFor='pitch' className='startup-form_label'>Pitch</label>
            <MDEditor
        value={pitch}
        onChange={setPitch}
      />
      <MDEditor.Markdown source={pitch} style={{ whiteSpace: 'pre-wrap' }} />
            {errors.link && <p className='startup-form_error'>{errors.link}</p>}
       </div>
    </form>
  )
}

export default StartupForm