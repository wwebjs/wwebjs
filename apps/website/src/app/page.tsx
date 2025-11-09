'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function IndexPage() {
  return (
    <>
      {/* Extracted gradient animation CSS into page.module.css */}
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1rem',
        }}
      >
        <div
          className={styles.landing}
          style={{
            textAlign: 'center',
            maxWidth: 980,
            margin: '0 auto',
            transform: 'translateY(-6vh)',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontWeight: 800,
              lineHeight: 1.02,
              fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
            }}
          >
            Build WhatsApp Automations <br />
            with <span className={styles.gradient}>WWebJS</span>
          </h1>

          <p
            style={{
              marginTop: '1rem',
              marginBottom: '1.5rem',
              color: 'var(--nextra-foreground-muted, #6b7280)',
              fontSize: '1.05rem',
            }}
          >
            A WhatsApp API client that operates via the WhatsApp Web browser.
          </p>

          <Link
            href="/discover"
            className={styles.ctaButton}
            aria-label="Discover WWebJS"
          >
            <span style={{ letterSpacing: '-0.01em' }}>Discover</span>
            <span className={styles.ctaArrow}>→</span>
          </Link>
        </div>
      </main>
    </>
  );
}
