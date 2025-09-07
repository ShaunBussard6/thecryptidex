'use client';
import Script from 'next/script';

export default function GA({ id }: { id?: string }) {
  if (!id) return null; // No env var? Do nothing. Can't break builds or layouts.
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <Script id="ga-init">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
