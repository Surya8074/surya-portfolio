# H1 reusable section

A reusable, responsive split-layout section for a project problem statement or editorial hero.

## Import

```tsx
import H1 from './components/H1';
```

If importing from another directory, adjust the relative path.

## Toniq default

```tsx
<H1 />
```

This renders the saved Toniq copy and the local Toniq networking visual.

## Customize for another project

```tsx
<H1
  eyebrow="The challenge"
  title="Give your project a clear headline"
  intro="A short supporting statement."
  paragraphs={[
    "Explain the user or business problem.",
    "Add a second paragraph with the key context."
  ]}
  imageSrc="/surya-portfolio/your-project/hero-image.webp"
  imageAlt="Describe what the project image shows"
  imageCaption="Optional image caption"
/>
```

## Props

- `eyebrow`: small uppercase label above the headline.
- `title`: main section heading.
- `intro`: larger introductory sentence.
- `paragraphs`: supporting paragraph array.
- `imageSrc`: image URL or public asset path.
- `imageAlt`: accessible image description.
- `imageCaption`: optional caption.
- `className`: optional extra class for page-specific styling.

The component and its styles live in `src/components/H1.tsx` and `src/components/H1.css`.
