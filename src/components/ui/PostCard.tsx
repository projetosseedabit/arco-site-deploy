import Image from "next/image";

interface PostCardProps {
    image: string;
    caption?: string;
    url?: string;
}

export function PostCard ({ image,  caption, url }: PostCardProps) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden shadow-md bg-white hover:scale-[1.02] transition-transform">
            <div className="relative w-full h-64">
                <Image src={image} alt={caption || "Post do Instagram"} fill className="object-cover" loading="lazy"/>
            </div>
            {caption && (
                <p className="p-3 text-sm text-gray-700 line-clamp-2">
                    {caption}
                </p>
            )}
        </a>
    )
}