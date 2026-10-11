import { BRAND_ASSETS, PWA_META } from '../config/siteAssets';

export const prerender = true;

export function GET() {
  return new Response(JSON.stringify({
    id: PWA_META.id,
    name: PWA_META.name,
    short_name: PWA_META.shortName,
    lang: PWA_META.lang,
    start_url: PWA_META.startUrl,
    scope: PWA_META.scope,
    display: PWA_META.display,
    background_color: PWA_META.backgroundColor,
    theme_color: PWA_META.themeColor,
    icons: [
      {
        src: BRAND_ASSETS.appIcon,
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
    },
  });
}
