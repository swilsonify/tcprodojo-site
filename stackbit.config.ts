import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
  stackbitVersion: '1.0.0',
  nodeVersion: '>=18',
  contentSources: [
    {
      // Git-based content (your repo)
      name: 'git',
      type: 'git',
      rootPath: '.',
      models: [
        {
          name: 'home',
          type: 'page',
          label: 'Home Page',
          filePath: 'index.html',
          urlPath: '/',
          fields: [
            { type: 'string', name: 'heroTitle', label: 'Hero Title', selectors: ['h1'] },
            { type: 'text',   name: 'heroText',  label: 'Hero Paragraph', selectors: ['main p:first-of-type'] },
            { type: 'string', name: 'ctaPrimary', label: 'Primary CTA text', selectors: ["a[href*='classes']"] },
            { type: 'string', name: 'ctaTryout',  label: 'Tryout CTA text', selectors: ["a[href*='tryout']"] }
          ]
        },
        {
          name: 'blogPost',
          type: 'document',
          label: 'Blog Post',
          filePath: 'blog/{slug}.md',
          urlPath: '/blog/{slug}',
          fields: [
            { type: 'string', name: 'title', label: 'Title' },
            { type: 'datetime', name: 'date', label: 'Publish Date' },
            { type: 'markdown', name: 'body', label: 'Body' }
          ]
        }
      ]
    }
  ]
});
