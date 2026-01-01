# flxmodern — Hugo theme

Clean, modern Hugo theme with light/dark modes, simple typography, hierarchical navigation, and built-in Disqus support.

Quick usage
- Place this theme in your Hugo site's `themes/` directory or use it as a submodule.
- In your site `config.toml` set:

```toml
theme = "flxmodern"

# optional Disqus
disqusShortname = "YOUR_DISQUS_SHORTNAME"

[params]
  # default color scheme: "light" or "dark"; users can toggle in browser
  colorMode = "light"

# Example menus (hierarchical)
[[menu.main]]
  name = "Home"
  url = "/"
  weight = 1

[[menu.main]]
  name = "Categories"
  url = "/categories/"
  weight = 2

# Taxonomies (add to your site config)
[taxonomies]
  category = "categories"
  tag = "tags"
  author = "authors"
```

Notes
- This theme ships self-contained CSS and a small JS toggle for dark/light mode. Add self-hosted fonts to `static/fonts/` and update `assets` or `head` partial accordingly.
- Author pages are available via the `authors` taxonomy — configure taxonomy in your site config and create content under `content/authors/`.
# flxmodern
Modern theme for flxsql.com
