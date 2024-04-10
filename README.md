# @vsllabs/webgl-react

### Installation:

```
$ npm install --save @vsllabs/webgl-react
```

### How to use:

```js
import { useVslWebGL } from '@vsllabs/webgl-react';
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