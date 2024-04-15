'use client'

type Props = {
  text: string,
  onClick?: () => void
  color?: 'black' | 'red'
}

export default function Button({text, onClick, color}: Props) {
  const baseStyle = 'w-full py-3 rounded-lg font-semibold tracking-wide'
  let colorStyle = 'bg-neutral-200'

  switch(color) {
    case 'black':
      colorStyle='bg-black text-white'
      break
    case 'red':
      colorStyle='bg-red-500 text-white'
      break
  }

  return (
    <button className={`${baseStyle} ${colorStyle}`} onClick={onClick}>{text}</button>
  )
}
