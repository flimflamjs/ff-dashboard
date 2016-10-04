# ff-dashboard

The ff-dashboard component is comprised of a header, a main panel, a left panel and a side panel. As a user of the component, you only have to set the dashboard's `displayPanel$` stream to either 'main', 'right' or 'left'. Some CSS is included only for functional styling. We recommend using [`postcss-import`](https://github.com/postcss/postcss-import) for importing the CSS.

### Getting started

In the parent state's init function, initialize the dashboard by calling its init function.

```es6
import dashboard from 'ff-dashboard'

const init = _ => {
  const state = {
    openLeftPanel$: flyd.stream()
  , openRightPanel$: flyd.stream()
  }
  
  const displayPanel$ = flyd.merge(
      flyd.map(R.always('left'), state.openLeftPanel$)
    , flyd.map(R.always('right'), state.openRightPanel$)
  )
  
  state.dashboard = dashboard.init({displayPanel$})
  return state
}
```

Here are all of the options that can be passed to the init function: 

| key | type | default | description |
|:----|:-----|:--------|:------------|
| `displayPanel$` | stream | `flyd.stream('main')` | a stream, which when called can have the following strings as values: `'main'`, `'left'`, `'right'`|
| `leftPanelWidth`| number | `300` | left panel max width in pixels|
| `leftPanelWidth`| number | `300` | left panel max width in pixels|
| `leftPanelOffset`| number | `80` | min pixels between the right side of the screen and the right side of the left panel|
| `rightPanelWidth`| number | `600` | right panel max width in pixels|
| `rightPanelOffset`| number | `0` | min pixels between the left side of the screen and the left side of the right panel|
|`transition`| string | `'0.2s ease-out'` | transition style to be applied to panel movements |


Each side panel has a built in close button that sets the `displayPanel$`'s value to 'main', which closes the side panels.

Next call the dashboard's view function: 
```es6
const view = state => 
  h('div', [
    dashboard.view(state.dashboard, {
        header: h('header', [
          h('button', {on: {click: state.openRightPanel$}}, 'Open Right Panel')
        , h('button', {on: {click: state.openLeftPanel$}}, 'Open Left Panel')
        ])
      , mainPanelBody: h('main', 'Main content') 
      , rightPanelHeader: h('h3', 'Right panel header')
      , rightPanelBody: h('div', 'Right panel content')
      , leftPanelHeader: h('h3', 'Left panel header')
      , leftPanelBody: h('div', 'Left panel content')
    })
  ])
 ```


