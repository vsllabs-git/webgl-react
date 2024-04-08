# @vsl-labs/webgl-react

### Installation:

```
$ npm install --save @vsl-labs/webgl-react
```

### How to use:

### Use Firebase in your app

```js
import { useVslWebGL } from '@vsl-labs/webgl-react';
import { useEffect } from 'react'

const app = () => {
    // invoke the useVslWebGL hook with your personal appId
    const { translate, VSLWebGl, isLoaded } = useVslWebGL({ appId: 'Your App ID here' })

    useEffect(() => {
        if (text_to_translate && isLoaded) {
            // use the translate function to translate any text
            // into ASL and animate in the webgl display
            translate(text_to_translate)
        }
    }, [text_to_translate])

    // this is the webgl component for render
    return <VSLWebGl />
}
```