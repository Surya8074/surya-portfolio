import React from 'react';
import './H1.css';

const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const image = event.currentTarget;
  if (image.dataset.fallbackAttempted === 'true') return;
  image.dataset.fallbackAttempted = 'true';
  const localRoot = '/surya-portfolio/toniq/reference-assets/legacy/';
  if (image.src.includes(localRoot)) {
    const assetPath = image.src.split(localRoot)[1];
    image.src = 'https://www.helloayushi.com/images/case-studies/toniq-ai/legacy/' + assetPath;
  } else {
    image.dataset.imageFailed = 'true';
  }
};

export type H1Props = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  paragraphs?: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  className?: string;
};

/**
 * H1 — reusable editorial problem/hero section.
 * Import into any page and pass copy plus an image to reuse the same split layout.
 */
export default function H1({
  eyebrow = 'The problem',
  title = 'Virtual networking events are broken',
  intro = 'There’s a difference between being at an event and being in one.',
  paragraphs = [
    'Online events solved attendance. What they never solved: the moment two strangers find each other, recognize a reason to talk, and walk away with something worth keeping.',
    'Toniq is an argument that the problem isn’t the video call. It’s the absence of a design.',
  ],
  imageSrc = '/surya-portfolio/toniq/toniq-networking-hero.svg',
  imageAlt = 'Toniq virtual networking interface showing live event participants and AI-powered attendee matches',
  imageCaption = 'A more connected virtual event experience',
  className = '',
}: H1Props) {
  return (
    <section className={`h1-section ${className}`.trim()}>
      <div className="h1-section__inner">
        <div className="h1-section__copy">
          <p className="h1-section__eyebrow">{eyebrow}</p>
          <h2 className="h1-section__title">{title}</h2>
          <div className="h1-section__body">
            {intro && <p className="h1-section__intro">{intro}</p>}
            {paragraphs.map((paragraph, index) => (
              <p className="h1-section__paragraph" key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <figure className="h1-section__visual">
          <img src={imageSrc} alt={imageAlt} loading="eager" decoding="async" onError={handleImageError} />
          {imageCaption && <figcaption>{imageCaption}</figcaption>}
        </figure>
      </div>
    </section>
  );
}
