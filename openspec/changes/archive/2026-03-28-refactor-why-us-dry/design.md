# Design: Refactor WhyUs.astro for DRY

The refactoring will address two types of repetition: data-driven (hardcoded links and keys) and structural (template wrappers).

## Data Refactoring

Currently, the links for the "Why Us" section are hardcoded in the component logic using a ternary operator:
```javascript
const link =
  slideKey === 'dmc'
    ? 'https://dmcfinder.com/listing/cancun-concierge-dmc/'
    : slideKey === 'site'
      ? 'https://siteglobal.com/'
      : null
```

This will be moved to `src/messages/en.json` and `src/messages/es.json` by adding an optional `href` field to each slide:
```json
"dmc": {
  "alt": "DMC Finder Member",
  "text": "Official member. Connecting planners with trusted, vetted Destination Management Companies worldwide",
  "href": "https://dmcfinder.com/listing/cancun-concierge-dmc/"
}
```

This approach allows each language version to potentially have different links if needed, and centralizes all content.

## Structural Refactoring

The component currently duplicates classes for both `<a>` and `<div>` wrappers:
```astro
return link ? (
  <a href={link} ...>
    {content}
  </a>
) : (
  <div ...>
    {content}
  </div>
)
```

We can define a common set of classes and properties and use a dynamic tag approach:
```astro
const Tag = slide.href ? 'a' : 'div'
const tagProps = slide.href ? { href: slide.href, target: '_blank', rel: 'noopener noreferrer' } : {}

<Tag
  {...tagProps}
  class={clsx(
    'flex-col',
    'items-center',
    'justify-start',
    'text-center',
    'hover:scale-105',
    'transition-transform',
    'duration-300',
    'contents',
  )}
>
  <InfoCard ... />
</Tag>
```

This simplifies the template and ensures consistency.

## Loop Refactoring

Instead of hardcoding `slidesKeys = ['dmc', 'sectur', 'site']`, we can iterate over the keys of the `slides` object from the translation:
```javascript
const slides = t('whyUs.slides')
const slideKeys = Object.keys(slides)
```

This makes the component more flexible if new slides are added to the translation.
