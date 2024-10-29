# @vsllabs/webgl-react

## Installation:

To install the package, run:

```bash
$ npm install --save @vsllabs/webgl-react
```

<span style="color:red">This text is red.</span>

## $\colorbox{green}{{\color{white}{This\ is\ a\ Big\ Title}}}$

+ text in green

$${\color{red}Red}$$

$\color{green}{test}$

## Usage Example:

Below is an example of how to use the useVslWebGL hook within a React component:

```js
import { useState } from 'react'
import { useVslWebGL } from '@vsllabs/webgl-react';

const app = () => {
    // example text input state
    const [inputText, setInputText] = useState('')

    // invoke the useVslWebGL hook with your personal API_KEY and build URLs
    const { VSLWebGl, unityProvider, translateTextToASL, isUnityLoaded, isTranslating, replay, error } = useVslWebGL({
        API_KEY: 'Your API Key here',
        // *We will provide these URLs for you
        loaderUrl: 'Unity build Url'
        dataUrl: 'Unity build Url'
        frameworkUrl: 'Unity build Url'
        codeUrl: 'Unity build Url'
     })

    return (
        <div>
            {/* The WebGL component for rendering, can be styled as needed */}
            <VSLWebGl id="unityWebGl" style={{ width: '100%', height: '100%' }} unityProvider={unityProvider} />

            {/* Example input for the text state */}
            <input type="text" value={inputText} onChange={ev => setInputText(ev.target.value)} />

            {/* Translate button, triggers translation when Unity is loaded and input is provided */}
            <button type="button" onClick={() => translateTextToASL(inputText)}>
                translate
            </button>

            {/* Replay button, replays the last translation */}
            <button type="button" onClick={replay}>
                replay
            </button>
        </div>
    )
}
```

## Documentation

useVslWebGL **Hook**

The useVslWebGL hook provides the necessary setup and functionality for integrating the VSL WebGL component within a React application. It returns an object with various properties and functions for rendering, controlling, and interacting with the WebGL component.

### Required Parameters
 * **API_KEY**: Your unique API key for accessing the VSL WebGL services.
 * **loaderUrl, dataUrl, frameworkUrl, codeUrl**: URLs provided by VSL for accessing the Unity WebGL build. Each URL is necessary for loading the Unity environment properly.

### Returned Values
 1. VSLWebGl (JSX Component):
    * A JSX component for rendering the Unity WebGL. Can be styled and controlled within a parent component or container.
    * Example:
    ```js
     <VSLWebGl style={{ width: '100%', height: '100%' }} unityProvider={unityProvider} /> 
     ```
 2. translateTextToASL (Function):
    * Function to trigger text translation within the Unity WebGL.
    * **Arguments:** Accepts a single argument (the text to translate).
    * **Example:** translateTextToASL("Hello, world!")
