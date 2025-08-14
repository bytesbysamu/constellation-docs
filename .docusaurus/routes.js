import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/constellation-docs/',
    component: ComponentCreator('/constellation-docs/', 'b6a'),
    routes: [
      {
        path: '/constellation-docs/',
        component: ComponentCreator('/constellation-docs/', '645'),
        routes: [
          {
            path: '/constellation-docs/',
            component: ComponentCreator('/constellation-docs/', '298'),
            routes: [
              {
                path: '/constellation-docs/auth',
                component: ComponentCreator('/constellation-docs/auth', 'b53'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/cicd',
                component: ComponentCreator('/constellation-docs/cicd', 'a94'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/colors-and-themes',
                component: ComponentCreator('/constellation-docs/colors-and-themes', '157'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/deployment',
                component: ComponentCreator('/constellation-docs/deployment', '35d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/development-setup',
                component: ComponentCreator('/constellation-docs/development-setup', '016'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/emails-and-email-providers',
                component: ComponentCreator('/constellation-docs/emails-and-email-providers', '680'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/frontend-architecture',
                component: ComponentCreator('/constellation-docs/frontend-architecture', 'e3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/frontend-development-guide',
                component: ComponentCreator('/constellation-docs/frontend-development-guide', 'e6d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/payments',
                component: ComponentCreator('/constellation-docs/payments', '74b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/project-structure-overview',
                component: ComponentCreator('/constellation-docs/project-structure-overview', 'b13'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/support',
                component: ComponentCreator('/constellation-docs/support', '4d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/task2',
                component: ComponentCreator('/constellation-docs/task2', '630'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/task3',
                component: ComponentCreator('/constellation-docs/task3', '642'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/tasks',
                component: ComponentCreator('/constellation-docs/tasks', '978'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/constellation-docs/',
                component: ComponentCreator('/constellation-docs/', '810'),
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
