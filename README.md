# ff-dashboard

The ff-dashboard component is a [flimflam](http://flimflamjs.github.io/) component comprised of a header, a main panel, a left panel and a right panel. As a user of the component, you just have to set the dashboard's `displayPanel$` stream to either 'main', 'right' or 'left'. Some CSS is included but only for functional styling (as opposed to aesthetic styling). I recommend using [`postcss-import`](https://github.com/postcss/postcss-import) for importing the CSS.

You can see an example of the dashboard [here](https://flimflamjs.github.io/ff-dashboard/). The example uses some minimal aesthetic styling.

### Getting started

In the parent state's init function, initialize the dashboard by calling its init function.

```es6
import dashboard from 'ff-dashboard'
import flyd from 'flyd'
import flydMergeall from 'flyd/module/mergeall'

const init = _ => {
  const state = {
    openLeftPanel$: flyd.stream(),
    openRightPanel$: flyd.stream(),
    openMainPanel$: flyd.stream()
  }
  
  const displayPanel$ = flydMergeall([
      flyd.map(_ => 'left', state.openLeftPanel$),
      flyd.map(_ => 'right', state.openRightPanel$),
      flyd.map(_ => 'main', state.openMainPanel$)
  ])
  
  state.dashboard = dashboard.init({displayPanel$})
  return state
}
```

Here are all of the options that can be passed to the dashboard's init function: 

| key | type | default | description |
|:----|:-----|:--------|:------------|
| `displayPanel$` | stream | `flyd.stream('main')` | a stream, which when called can have the following strings as values: `'main'`, `'left'`, `'right'`|
| `leftPanelWidth`| number | `300` | left panel max width in pixels|
| `leftPanelOffset`| number | `80` | min pixels between the right side of the screen and the right side of the left panel|
| `rightPanelWidth`| number | `600` | right panel max width in pixels|
| `rightPanelOffset`| number | `0` | min pixels between the left side of the screen and the left side of the right panel|
|`transition`| string | `'0.2s ease-out'` | transition style to be applied to panel movements |


Next, call the dashboard's view function:

```es6
const view = state => 
  h('div', [
    dashboard.view(state.dashboard, {
        header: h('header', [
          h('button', {on: {click: state.openLeftPanel$}}, 'Open Left Panel'),
          h('button', {on: {click: state.openRightPanel$}}, 'Open Right Panel'),
          h('button', {on: {click: state.openMainPanel$}}, 'Open Main Panel')
        ]),
        mainPanel: h('div', 'Main content'),
        rightPanel: h('div', 'Right panel content'),
        leftPanel: h('div', 'Left panel content')
    })
  ])
 ```
 
The dashboard's view function takes the dashboard's state as the first argument and an object with snabbdom views as the second argument. You can safely omit any of the views if you want. Here are all of the views that you can pass in:

- header
- mainPanel
- rightPanel
- leftPanel
