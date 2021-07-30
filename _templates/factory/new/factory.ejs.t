---
to: src/factories/<%= h.inflection.camelize(name, true) %>.ts
unless_exists: true
---
<% type = h.inflection.camelize(name) -%>
<% factoryName = h.inflection.camelize(name, true) + "Factory" -%>
import { Factory } from "fishery";
import { <%= type %> } from "../types/<%= type %>";

export const <%= factoryName %> = Factory.define<<%= type %>>(() => ({}));
