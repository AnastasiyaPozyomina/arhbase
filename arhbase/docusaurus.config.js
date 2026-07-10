// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {
  themes as prismThemes
} from 'prism-react-renderer'; // Импортируем темы Prism.js

const currentYear = new Date().getFullYear();
const startYear = 2024;
const copyrightYears = startYear === currentYear ?
  `${startYear}` :
  `${startYear}\u2013${currentYear}`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Genealogy Docs',
  tagline: 'Genealogy',
  favicon: '/img/logodarkgreen.svg',


  // Set the production url of your site here
  url: 'https://genealogy-docs.ru/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  //organizationName: 'AnastasiyaPozyomina.github.io', // Usually your GitHub org/user name.
  //projectName: 'arhbase', // Usually your repo name.

  onBrokenLinks: 'throw',


  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },


  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
    localeConfigs: {
      ru: {
        label: 'Русский',
        direction: 'ltr',
        htmlLang: 'ru-RU',
      },
    },
  },



  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: './sidebars.js',
          
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',

        },

        blog: {
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],


  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexDocs: true,
        indexBlog: true,
        hashed: true,
        language: 'ru',
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcut: true,
      },
    ],
    [
      'docusaurus-plugin-yandex-metrica',
      {
        counterID: '97547150',
      },
    ],
  ],

  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    navbar: {
      title: 'Genealogy Docs',
      logo: {
        alt: 'Genealogy Docs Logo',
        src: '/img/logodarkgreen.svg',
        target: '_self',
        width: 38,
        height: 38,
        className: 'title-site'
      },
      items: [{
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Архивные документы',
        },
        {
          to: '/blog',
          label: 'Блог',
          position: 'left'
        },
        //{ to: '/folklore', label: 'Фольклор', position: 'left' },
        //{
        //  href: 'https://t.me/+lJy5N01vb_U2MDdi',
        //  label: 'Telegram',
         // position: 'right',
        //},
        //{
       // to: '/maps',
        //label: 'Карты',
        //position: 'left',
        //},
      ],
    },
    footer: {
      style: 'dark',
      links: [{
          title: 'Архивные документы',
          items: [{
              label: 'Ревизские сказки',
              to: '/docs/category/ревизские-сказки',
            },
            {
              label: 'Переселение',
              to: '/docs/category/переселение',
            },
            {
              label: 'Русская Православная Церковь',
              to: '/docs/category/русская-православная-церковь',
            },
            {
              label: 'Старообрядцы',
              to: '/docs/category/старообрядцы',
            }
          ],
        },
        {
          title: 'Партнеры',
          items: [{
              label: 'Реконструкция Бухтармы и Уймона',
              href: 'https://ok.ru/bukhtarma.reconstruction',
            },
            {
              label: 'Татьяна Федюкина',
              href: 'https://t.me/Tatyana_Fedyukina',
            },
            {
              label: 'Altai Heritage',
              href: 'https://altaiheritage.ru/',
            },
          ],
        },
        {
          title: 'Связаться с нами',
          items: [{
              label: 'genealogy-docs@mail.ru',
              href: 'mailto:genealogy-docs@mail.ru',
            },
            //{
            //  label: 'Присоединиться к индексации',
            // href: 'https://t.me/+lJy5N01vb_U2MDdi',
           //},
          ],
        },
      ],
      copyright: `Copyright © 2024 - 2026 Анастасия Позёмина`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;

