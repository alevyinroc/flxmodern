flxmodern — theme status and build instructions

Summary
-------
This file documents the current state of the `flxmodern` Hugo theme as implemented in this repository. It describes what has been built so far, where changes live, how to configure and run the theme, and notes about behavior that is implemented client-side (CSS/JS).

What’s implemented
-------------------
- **Layout & structure**: Responsive two-column layout with a main content column and a sidebar block. Widths are implemented to match the requested proportions (content / sidebar behavior is implemented via CSS with responsive fallbacks).
- **Single post pages**: `layouts/_default/single.html` renders post content, author area, and a sidebar widgetized block. The inline per-post TOC was removed from the article and implemented as a sidebar widget.
- **Table of Contents (TOC)**: TOC for single posts is rendered as a sidebar widget and is:
    - Open on desktop by default and collapsible on mobile.
    - Moved into the post content on small screens for better UX.
    - Implemented in `layouts/partials/sidebar.html` and controlled by JS in `static/js/theme.js` and styled in `static/css/style.css`.
- **Sidebar widgets**: Widgets are grouped under `.sidebar-inner` and behave as a single fixed block on desktop (so they stay fixed together while scrolling). Widgets included:
    - TOC (post-only)
    - Recent posts (configurable count via site params)
    - Social / Follow widget (supports username-only or full URLs)
- **Social widget**: Implemented in `layouts/partials/sidebar.html`. Accepts entries in `.Site.Params.widgets.social` and supports Mastodon, Bluesky, Instagram, LinkedIn, and GitHub. Username-only configs are expanded into canonical URLs. Brand-colored buttons with SVG icons are provided in CSS/inline SVG.
- **Pagination**: Index/list and home pages use unified Previous/Next markup with left/right placement and arrow CSS via pseudo-elements. Templates adjusted: `layouts/_default/list.html`, `layouts/_default/home.html`, `layouts/index.html`.
- **Categories / Terms page**: A three-column, alphabetized categories index is implemented in `layouts/_default/terms.html` showing terms and counts.
- **Post panel appearance**: Posts and widgets have a rounded panel style (16px radius) and off-white/soft tone backgrounds implemented in `static/css/style.css`.
- **Heading permalink**: Headings show a persistent link emoji (🔗) as the permalink glyph. The size is tuned in `static/css/style.css` (final size set in the stylesheet).
- **Client JS**: `static/js/theme.js` contains the code that:
    - Toggles dark/light theme (existing helper behavior).
    - Moves the TOC between sidebar and post on viewport changes.
    - Computes and applies fixed positioning for `.sidebar-inner` on desktop.
    - Handles toggles and debounced resize events.
- **Robust templates**: Template code was made defensive to avoid Hugo template render errors (e.g., guarded Pager usage, safe taxonomies listing without `keys` builtin).

Files changed / created (primary)
--------------------------------
- `layouts/_default/single.html` — removed inline TOC; single post layout and author block remain.
- `layouts/partials/sidebar.html` — new/updated: widgetized sidebar including TOC, recent posts, social follow widget, wrapped in `.sidebar-inner`.
- `layouts/_default/list.html` — updated list pagination and post panel markup.
- `layouts/_default/home.html` and `layouts/index.html` — pagination and layout alignment with list pages.
- `layouts/_default/terms.html` — new categories index (three-column grid, alphabetical).
- `static/css/style.css` — site styles including panel styles, TOC styles, sidebar and widget styles, social brand colors, pagination arrow styles, and heading permalink glyph sizing.
- `static/js/theme.js` — client-side behavior for TOC movement, sidebar fixed behavior, theme toggling, and responsive handling.
- `theme.toml` — updated documentation for `params.widgets.social` examples.

Configuration (site config snippets)
----------------------------------
Add or adjust these to your site config (`config.toml` / `config.yaml`) to enable widgets and control counts:

TOML example:

```
[params]
    recentPostsCount = 5

[params.widgets]
    # social can be username-only or full URL. Example:
    [[params.widgets.social]]
        network = "mastodon"
        username = "@youracct@example.social"

    [[params.widgets.social]]
        network = "github"
        username = "yourusername"

    # Optionally enable/disable the sidebar TOC globally
    toc = true
```

Notes about social entries
- `username` may be a full URL or a username; the theme resolves it into a canonical destination for supported networks.

How to run and test locally
---------------------------
1. Start Hugo's dev server from the repository root:

```bash
hugo server -D
```

2. Visit `http://localhost:1313` and test:
- Open a single post and confirm the TOC appears in the sidebar on desktop and moves into the article on small screens.
- Resize the browser to verify the sidebar becomes static on mobile and fixed as a block on desktop.
- Check pagination on the home and list pages (Previous/Next with arrows at the edges).

Developer notes / implementation details
--------------------------------------
- The TOC is rendered using Hugo's `.TableOfContents` but moved into the sidebar partial so it can be shown/hidden responsively.
- The sidebar widgets are wrapped in `.sidebar-inner`, and `static/js/theme.js` computes left/width and toggles fixed positioning on desktop to avoid overlapping widgets.
- The CSS contains brand colors for social buttons and uses pseudo-elements for pagination arrows; adjust variables in `static/css/style.css` to change colors or sizing.
- Template code includes defensive checks for `.Paginator` and `.Pager` usage to avoid Hugo runtime errors when pages are missing.
- No external CDNs or fonts are required — the theme is designed for self-hosting assets. If you add fonts, place them in `static/fonts/` and load them from the head partial.

Next steps you may want
----------------------
- Fine-tune spacing and typography variables in `static/css/style.css` to match your visual preference.
- Optionally make the permalink glyph an actual anchor element (clickable) for quick-copy links — currently it is styled via CSS pseudo-elements; converting to an element would require small template changes to heading rendering.
- Add unit/integration tests for template rendering if you run automated builds.

If you want, I can now:
- Commit and push these documentation changes (already committed for other edits) — tell me if you want a specific commit message.
- Implement the clickable permalink anchors instead of the emoji pseudo-element.

Changelog (high level)
----------------------
- Moved per-post TOC into a sidebar widget and made it responsive.
- Implemented grouped/fixed sidebar behavior so widgets do not overlap and remain together.
- Added social follow widget with username-only config support and brand styling.
- Normalized pagination across list/home/index pages (edge-justified Previous/Next with arrows).
- Added categories/terms index page (3-column alphabetical grid).
- Replaced hover-only heading anchors with a persistent permalink emoji glyph.

End of file.
