import { SITE_URL, GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION } from 'astro:env/server';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  socialLinks: string[];
  twitter?: {
    site: string;
    creator: string;
  };
  verification?: {
    google?: string;
    bing?: string;
  };
  /**
   * Branding configuration
   * Logo files: Replace SVGs in src/assets/branding/
   * Favicon: Replace in public/favicon.svg
   */
  branding: {
    /** Logo alt text for accessibility */
    logo: {
      alt: string;
    };
    /** Favicon path (lives in public/) */
    favicon: {
      svg: string;
    };
    /** Theme colors for manifest and browser UI */
    colors: {
      /** Browser toolbar color (hex) */
      themeColor: string;
      /** PWA splash screen background (hex) */
      backgroundColor: string;
    };
  };
}

const siteConfig: SiteConfig = {
  name: 'NanoFleet',
  description: 'A self-hosted fleet manager for AI agents. Deploy agents in isolated Docker containers, interact with them via a web dashboard, and extend them with plugins.',
  url: SITE_URL || 'https://nanofleet.github.io',
  ogImage: '/og-default.png',
  author: 'NanoFleet',
  email: 'hello@nanofleet.dev',
  socialLinks: [
    'https://github.com/NanoFleet',
  ],
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    bing: BING_SITE_VERIFICATION,
  },
  branding: {
    logo: {
      alt: 'NanoFleet',
    },
    favicon: {
      svg: '/favicon.png',
    },
    colors: {
      themeColor: '#111111',
      backgroundColor: '#F9F9F6',
    },
  },
};

export default siteConfig;
