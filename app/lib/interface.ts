import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface simpleGalleryCard {
    title: string;
    shortDescription: string;
    currentSlug: string;
    titleImage: SanityImageSource;
    date: string;
}