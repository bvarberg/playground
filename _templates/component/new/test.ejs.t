---
to: "<%= includeTests ? `src/components/${path}/${componentName}.test.tsx` : null %>"
unless_exists: true
---
import { <%= componentName %> } from "./<%= componentName %>";

describe("<%= componentName %>", () => {
  it.todo("...");
});
