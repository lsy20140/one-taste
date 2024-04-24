import { FormEvent, useState } from "react";
import Input from "../common/Input";

export default function SearchPlace() {
  const [input, setInput] = useState('')

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="h-10">
        <Input onChange={handleChange}/>
      </form>
      {input && 
        <div className="h-fit p-3 bg-white z-20 ">
          자동 완성 wrapper
        </div>
      }
    </div>
  )
}
