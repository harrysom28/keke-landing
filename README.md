# Keke App Landing Page

Landing page for the Keke ride-hailing app, based on the [Figma design](https://www.figma.com/design/mRGh8HSTgacNvYoiyUa3JJ/Keke-app?node-id=610-7497).

## Run locally

Open `index.html` in a browser, or use a local server:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Structure

- **index.html** — Page structure: header, hero, features, ride CTA, benefits, testimonials, CTA banner, footer
- **styles.css** — Layout and styling (teal/green theme, keke pattern, phone mockups, responsive)
- **script.js** — Mobile nav toggle and testimonial controls

## Customization

- Replace hero and testimonial images by updating the `src` in `index.html` or add your own under an `assets/` folder.
- App Store / Google Play links: set the `href` on the `.btn-app` buttons.
- Social links: set the `href` on each `.footer-social a`.
- CTA banner background: change the `background` URL in `.cta-banner-bg` in `styles.css` to your own image.

## Sections

1. **Header** — Logo + nav (Home, About Us, Contact Us, Terms & Conditions, Privacy & Policy)
2. **Hero** — “The fast, affordable way to ride” + download CTAs
3. **Our Features** — Save on ride, Select the best Driver, Earn extra (Drivers)
4. **Get a ride in minutes** — Teal CTA + phone mockup
5. **Benefits** — Safe and convenient, Happy drivers/riders, Always there for you
6. **Testimonials** — Quote + author + prev/next
7. **CTA Banner** — “What are you waiting for?” + Join Keke
8. **Footer** — Logo + social icons
