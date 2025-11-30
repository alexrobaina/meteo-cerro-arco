'use client'

import { useState, useEffect, useCallback } from 'react'
import { Mountain } from 'lucide-react'
import Image from 'next/image'

const IMAGE_WIDTH = 3240
const IMAGE_HEIGHT = 4050

// Import all images from assets
import img0 from '@/assets/images/Untitled.png'
import img1 from '@/assets/images/Untitled1.png'
import img2 from '@/assets/images/Untitled2.png'
import img3 from '@/assets/images/Untitled3.png'
import img4 from '@/assets/images/Untitled4.png'
import img5 from '@/assets/images/Untitled5.png'
import img6 from '@/assets/images/Untitled6.png'
import img7 from '@/assets/images/Untitled7.png'
import img8 from '@/assets/images/Untitled8.png'
import img9 from '@/assets/images/Untitled9.png'
import img10 from '@/assets/images/Untitled10.png'
import img11 from '@/assets/images/Untitled11.png'
import img12 from '@/assets/images/Untitled12.png'
import img13 from '@/assets/images/Untitled13.png'
import img14 from '@/assets/images/Untitled14.png'
import img15 from '@/assets/images/Untitled15.png'
import img16 from '@/assets/images/Untitled16.png'
import img17 from '@/assets/images/Untitled17.png'
import img18 from '@/assets/images/Untitled18.png'
import img19 from '@/assets/images/Untitled19.png'
import img20 from '@/assets/images/Untitled20.png'
import img21 from '@/assets/images/Untitled21.png'
import img22 from '@/assets/images/Untitled22.png'
import img23 from '@/assets/images/Untitled23.png'
import img24 from '@/assets/images/Untitled24.png'
import img25 from '@/assets/images/Untitled25.png'
import img26 from '@/assets/images/Untitled26.png'
import img27 from '@/assets/images/Untitled27.png'
import img28 from '@/assets/images/Untitled28.png'
import img29 from '@/assets/images/Untitled29.png'
import img30 from '@/assets/images/Untitled30.png'
import img31 from '@/assets/images/Untitled31.png'
import img32 from '@/assets/images/Untitled32.png'
import img33 from '@/assets/images/Untitled33.png'
import img34 from '@/assets/images/Untitled34.png'
import img35 from '@/assets/images/Untitled35.png'
import img36 from '@/assets/images/Untitled36.png'
import img37 from '@/assets/images/Untitled37.png'
import img38 from '@/assets/images/Untitled38.png'
import img39 from '@/assets/images/Untitled39.png'
import img40 from '@/assets/images/Untitled40.png'
import img41 from '@/assets/images/Untitled41.png'
import img42 from '@/assets/images/Untitled42.png'
import img43 from '@/assets/images/Untitled43.png'
import img44 from '@/assets/images/Untitled44.png'
import img45 from '@/assets/images/Untitled45.png'
import img46 from '@/assets/images/Untitled46.png'
import img47 from '@/assets/images/Untitled47.png'
import img48 from '@/assets/images/Untitled48.png'
import img49 from '@/assets/images/Untitled49.png'
import img50 from '@/assets/images/Untitled50.png'
import img51 from '@/assets/images/Untitled51.png'

const images = [
  img0, img1, img2, img3, img4, img5, img6, img7, img8, img9,
  img10, img11, img12, img13, img14, img15, img16, img17, img18, img19,
  img20, img21, img22, img23, img24, img25, img26, img27, img28, img29,
  img30, img31, img32, img33, img34, img35, img36, img37, img38, img39,
  img40, img41, img42, img43, img44, img45, img46, img47, img48, img49,
  img50, img51,
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [goToNext])

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl sm:col-span-2 lg:col-span-2 lg:row-span-2">
      <div className="relative h-full min-h-[300px] sm:min-h-[400px]">
        <Image
          src={images[currentIndex]}
          alt={`Vista del despegue Cerro ARCO - Imagen ${currentIndex + 1}`}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          className="w-full h-full object-cover"
          priority={currentIndex === 0}
        />

        {/* Overlay Text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center gap-2 mb-2">
            <Mountain className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">
              Vista del Despegue
            </span>
          </div>
          <p className="text-white/90 text-sm">
            Condiciones actuales en la zona de despegue
          </p>
        </div>
      </div>
    </div>
  )
}
