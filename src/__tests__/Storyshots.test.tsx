import initStoryshots from "@storybook/addon-storyshots"

initStoryshots({
  storyNameRegex: /Gene Follow/,
  test: ({ story, context }) => {
    // console.log(story)
    // console.log(context)
    // const storyElement = story.render(context)
  },
})
