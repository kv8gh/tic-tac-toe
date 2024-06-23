'use client'
import Image, { StaticImageData } from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from '@/app/component/ui/3d-card';
import { useRouter } from "next/navigation";

// Define the props interface
interface ThreeDCardDemoProps {
  src: StaticImageData;
  alt: string;
  data: string;
}

export default function ThreeDCardDemo({ src, alt, data }: ThreeDCardDemoProps) {

  const router = useRouter();
  return (
    <CardContainer>
      <CardBody className={`${
  data === 'X' ? 'bg-red-600' : 'bg-blue-600'
} relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto md:w-64 h-48 md:h-64 rounded-xl p-6 border`}
>
        <CardItem translateZ="100" className="w-full">
          <Image
            src={src}
            height="300"
            width="300"
            className="h-36 md:h-52 w-full object-fit rounded-xl group-hover/card:shadow-xl"
            alt={alt}
            onClick={()=>{
              router.push(`/game?data=${encodeURIComponent(data)}`);
            }}
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
