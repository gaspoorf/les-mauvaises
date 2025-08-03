// src/app/(pages)/[slug]/page.tsx
import React from 'react';
import {fetchPageContent} from '@/lib/strapi/page';
import NotFoundPage from '@/app/not-found';

import Homepage from '@/app/(pages)/[slug]/pages/Homepage';


const componentMapping: Record<
  string,
  React.ComponentType<{data: {Title: string}}>
> = {
  homepage: Homepage,

};

export default async function Page ({
  params,
}: {
  /** Next.js injecte ici une Promise<{slug:string}> */
  params: Promise<{slug: string}>;
}) {
  // on `await` la promise pour récupérer le slug
  const {slug} = await params;

  const pageData = await fetchPageContent(slug);

  if (!pageData) {
    return <NotFoundPage />;
  }

  const PageComponent = componentMapping[slug.toLowerCase()];

  if (!PageComponent) {
    return <NotFoundPage />;
  }

  return (
    <section>
      <PageComponent data={pageData} />
    </section>
  );
}
