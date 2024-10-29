# @vsllabs/webgl-react

### Installation:

```
$ npm install --save @vsllabs/webgl-react
```

### How to use:

```js
import { useState } from 'react'
import { useVslWebGL } from '@vsllabs/webgl-react';

const app = () => {
    // example text input state
    const [inputText, setInputText] = useState('')

    // invoke the useVslWebGL hook with your personal API_KEY and build URLs
    const { VSLWebGl, unityProvider, translate, isUnityLoaded, isTranslating, replay, error } = useVslWebGL({
        API_KEY: 'Your API Key here',
        // *We will be provided these URLs for you
        loaderUrl: 'Unity build Url'
        dataUrl: 'Unity build Url'
        frameworkUrl: 'Unity build Url'
        codeUrl: 'Unity build Url'
     })

    // returned values details:
    //   1. VSLWebGl: JSX to render
    //   2. unityProvider: to be provided to VSLWebGl. * see example below.
    //   3. translate: translate function, takes 1 argument (the text to translate).
    //   4. isUnityLoaded: boolean indicator, is true when unity webgl finishes loading.
    //   5. isTranslating: boolean state for when is fetching translation for your use.
    //   6. replay: replay function, no arguments. (replays the last translated text)
    //   7. error: if any errors occur, this string will explain it. also errors will be logged to console.

    return (
        <div>
            {/* the webgl component for render, you can set styles, or style the wrapping container and keep the full width/height */}
            <VSLWebGl id="unityWebGl" style={{ width: '100%', height: '100%' }} unityProvider={unityProvider} />

            {/* example input for the text state */}
            <input type="text" value={inputText} onChange={ev => setInputText(ev.target.value)} />

            {/* translate button, will work only when API Key is valid, after unity is loaded, and a NONE empty text is provided */}
            <button type="button" onClick={() => translate(inputText)}>
                translate
            </button>

            {/* replay button uses the replay function */}
            <button type="button" onClick={replay}>
                replay
            </button>
        </div>
    )
}
```