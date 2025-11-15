"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { PostCard } from "../../ui/PostCard";

interface InstaCarouselProps {
  posts: {
    id: string;
    media_url: string;
    caption?: string;
    permalink: string;
  }[];
}

export function InstaCarousel({ posts }: InstaCarouselProps) {
  return (
    <section className="w-full py-12 flex justify-center">
      <div className="w-full max-w-5xl px-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8 text-center w-full">Posts</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          className="w-full px-2 sm:px-6"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <PostCard
                image={post.media_url}
                caption={post.caption}
                url={post.permalink}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}