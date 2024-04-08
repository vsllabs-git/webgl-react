import { useEffect } from 'react'
import './App.css'
import useVslWebGL from './hooks/useVslWebGL'

function App() {
  const { VSLWebGl, translate, isLoaded } = useVslWebGL({ appId: '123' })

  useEffect(() => {
    if (isLoaded) {
      translate('let us go home')
    }
  }, [isLoaded])

  return <VSLWebGl />
}

export default App
