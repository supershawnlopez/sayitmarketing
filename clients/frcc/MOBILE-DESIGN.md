# FRCC mobile readability and layout refresh

## Owner feedback

Owner supplied nine iPhone screenshots: FRCC home and Zion City reference pages.
FRCC's labels and service details were small even with the phone text preference
at maximum; cards remained inset; the red visit band had a cramped, fragmented
layout. Request applies across every public page, not only Home.

## Design and implementation

- Preserve FRCC wordmark, #E02B20 red, abstract stock heroes and authentic photos.
- Use relative font sizing throughout the existing stylesheet, with a shared
  reading scale: 19px equivalent body copy, 16px controls, 14px minimum primary
  labels at a 16px root. Use stronger headings, consistent leading and contrast.
- Root opts into Safari's `-apple-system-body` Dynamic Type value; branded Geist
  font remains on body. Other browsers retain their preferred default root size.
  Do not disable zoom, cap user text size or hide page overflow to mask problems.
- Replace VisitBand's narrow columns and tiny service string with a clear heading,
  separate linked Sunday/Wednesday times and a directions row. On small screens
  the schedule can reflow from two columns to one as text grows.
- Make Home photography cards and Events/Messages image tiles edge-to-edge on
  phones. Keep original church photos at their natural proportions with readable
  dark captions below; do not generate people, alter faces or crop the pastor.
- Apply shared typography to About, ministries, Messages, Events, Give, Contact,
  Spanish starter, navigation, service schedule and footer. Stack narrow footer
  columns and remove decorative ministry-number columns on small screens.
- Allow header height and content grids to grow; retain accessible touch targets,
  keyboard focus, reduced motion and calendar list/month controls.

## Team review

Independent read-only accessibility review identified tiny mobile overrides,
fixed header height, visit-band grid/nowrap, footer columns, nested giving-panel
padding, image letterboxing and page zoom as specific risks. The implementation
addresses these through shared type rules, natural image sizing and reflow.
Browser runtime currently fails on a missing installed service module, so rendered
320–430px, 200% zoom and physical iPhone Dynamic Type validation must not be claimed.
Build/export/HTTP checks cover availability, not visual layout correctness.

The Zion City screenshots are the visual reference supplied by the owner; no
Zion images or text were copied. WebKit reference for Dynamic Type:
https://webkit.org/blog/3709/using-the-system-font-in-web-content/
