import { simpleGalleryCard } from "../lib/interface";
import { client, urlFor } from "../lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

async function getData () {
  const query = `
  *[_type == 'gallery'] | order(_createdAt desc) {
  title,
    shortDescription,
    date,
    "currentSlug": slug.current,
    titleImage,
    date,
}`;

const data = await client.fetch(query)
return data;

}

export default async function Gallery() {
  const data: simpleGalleryCard[] = await getData();
     
    return (
    <section className="mx-10">
      <h1 className="font-bold text-2xl lg:max-w-7xl lg:ml-80">Latest</h1><span className="font-bold text-2xl text-primary lg:max-w-7xl lg:ml-80">Events & News</span>
      <div className="grid sm:grid-cols-2 mt-15 gap-5 lg:grid-cols-3 lg:max-w-7xl lg:ml-80 auto-rows-fr">
      {data.map((post, idx) => (
        <Card key={idx} className="gap-5 h-full flex flex-col">
          
          <div className="w-full h-48 overflow-hidden">
            <Image src={urlFor(post.titleImage).url()} alt="image" width="500" height="300" className="object-cover w-full h-full" />
          </div>
          <CardContent className="mt-5 flex-grow flex flex-col">
            <h2 className="font-medium text-24 text-primary">{post.date}</h2>
            <h3 className="font-medium text-28">{post.title}</h3> 
            
            <p className="pt-5">{post.shortDescription}</p>
          </CardContent>
        </Card>
      ))}

    </div>
    </section>
    
  );
}