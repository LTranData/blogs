// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Tran Lam's Blog",
  tagline: "Tran Lam's Blog",
  url: "https://lam1051999.github.io/",
  baseUrl: "/blogs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "/blogs/img/de.svg",
  organizationName: "lam1051999",
  projectName: "blogs",
  customFields: {
    projectId: "R_kgDOH7zL7A",
    discussionCategory: "Blog Posts",
    discussionCategoryId: "DIC_kwDOH7zL7M4CROdO",
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-M8Q0EVRYPR",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexBlog: true,
        indexDocs: false
      },
    ],
    [
      "./plugins/blog-plugin",
      {
        id: "blog",
        routeBasePath: "blog",
        path: "./blog",
        remarkPlugins: [math],
        rehypePlugins: [katex],
        blogSidebarTitle: 'All posts',
        blogSidebarCount: 'ALL',
        editUrl: ({ blogDirPath, blogPath }) => {
          return `https://github.com/kgajera/blog/edit/main/${blogDirPath}/${blogPath}`;
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
      },
      navbar: {
        hideOnScroll: true,
        title: "Tran Lam",
        logo: {
          alt: "TL Logo",
          src: "/blogs/img/de.svg",
        },
        items: [
          {to: '/', label: 'About', position: 'right'},
          {to: '/blog', label: 'Blog', position: 'right'},
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: 'More',
            items: [
              {
                label: 'About',
                to: '/',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'Mail',
                href: 'mailto:lam1051999@gmail.com',
              },
              {
                label: 'Linkedin',
                href: 'https://www.linkedin.com/in/lamtt1005/',
              },
              {
                label: 'Phone',
                href: 'tel:+84962007024',
              },
              {
                label: 'Github',
                href: 'https://github.com/lam1051999',
              }
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Tran Lam. All content is the property of Tran Lam.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      sidebar: {
        hideable: false,
      },
    }),
};

module.exports = config;
