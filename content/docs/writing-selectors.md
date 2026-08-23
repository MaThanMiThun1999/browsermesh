---
title: Writing Selectors
description: Learn how to write CSS and XPath selectors to extract data accurately.
order: 2
category: Automation
---

# Writing Selectors

BrowserMesh uses a powerful visual extraction engine that relies on standard CSS and XPath selectors.

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
