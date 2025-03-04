import React from 'react'
import Guitar, {
  useSound,
  tunings,
  getRenderFingerRelative,
  getRenderFingerSpn
} from '../src'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, boolean, select } from '@storybook/addon-knobs'
import { name } from '../src/music/note'
import { range } from 'lodash'
import { useState } from '@storybook/addons'
import E2 from '../resources/E2.mp3'
import D3 from '../resources/D3.mp3'
import G3 from '../resources/G3.mp3'
import E4 from '../resources/E4.mp3'

storiesOf('Guitar', module)
  .addDecorator(withKnobs)
  .add('advanced', () => {
    const notes = range(12).reduce(
      (acc, note) => ({ ...acc, [name(note)]: note }),
      {} as {
        [K: string]: number
      }
    )
    const root = select('Root', notes, notes['C'])
    const renderFingerFunctions = {
      'Scientific Pitch Notation': getRenderFingerSpn(tunings.standard, root),
      'Relative to Root': getRenderFingerRelative(tunings.standard, root)
    }
    const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0])
    const { play } = useSound({ E2, D3, G3, E4 }, strings)
    return (
      <Guitar
        lefty={boolean('Lefty', false)}
        frets={{
          from: number('From fret', 0),
          amount: number('Frets', 22)
        }}
        strings={strings}
        renderFinger={
          renderFingerFunctions[
            select<keyof typeof renderFingerFunctions>(
              'Notes',
              ['Scientific Pitch Notation', 'Relative to Root'],
              'Scientific Pitch Notation'
            )
          ]
        }
        onChange={setStrings}
        onPlay={play}
      />
    )
  })
  .add('with fixed A minor', () => <Guitar strings={[0, 1, 2, 2, 0, -1]} />)
  .add('with fixed A minor and sound', () => {
    const fretting = [0, 1, 2, 2, 0, -1]
    const { play } = useSound({ E2, D3, G3, E4 }, fretting)
    return <Guitar strings={fretting} onPlay={play} />
  })
  .add('editable', () => {
    const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0])
    return <Guitar strings={strings} onChange={setStrings} />
  })
  .add('without strings', () => <Guitar />)
  .add('ukelele', () => {
    const [strings, setStrings] = useState([0, 0, 0, 0])
    const { play } = useSound({ E2, D3, G3, E4 }, strings, tunings.ukelele)
    return (
      <Guitar
        strings={strings}
        onPlay={play}
        renderFinger={getRenderFingerSpn(tunings.ukelele)}
        onChange={setStrings}
      />
    )
  })
