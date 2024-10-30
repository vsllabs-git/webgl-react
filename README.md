# @vsllabs/webgl-react


## Installation:

To install the package, run:

Using npm:
```bash
$ npm install @vsllabs/webgl-react
```

Using yarn:
```bash
$ yarn add @vsllabs/webgl-react
```


## Table of Contents

- [Usage Example](#usage-example)
- [Documentation](#documentation)
- [Required Parameters](#required-parameters)
- [Returned Values](#returned-values)
- [Example Workflow](#example-workflow)


## Usage Example:

Below is an example of how to use the useVslWebGL hook within a React component:


```js
import { useState } from 'react'
import { useVslWebGL } from '@vsllabs/webgl-react';

const app = () => {
    // example text input state
    const [inputText, setInputText] = useState('')

    // invoke the useVslWebGL hook with your personal API_KEY and build URLs
    const { VSLWebGl, unityProvider, translateTextToASL, isUnityLoaded, isTranslating, replay } = useVslWebGL({
        API_KEY: 'Your API Key here',
        // *We will provide these URLs for you
        loaderUrl: 'Unity build Url'
        dataUrl: 'Unity build Url'
        frameworkUrl: 'Unity build Url'
        codeUrl: 'Unity build Url'
     })

    return (
        <div style={{ width: '400px', height: '700px', position: 'relative', margin: 'auto' }}>

            {!isUnityLoaded && (
                <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, background: '#999' }}>
                {/* Loading spinner example here */}
                </div>
            )}

            {/* The WebGL component for rendering, can be styled as needed */}
            <VSLWebGl id="unityWebGl" style={{ width: '100%', height: '100%' }} unityProvider={unityProvider} />

            {/* Example input for the text state */}
            <input type="text" value={inputText} onChange={ev => setInputText(ev.target.value)} />

            {/* Translate button, triggers translation when Unity is loaded and input is provided */}
            <button type="button" onClick={() => translateTextToASL(inputText)}>
                {isTranslating ? 'Loading...' : 'Translate'}
            </button>

            {/* Replay button, replays the last translation */}
            <button type="button" onClick={replay}>
                Replay
            </button>
        </div>
    )
}
```


## Documentation

The ***useVslWebGL*** hook provides the necessary setup and functionality for integrating the VSL WebGL component within a React application. It returns an object with various properties and functions for rendering, controlling, and interacting with the WebGL component.


### Required Parameters
 * **API_KEY**: Your unique API key for accessing the VSL WebGL services.
 * **loaderUrl, dataUrl, frameworkUrl, codeUrl**: URLs provided by VSL for accessing the Unity WebGL build. Each URL is necessary for loading the Unity environment properly.


### Returned Values

The following values and functions are returned by useVslWebGL:

| Value         | Explanation                                    |
| :------------ | :--------------------------------------------- |
| VSLWebGl | <ul><li>A JSX component for rendering the Unity WebGL. Can be styled and controlled within a parent component or container.</li><li>Example: <br><pre lang="javascript"> <VSLWebGl style={{ ... }} unityProvider={unityProvider} /> </pre></li></ul>  |
| unityProvider | <ul><li>Required prop for the ***VSLWebGl*** component, provides the Unity instance.</li><li>Pass this to the ***unityProvider*** prop of *VSLWebGl* to initialize the Unity environment.</li></ul>  |
| translateTextToASL | <ul><li>Function to trigger text translation within the Unity WebGL.</li><li>**Arguments:** Accepts a single argument (the text to translate).</li><li>**Example:** <pre lang="javascript"> translateTextToASL("Hello, world!") </pre></li></ul>  |
| isUnityLoaded | <ul><li>Indicates whether the Unity WebGL component has fully loaded. Useful for checking readiness to show loaders and before triggering translation.</li><li>**Example:** Disabling the translate button until Unity is ready.</li></ul>  |
| isTranslating | <ul><li>Represents the loading state during the translation process. Helpful for displaying loading indicators.</li><li>**Example:** <pre lang="javascript"> {isTranslating ? 'Translating...' : 'Translate'} </pre></li></ul>  |
| replay | <ul><li>Function to replay the last translated text within the Unity WebGL.</li><li>**Arguments:** No arguments required.</li></ul>  |
| changeBgColor | <ul><li>Changes the background color of the WebGL component.</li><li>**Arguments:** Accepts a single argument, a string representing a hex color value (e.g., #FFFFFF for white).</li><li>**Example:** <pre lang="javascript"> changeBgColor('#FF5733') </pre> to set the background color to a shade of orange.</li></ul>  |
| setAnimationSpeed | <ul><li>Controls the speed of animations within the WebGL environment.</li><li>**Arguments:** Accepts a single string argument, which can be one of four options: "0" (for pause), "0.5", "1" (default), or "1.5".</li><li>**Example:** <pre lang="javascript"> setAnimationSpeed("1.5") </pre> to set the animation speed to 1.5x.</li></ul>  |
| toggleCameraRotation | <ul><li>Toggles the rotation of the camera in the WebGL environment.</li><li>**Arguments:** Accepts a single boolean argument to enable (true) or disable (false > default) camera rotation.</li><li>**Example:** <pre lang="javascript"> toggleCameraRotation(true) </pre> to enable camera rotation.</li></ul>  |
| error | <ul><li>If any errors occur during loading or translation, this string provides an error message explaining the issue.</li><li>**Example:** Display error in your UI if it’s not an empty string.</li><li>**Note:** Errors are also logged in the console</li></ul>  |



### Example Workflow

 1. Initialize the Hook: Call useVslWebGL with the required parameters to initialize the WebGL component.
 2. Render the Component: Use <VSLWebGl /> in your component, styled to fit your layout.
 3. Translate Text: Use the translateTextToASL function to translate input text when Unity is loaded (isUnityLoaded).
 4. Replay Last Translation: Use the replay function to repeat the last translation as needed.
 5. Handle Errors: Check the error value to catch and display any issues that occur during loading or translation.


 ## License

[MIT](LICENSE)