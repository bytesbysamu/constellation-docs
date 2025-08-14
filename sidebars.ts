import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual sidebar configuration to ensure all content is navigable
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'getting-started',
      label: '🚀 Quick Start',
    },
    {
      type: 'doc',
      id: 'project-structure-overview',
      label: '🗂️ Project Structure Overview',
    },
    {
      type: 'doc',
      id: 'development-setup',
      label: '⚙️ Development Setup',
    },
    {
      type: 'doc',
      id: 'frontend-architecture',
      label: '🏗️ Frontend Architecture',
    },
    {
      type: 'doc',
      id: 'frontend-development-guide',
      label: '💻 Frontend Development Guide',
    },
    {
      type: 'doc',
      id: 'auth',
      label: '🔒 Authentication',
    },
    {
      type: 'doc',
      id: 'payments',
      label: '💳 Subscriptions & Payments',
    },
    {
      type: 'doc',
      id: 'emails-and-email-providers',
      label: '✉️ Emails & Email Providers',
    },
    {
      type: 'doc',
      id: 'colors-and-themes',
      label: '🎨 Colors & Themes',
    },
    {
      type: 'doc',
      id: 'deployment',
      label: '🌐 Deployment',
    },
    {
      type: 'doc',
      id: 'cicd',
      label: '🔄 CI/CD',
    },
    {
      type: 'doc',
      id: 'support',
      label: '🛠️ Support',
    },
    {
      type: 'category',
      label: '📋 Tasks & Integration',
      items: [
        'tasks',
        'task2',
        'task3',
      ],
    },
  ],
};

export default sidebars;
