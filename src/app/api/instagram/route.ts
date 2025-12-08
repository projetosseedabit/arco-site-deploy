import { NextResponse } from 'next/server'

const USER_ID = process.env.INSTAGRAM_USER_ID!;
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!;

interface InstagramPost {
  id: string;
  media_url: string;
  caption?: string;
  permalink: string;
  media_link?: string;
  thumbnail_url?: string;
}

async function getInstagramPosts(): Promise<InstagramPost[]> {
    try {
        if (!USER_ID || !ACCESS_TOKEN) {
            throw new Error("Missing Instagram environment variables");
        }

        const fields = "id,caption,media_url,permalink,media_type,thumbnail_url";
        const url = `https://graph.facebook.com/v21.0/${USER_ID}/media?fields=${fields}&access_token=${ACCESS_TOKEN}`;

        const res = await fetch(url, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Instagram API error:", errorData);
            throw new Error(`Instagram API error: ${res.status}`);
        }

        const data = await res.json();

        if (!data.error) {
            console.error("Instagram API error:", data.error);
            return [];
        }

        return data.data || [];
    } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        return [];
    }
}

export async function GET() {
    try {
        const posts = await getInstagramPosts();
        return NextResponse.json(posts);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro ao buscar posts" },
            { status: 500 }
        );
    }
}