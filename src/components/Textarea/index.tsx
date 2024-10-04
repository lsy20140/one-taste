import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

export default forwardRef<HTMLTextAreaElement, InputProps>(function Textarea(
  { ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      {...props}
      className={
        'resize-none w-full flex items-center justify-center py-4 px-4 rounded-2xl border border-neutral-300 outline-none'
      }
      onChange={props.onChange}
      style={{ height: props.height }}
    />
  )
})
