import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import clsx from 'clsx';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface GallerySwipperProps {
  title: string;
  images: string[];
  className?: string;
}

export default function GallerySwipper({ title, images, className }: GallerySwipperProps) {
  return (
    <section
      id="gallery"
      className={clsx('container', 'w-full', 'px-0', '!my-12', className)}
    >
      {/* Title */}
      <h2 className={clsx(
        'text-3xl',
        'font-bold',
        'text-black',
        'font-title',
        'tracking-wide',
        'leading-tight',
        'my-6',
        'text-center',
        'mb-8'
      )}>
        {title}
      </h2>

      {/* Swiper Gallery with default navigation */}
      <div className={clsx('relative')}>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className={clsx('gallery-swiper')}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={clsx(
                'relative',
                'aspect-[16/9]',
                'overflow-hidden',
                'rounded-lg'
              )}>
                <img
                  src={image.replace('/public', '')}
                  alt={`Gallery image ${index + 1}`}
                  className={clsx('w-full', 'h-full', 'object-cover', 'select-none')}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
} 