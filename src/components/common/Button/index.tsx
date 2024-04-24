'use client'

type Props = {
  text: string,
  onClick?: (e:React.MouseEvent<HTMLElement, MouseEvent>) => void,
  color?: 'black' | 'red',
  size?: 'small' | 'normal'
}

export default function Button({text, onClick, color, size='normal'}: Props) {
  const baseStyle = 'w-full rounded-lg font-semibold tracking-wide'
  return (
    <button className={`${baseStyle} ${getColorStyle(color)} ${getPaddingStyle(size)}`} onClick={onClick}>{text}</button>
  )
}

const getPaddingStyle = (size?: string) => {
  let paddingStyle = 'p-3'

  switch(size) {
    case 'small':
      paddingStyle='p-3'
      break
  }

  return paddingStyle
}


const getColorStyle = (color?: string) =>{
  let colorStyle = 'bg-neutral-200'

  switch(color) {
    case 'black':
      colorStyle='bg-black text-white'
      break
    case 'red':
      colorStyle='bg-red-500 text-white'
      break
  }

  return colorStyle
}