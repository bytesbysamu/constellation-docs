import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '3b5'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'de4'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '852'),
            routes: [
              {
                path: '/auth',
                component: ComponentCreator('/auth', 'd3f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cicd',
                component: ComponentCreator('/cicd', '405'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/colors-and-themes',
                component: ComponentCreator('/colors-and-themes', '6fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/deployment',
                component: ComponentCreator('/deployment', 'a8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-setup',
                component: ComponentCreator('/development-setup', '8bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/emails-and-email-providers',
                component: ComponentCreator('/emails-and-email-providers', '40c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/frontend-architecture',
                component: ComponentCreator('/frontend-architecture', 'd16'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/frontend-development-guide',
                component: ComponentCreator('/frontend-development-guide', 'bb9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/payments',
                component: ComponentCreator('/payments', 'dab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/project-structure-overview',
                component: ComponentCreator('/project-structure-overview', '2e0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/support',
                component: ComponentCreator('/support', 'd68'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/task2',
                component: ComponentCreator('/task2', 'd44'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/task3',
                component: ComponentCreator('/task3', '6ae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tasks',
                component: ComponentCreator('/tasks', 'be8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', '654'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
