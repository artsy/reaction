- Opt in to specific filters
  I don't think it matters - I think they will just end up unused if you don't put a dimensions filter on the page (for example)

- Same question with zeroState?
  I think so. Currently it's being set in the grid, on componentDidMount - https://github.com/pepopowitz/reaction/commit/4d5635fbda9fd80d4db7a88b0fb8af4e821b1c7b#diff-008f0121bed71887ff8129a9bc53f306R74. It might make more sense to do this within the filterstate, though it might also be tricky.

- Rename Artist/ArtworkFilter to FilterContainer, for consistency?

## params into constructor

- tracking: will probably have to convert a bunch of tracking to use decorators/hooks instead of passing a tracking prop into filterstate https://github.com/artsy/reaction/blob/master/src/Apps/Collect/FilterState.tsx#L48

- params: comes from found router (matching params, i.e. "collect/photography" => medium: photography)

## Questions

- medium uses \* as initial value in some places but null/"" in others. what's the deal?

## Thoughts

- the way the tests are taking shape, and the order in which I'm building, makes me wonder if the abstraction is each individual filter. Define the name, the URL property, the default value, how it affects the URL,.....and then have each separate section declare which filters it uses (and override some if they need to)

## TODO

1. Convert FilterState to a Context

- consolidate "initial values" into one place
- implement "resetFilters"
- fix broken tests from conversion
- figure out some typings
- move rangeToTuple to its own util
- figure out how to make keyword different from the rest of the filters
  - this might be where I start thinking in terms of registering "filters" for each app, instead of the filtercontext knowing about all of them.

2. Centralize FilterContext
3. Spread FilterContext to collect, collection, & artist apps

## Issues

1. state of filter components is out of date after back/fwd button

- This happens to the search results in prod now, but more infrequently than it is happening in this branch.
- I think I can subscribe to window.onpopstate and derive state from URL & update it.
  That might cause more loading spinners, though.

2. Time period issues.

- URL is updated as &major_periods=1990 instead of &major_periods%5B0%5D=1990
  - somewhere the array-ness is getting lost
- Console error when de-selecting a time period.
  - probably related to the first issue
