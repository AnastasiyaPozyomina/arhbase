// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Genealogy Docs',
  tagline: 'Dinosaurs are cool',
  favicon: './img/logodarkgreen.svg',

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
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme:{
          customCss: './src/css/custom.css',
        }
        
      }),
    ],
  ],


  plugins:[
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ["ru","en"],
        indexDocs:true,
        indexBlog:true,
        searchBarShortcutHint:false,
      }),
    ],
    ['docusaurus-plugin-yandex-metrica', {
      counterID: '97547150',
    }],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
({
      // Replace with your project's social card
      // Вставить картинку image 'img/.jpg' для отображения картинки при ссылке на сайт
      // npm 
      navbar: {
        title: 'Genealogy Docs',
        logo: {
          alt: 'Genealogy Docs Logo',
          src: './img/logodarkgreen.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Архивные документы',
          },
          {to: '/blog', label: 'Блог', position: 'left'},
          {
            href: 'https://t.me/+lJy5N01vb_U2MDdi',
            label: 'Telegram',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Архивные документы',
            items: [
              {
                label: 'Список селении бывшего Алтайского округа',
                to: '/docs/list',
              },
              {
                label: 'Ревизские сказки',
                to: '/docs/category/ревизские-сказки-',
              },
              {
                label: 'Поселенцы 1747 - 1748 гг',
                to: '/docs/category/поселенцы-1747---1748-гг',
              },
              {
                label: 'Именные списки',
                to: '/docs/category/именные-списки',
              },
              {
                label: 'Метрические книги',
                to: '/docs/category/метрические-книги',
              },
            ],
          },
          // {
          //   title: 'Сообщество',
          //   items: [
          //     {
          //       label: 'Telegram',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Блог',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/facebook/docusaurus',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Анастасия Позёмина`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};




export default config;
