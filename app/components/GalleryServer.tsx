import { Button } from "@/components/ui/button";
import { simpleGalleryCard } from "../lib/interface";
import { client, urlFor } from "../lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type == 'gallery'] | order(_createdAt desc) [0...3] {
  title,
    shortDescription,
    date,
    titleImage,
    "currentSlug": slug.current
}`;

  const data = await client.fetch(query);
  return data;
}

export default async function GalleryServer() {
  const data: simpleGalleryCard[] = await getData();
     
  return (
    <section className="mx-auto max-w-7xl px-10 md:px-5 lg:px-0">
      <h1 className="font-bold text-2xl">Latest</h1><span className="font-bold text-2xl text-primary">Events & News</span>
      <div className="grid sm:grid-cols-2 mt-15 gap-5 lg:grid-cols-3 auto-rows-fr">
        {data.map((post, idx) => (
          <Card key={idx} className="gap-5 max-w-100 h-full flex flex-col">
            
            <div className="w-full h-48 overflow-hidden">
              <Image src={urlFor(post.titleImage).url()} alt="image" width="500" height="300" className="object-cover w-full h-full" />
            </div>
            <CardContent className="mt-5 flex-grow flex flex-col">
              <h2 className="font-medium text-24 text-primary line-clamp-1">{post.date}</h2>
              <h3 className="font-medium text-28 line-clamp-2">{post.title}</h3>
              
              <p className="line-clamp-6">{post.shortDescription}</p>
            </CardContent>
          </Card>
        ))}
      
      </div>
      <Link href="/gallery"><Button className="flex items-center mx-auto my-5"> Read More ...</Button></Link> 
    </section>
  );
}