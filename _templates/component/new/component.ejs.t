---
to: src/components/<%= path %>/<%= componentName %>.tsx
unless_exists: true
---
export interface Props {}

export function <%= componentName %>({}: Props) {
  return null;
}
