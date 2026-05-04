import { simpleGalleryCard } from "../lib/interface";
import { client } from "../lib/sanity";
import GalleryClient from "./GalleryClient";

async function getData() {
  const query = `
  *[_type == 'gallery' && defined(date)] | order(date desc, _createdAt desc) [0...3] {
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
  return <GalleryClient data={data} />;
}