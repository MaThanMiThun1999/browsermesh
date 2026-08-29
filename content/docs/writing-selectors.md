---
title: Writing Anti-Bot Resilient DOM Selectors Guide
description: Best practices for writing robust, anti-bot resilient CSS and XPath selectors for web scraping.
order: 6
category: Best Practices
---

When scraping modern dynamic websites, brittle selectors (like generated class names or deep absolute paths) frequently break when sites update their DOM or apply bot obfuscation.

## CSS Selectors

If you are familiar with web development, CSS selectors are the easiest way to extract data.

```css
/* Select all product titles */
.product-grid .product-title

/* Select the first image in an article */
article img:first-of-type
```

## XPath Selectors

For more complex queries (like selecting an element based on its text content), you can use XPath.

```xpath
/* Select a button that contains the text "Add to Cart" */
//button[contains(text(), 'Add to Cart')]
```

## Tips for Reliable Selectors

- **Avoid auto-generated classes:** Classes like `.css-1a2b3c` change often. Rely on semantic tags or data attributes.
- **Use `data-*` attributes:** If the target site uses `data-testid="price"`, this is usually the most stable selector.
- **Test locally:** Use the "Test Run" feature in the BrowserMesh app to verify your selectors before deploying a large job.
