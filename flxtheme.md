I want to build a new theme for my Hugo powered blog.

I want the appearance to:
    *Clean and modern
    *Simple
    *Have dark and light modes
    *Have clean typography

Designs I've seen that I like:
    * https://rickcarlino.com

Navigation:
    Hierarchical menus in a navigation bar

Page dimensions:
    *The total width should be 90 percent of the viewport
    *The main page, and index pages for each category, will have:
        *A main column that's 75% of the content space
        *A sidebar that's 20% of the content space.
Pages:
    * The front/main page should be snippets of the 10 most recent posts across all categories
    * Additional posts (past the first 10) will be on secondary pages, accessed via links labeled Previous and Next, with the same appearance as the front page
    * There will be pages for each category which mirror the main page appearance and behavior
    * Each blog post will get its own page which contains the post content, Disqus comments at the bottom, and the sitewide header and navigation.
    * At the bottom of each blog post page, place an "About the Author" widget that includes the author avatar and link to the author's page
    * The page listing categories should show all categories as a word cloud, with the size of each category scaled relative to the number of posts in that category

The site configuration and theme should support multiple authors. Each author will get their own page for profile information.

I don’t want to use any external resources if at all possible (so, only self-hosted fonts and libraries).

The sidebar widgets should include:
    *Recent posts
    *Categories
    *Social Media links


Can you start building that? Call it "flxmodern" and place it in the local path /Users/andy/code/flxmodern, which is a git repository cloned from https://github.com/alevyinroc/flxmodern