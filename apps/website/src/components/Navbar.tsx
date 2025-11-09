'use client';

import { Navbar as NextraNavbar } from 'nextra-theme-docs';
import type { ComponentProps, ReactElement } from 'react';

export function Navbar(props: ComponentProps<typeof NextraNavbar>): ReactElement {
  return (
    <>
      <style jsx global>{`
        /* Scope navbar tweaks to the site navbar only to avoid affecting
           other nextra components (like the sidebar) that reuse the
           .nextra-scrollbar class. */
        .wwebjs-navbar div.nextra-scrollbar {
          display: flex;
          align-items: center;
        }

        .wwebjs-navbar div.nextra-scrollbar a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          vertical-align: middle;
          transition:
            background-color 0.2s,
            transform 0.12s ease;
        }

        .wwebjs-navbar div.nextra-scrollbar a[href^='http'] {
          padding: 0.25rem 0.625rem;
          border-radius: 0.375rem;
          font-size: 0.775rem;
          background-color: rgb(243, 244, 246);
          transition: background-color 0.2s;
        }

        .wwebjs-navbar div.nextra-scrollbar a[href^='http']:hover {
          background-color: rgb(229, 231, 235);
        }

        :is(html[class~='dark']) .wwebjs-navbar div.nextra-scrollbar a[href^='http'] {
          background-color: rgb(31, 41, 55);
        }

        :is(html[class~='dark']) .wwebjs-navbar div.nextra-scrollbar a[href^='http']:hover {
          background-color: rgb(55, 65, 81);
        }

        /* Nudge non-external (internal) links slightly up so they visually align
           with external links even if font-size/padding differs. */
        .wwebjs-navbar div.nextra-scrollbar a:not([href^='http']) {
          transform: translateY(-0.1rem);
        }
      `}</style>
      <div className="wwebjs-navbar">
        <NextraNavbar {...props} />
      </div>
    </>
  );
}
