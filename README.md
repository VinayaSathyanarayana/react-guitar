# React-Guitar &middot; [![npm version](https://img.shields.io/npm/v/react-guitar.svg?style=flat)](https://www.npmjs.com/package/react-guitar)

A beautiful and flexible guitar component for React.

See https://react-guitar.com for a live demo.

![Screenshot of the rendered component with an A minor chord](packages/react-guitar/screenshot.png)

[![Edit quizzical-dawn-0hzuq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/interesting-breeze-ll7zh)

## Usage

```
npm i react-guitar
```

```jsx
import React from 'react'
import { render } from 'react-dom'
import Guitar from 'react-guitar'

render(
  <Guitar strings={[0, 1, 2, 2, 0, -1]} />,
  document.getElementById('root')
)
```

Check out [the storybook](https://react-guitar.com/storybook) for more advanced examples.

### Props

| Name           | Description                                                                                                                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`    | An css class string to apply to the container element.                                                                                                                                                                                    |
| `strings`      | An array where each number represents the fret the string is pressed on (`0` means open string and `-1` muted). `[0, 1, 2, 2, 0, -1]` is an `A minor` in a standard guitar and `[3, 0, 0, 0]` is a `C major` in an ukelele.               |
| `frets`        | An object with the shape `{ from: number amount: number }` to configure the frets of the guitar (`{ from: 0, amount: 22 }` by default). It can start on any fret which is useful for displaying just a chord instead of the whole guitar. |
| `lefty`        | A boolean to configure the guitar for left handed people like me.                                                                                                                                                                         |
| `renderFinger` | A function `(string: number, fret: number) => JSX.Element` that will be used to render the content of the white bubble used for the fingers. This can be used to render the note name.                                                    |
| `onChange`     | A function `(strings: number[]) => void` that will be called when a string is press/unpressed. If not present the guitar will be read only.                                                                                               |
| `onPlay`       | A function `(string: number) => void` that will be called each time the user plays a string (hovering with the mouse). This can be used to play the sound of the string.                                                                  |

### Hooks

#### useSound

In order to enable sound playing `react-guitar` offers the [useSound](packages/react-guitar/src/hooks/sound.ts) hook:

```jsx
import Guitar, { useSound } from 'react-guitar'
import E2 from 'react-guitar/resources/E2.mp3'
import D3 from 'react-guitar/resources/D3.mp3'
import G3 from 'react-guitar/resources/G3.mp3'
import E4 from 'react-guitar/resources/E4.mp3'

...

const { play, strum } = useSound({ E2, D3, G3, E4 }, strings, tuning)

<Guitar strings={strings} onPlay={play}/>

...
```

It receives:
| Name | Description |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `samples` | A map from note names to mp3 files representing the samples. `react-guitar` offers 4 samples out of the box recorded from a Spanish guitar. |
| `strings` | The same value passed as the `strings` prop to the `<Guitar />` component with the current fretting. |
| `tuning` | An array of midi values for each string. `react-guitar` offers 4 tunings out of the box (`standard`, `ukelele`, `rondeña` and `dadgad`). |

And will return an object containing:

| Name    | Description                                                           |
| ------- | --------------------------------------------------------------------- |
| `play`  | A function that receives a string number and plays its current sound. |
| `strum` | A function that will strum all the strings of the guitar.             |

## Developing

- `yarn start` will spin up the storybook and the site.
- `yarn build` will build the component and the site.
