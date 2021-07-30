---
to: "<%= includeStories ? `src/components/${path}/${componentName}.stories.tsx` : null %>"
unless_exists: true
---
import { Meta, Story } from '@storybook/react'
import { Props, <%= componentName %> as <%= componentName %>Component } from "./<%= componentName %>";

export default {
  title: "<%= path %>",
  component: <%= componentName %>Component,
  parameters: {
    layout: "centered",
  },
} as Meta<Props>;

export const <%= componentName %>: Story<Props> = (...args) => <<%= componentName %> {...args} />
<%= componentName %>.storyName = '<%= componentName %>'
