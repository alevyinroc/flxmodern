# flxmodern — Hugo theme

Clean, modern Hugo theme with light/dark modes, simple typography, hierarchical navigation, and built-in Disqus support.

Quick usage
- Place this theme in your Hugo site's `themes/` directory or use it as a submodule.
- In your site `config.toml` set:

```toml
theme = "flxmodern"

# optional Disqus
# flxmodern — Hugo theme

Clean, modern Hugo theme with light/dark modes, simple typography, hierarchical navigation, and built-in Disqus support.

Quick usage

- Place this theme in your Hugo site's `themes/` directory or add it as a git submodule.

In your site `config.toml` set:

```toml
theme = "flxmodern"

# optional Disqus
disqusShortname = "YOUR_DISQUS_SHORTNAME"

[params]
  # default color scheme: "light" or "dark"; users can toggle in browser
  colorMode = "light"
```

Example menus (hierarchical)

```toml
[[menu.main]]
  name = "Home"
  url = "/"
  weight = 1

[[menu.main]]
  name = "Categories"
  url = "/categories/"
  weight = 2

[taxonomies]
  category = "categories"
  tag = "tags"
  author = "authors"
```

Notes

- This theme ships self-contained CSS and a small JS toggle for dark/light mode. Add self-hosted fonts to `static/fonts/` and update the `head` partial to preload them.

- Author pages are available via the `authors` taxonomy — create content under `content/authors/`.

Modern theme for flxsql.com

## Disqus / Comments

- To enable Disqus comments set either `disqusShortname` at the site root or `params.disqusShortname` in your site config. Example:

```toml
disqusShortname = "your_shortname"
```

Or with params:

```toml
[params]
  disqusShortname = "your_shortname"
```

- This theme shows the comments block for posts in the `content/posts/` section by default. You can enable comments per-page with `comments: true` in front matter.

## Installing the theme

- Place the theme in your site's `themes/flxmodern` directory and set `theme = "flxmodern"` in your site `config.toml`, or add it as a git submodule. If Hugo can't find the theme when using a symlink, copy the theme into your site's `themes/` folder instead.
