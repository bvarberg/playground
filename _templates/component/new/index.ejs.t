---
to: src/components/<%= path %>/index.tsx
unless_exists: true
---
export { <%= componentName %> } from "./<%= componentName %>";
