# Pluralsight Sample: Globomantics Blog Starter

This is a sample companion for the course [Creating Plugins, Themes, and Starters with GatsbyJS: Playbook](https://github.com/kamranayub/pluralsight-gatsby-starters-themes-plugins) on Pluralsight.

## Using the starter

```sh
gatsby new sample kamranayub/pluralsight-gatsby-demo-starter

cd sample

yarn # or npm, see note
```

> **Having trouble with npm?** I was having a few issues with "missing module" messages when using `npm`. If you run into any issues, `yarn` seems more stable. This may be a Gatsby V3 issue, see [Migration Guide for v2 to v3](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#handling-dependencies-for-plugins-that-are-not-yet-updated)

## Sample Contentful Tokens

The tokens in the `.env*` files are read-only tokens from my Contentful sample space. They are safe to share and use since they are not "Admin Tokens."

If you don't want to use your own Contentful account, you may use my demo tokens:

**.env.development**

```
CONTENTFUL_SPACE_ID=4l5gmdllk6yh
CONTENTFUL_ACCESS_TOKEN=dRZN5J3GwEGy4JY1i-xmxeCDjuuVpvGx46fnYX4Q4rE
```