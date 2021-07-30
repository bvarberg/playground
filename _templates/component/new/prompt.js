const i = require("inflection");

module.exports = {
  prompt: ({ prompter }) => {
    return prompter
      .prompt([
        {
          message: "Component name:",
          name: "name",
          type: "input",
        },
        {
          message: "Include stories?",
          name: "includeStories",
          type: "toggle",
        },
        {
          message: "Include tests?",
          name: "includeTests",
          type: "toggle",
        },
      ])
      .then(({ name, includeStories, includeTests }) => {
        const normalizedPath = name
          .split("/")
          .map((part) => i.camelize(part, false))
          .join("/");
        const componentName = normalizedPath.split("/").pop();

        return {
          path: normalizedPath,
          componentName,
          includeStories,
          includeTests,
        };
      });
  },
};
