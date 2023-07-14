// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require("dotenv").config();
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: process.env.SITE_TITLE,
  tagline: process.env.TAG_LINE,
  url: process.env.BLOG_URL,
  baseUrl: `/`,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: `/img/lt_logo.svg`,
  organizationName: process.env.ORGANIZATION_NAME,
  projectName: `${process.env.PROJECT_NAME}`,

  scripts: [
    {
      src: process.env.GOOGLE_ADS_SCRIPT,
      async: true,
      crossorigin: "anonymous"
    },
  ],

  customFields: {
    projectId: process.env.PROJECTID,
    discussionCategory: process.env.DISCUSSION_CATEGORY,
    discussionCategoryId: process.env.DISCUSSION_CATEGORY_ID,
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
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
          trackingID: process.env.GOOGLE_ANALYTICS_TAG_ID,
          anonymizeIP: true,
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  plugins: [
    [
      "./plugins/blog-plugin",
      {
        id: "blog",
        routeBasePath: "blog",
        path: "./blog",
        remarkPlugins: [math],
        rehypePlugins: [katex],
        blogSidebarTitle: "All posts",
        blogSidebarCount: "ALL",
        editUrl: ({ blogDirPath, blogPath }) => {
          return `${process.env.GITHUB_EDIT}/${blogDirPath}/${blogPath}`;
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'keywords', content: 'Data Engineering, Web Development, Blog'},
        {name: 'description', content: 'This is a data engineering, web development blog by Lam Tran'},
        {name: 'title', content: 'Lam Tran'},
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      colorMode: {
        defaultMode: "dark",
      },
      navbar: {
        hideOnScroll: true,
        title: process.env.HEADER_TITLE,
        logo: {
          alt: "TL Logo",
          src: "/img/lt_logo.svg",
        },
        items: [
          { to: "/", label: "About", position: "right" },
          { to: "/blog", label: "Blog", position: "right" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "More",
            items: [
              {
                label: "About",
                to: "/",
              },
              {
                label: "Blog",
                to: "/blog",
              },
            ],
          },
          {
            title: "Contact",
            items: [
              {
                label: "Mail",
                href: `mailto:${process.env.INFO_GMAIL}`,
              },
              {
                label: "Linkedin",
                href: `${process.env.INFO_LINKEDIN}`,
              },
              {
                label: "Phone",
                href: `tel:+${process.env.INFO_TEL}`,
              },
              {
                label: "Github",
                href: `${process.env.INFO_GITHUB}`,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Lam Tran. Powered by <a target="_blank" rel="noreferrer noopener" style="color:white;font-weight:bold;" href="https://docusaurus.io/">Docusaurus 2</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["java", "scala"],
      },
      sidebar: {
        hideable: false,
      },
      algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        placeholder: "Search...",
      },
    }),
};

module.exports = config;
