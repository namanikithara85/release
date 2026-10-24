import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const BASE_URL = 'https://releasetours.com';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Lightweight per-route SEO updater. Sets title, meta description,
 * canonical, and Open Graph / Twitter card tags.
 */
export function useSeo({ title, description, path = '/', image }: SeoOptions) {
  useEffect(() => {
    const url = `${BASE_URL}${path}`;
    const ogImage = image || 'https://images.pexels.com/photos/1122875/pexels-photo-1122875.jpeg?auto=compress&cs=tinysrgb&w=1200';

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
  }, [title, description, path, image]);
}
