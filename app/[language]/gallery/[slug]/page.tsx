import Image from 'next/image';
import { DateFormatUtil } from '@/components/ui/DateFormatUtil';
import CustomButton from '@/components/ui/custom-button';
import { client, urlFor } from '@/app/lib/sanity';
import { LANG_OPTIONS } from '@/app/enum/global';

export const revalidate = 60;

type GalleryBlock = {
  _type?: string;
  children?: Array<{ text?: string }>;
};

type GalleryPost = {
  _id?: string;
  title?: string;
  shortDescription?: string;
  description?: string;
  date?: string;
  titleImage?: unknown;
  currentSlug?: string;
  body?: GalleryBlock[];
  content?: GalleryBlock[];
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function toParagraphs(value: GalleryBlock[] | string | undefined): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n\s*\r?\n|\r?\n/) // split on blank lines OR single newlines
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return value
    .filter((block) => block?._type === 'block' && Array.isArray(block.children))
    .map((block) =>
      block.children
        ?.map((child) => child.text ?? '')
        .join('')
        .trim() ?? ''
    )
    .filter(Boolean);
}

async function getPosts(): Promise<GalleryPost[]> {
  const query = `
    *[_type == 'gallery'] | order(date desc, _createdAt desc) {
      _id,
      title,
      shortDescription,
      description,
      date,
      titleImage,
      body,
      content,
      "currentSlug": slug.current
    }
  `;

  const data = await client.fetch(query, {}, { next: { revalidate: 60, tags: ['gallery'] } });
  return Array.isArray(data) ? data : [];
}

export async function generateStaticParams() {
  const query = `*[_type == 'gallery' && defined(slug.current)]{ "slug": slug.current }`;
  const slugs = await client.fetch<{ slug: string }[]>(query, {}, { next: { revalidate: 60, tags: ['gallery'] } });

  return LANG_OPTIONS.flatMap((lang) =>
    slugs.map((item) => ({
      language: lang.slug,
      slug: item.slug,
    }))
  );
}

export default async function GalleryPostPage({
  params,
}: {
  params: Promise<{ language: string; slug: string }>;
}) {
  const { language, slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  const posts = await getPosts();

  const post =
    posts.find((item) => item.currentSlug?.toLowerCase() === decodedSlug) ??
    posts.find((item) => (item.title ? slugify(item.title) === decodedSlug : false)) ??
    posts[0];

  if (!post) {
    return (
      <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <CustomButton href={`/${language}/gallery`} className="px-5 py-2.5 rounded-xl text-xs">
            Back to Gallery
          </CustomButton>
        </div>
        <p className="text-slate-700">No gallery post is available right now.</p>
      </article>
    );
  }

  
  const bodyParagraphs = toParagraphs(post.body);
  const contentParagraphs = toParagraphs(post.content);
  let safeParagraphs: string[] = [];
  if (bodyParagraphs.length > 0) {
    safeParagraphs = bodyParagraphs;
  } else if (contentParagraphs.length > 0) {
    safeParagraphs = contentParagraphs;
  } else if (post.description) {
    safeParagraphs = toParagraphs(post.description);
  } else if (post.shortDescription) {
    safeParagraphs = toParagraphs(post.shortDescription);
  }

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <CustomButton href={`/${language}/gallery`} className="px-5 py-2.5 rounded-xl text-xs">
          Back to Gallery
        </CustomButton>
      </div>

      <header className="mb-8">
        {post.currentSlug?.toLowerCase() !== decodedSlug ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
            Requested post was not found, showing the latest available post.
          </p>
        ) : null}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-orange-600">
          {post.date ? DateFormatUtil(new Date(post.date), 15) : ''}
        </p>
        <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
      </header>

      {post.titleImage ? (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src={urlFor(post.titleImage).url()}
            alt={post.title || 'Gallery image'}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <section className="space-y-5 text-base leading-8 text-slate-800 sm:text-lg">
  {safeParagraphs.length > 0 ? (
    safeParagraphs.map((paragraph, index) => (
      <p key={index} className="whitespace-pre-line">
        {paragraph}
      </p>
    ))
  ) : post.shortDescription ? (
    <p className="whitespace-pre-line">{post.shortDescription}</p>
  ) : (
    <p>More details for this gallery post will be published soon.</p>
  )}
</section>
    </article>
  );
}
