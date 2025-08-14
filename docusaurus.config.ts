import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Constellation Docs',
  tagline: 'Constellation SaaS Platform Documentation',
  favicon: 'img/constellation-logo-48.png',

  // Set the production url of your site here
  url: 'https://constellation.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/constellation-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bytesbysamu', // Usually your GitHub org/user name.
  projectName: 'constellation-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Constellation',
      items: [
        {
          href: 'https://constellation.dev',
          label: 'Home',
          position: 'right',
        },
        {
          href: 'https://github.com/bytesbysamu/constellation-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Constellation.`,
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'Project Structure',
              to: '/project-structure-overview',
            },
            {
              label: 'Development Setup',
              to: '/development-setup',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/bytesbysamu/constellation-docs',
            },
            {
              label: 'Issues',
              href: 'https://github.com/bytesbysamu/constellation-docs/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/bytesbysamu/constellation-docs/discussions',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
