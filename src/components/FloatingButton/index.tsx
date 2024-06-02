'use client'
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion"
import Link from "next/link";

export default function FloatingButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <Link href={''}>
        <motion.button 
          className="w-fit h-16 px-5 fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-red-500 rounded-full z-[40] flex gap-2 justify-center items-center shadow-xl"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          animate = {{
            width: isHovered ? 150 : 64,
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
          }}
          transition={{   
            type: "spring", 
            stiffness: 200, 
            damping: 15 
          }}
        >
          {isHovered && <span className="text-white font-medium shrink-0">맛집 제보</span>}
          <Image src={'/images/floating_btn_icon.png'} alt="icon" width={28} height={28}/>
        </motion.button>
      </Link>

    </>
  )
}
