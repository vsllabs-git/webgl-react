import { useState } from 'react'
import './App.css'
import useVslWebGL from './hooks/useVslWebGL'

function App() {
  const [inputText, setInputText] = useState('')

  const { VSLWebGl, unityProvider, translateTextToASL, replay } = useVslWebGL({
    // API_KEY: '123'
    API_KEY: import.meta.env.VITE_API_KEY,
    loaderUrl: import.meta.env.VITE_WEBGL_LOADER_URL,
    dataUrl: import.meta.env.VITE_WEBGL_DATA_URL,
    frameworkUrl: import.meta.env.VITE_WEBGL_FRAMEWORK_URL,
    codeUrl: import.meta.env.VITE_WEBGL_CODE_URL
  })

  return (
    <div>
      <VSLWebGl id="unityWebGl" style={{ width: '100%', height: '100%' }} unityProvider={unityProvider} />
      <input type="text" value={inputText} onChange={ev => setInputText(ev.target.value)} />
      <button type="button" onClick={() => translateTextToASL(inputText)}>
        translate
      </button>
      <button type="button" onClick={replay}>
        replay
      </button>
    </div>
  )
}

export default App
