import { useCallback, useEffect, useState } from 'react'

const useVslWebGL = ({ appId }: { appId: string }) => {
  const [sessionId, setSessionId] = useState()
  const [url, setUrl] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  const translate = useCallback(
    async (text: string) => {
      await fetch('http://localhost:8000/demo/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': appId
        },
        body: JSON.stringify({ text, sessionId })
      })
    },
    [sessionId, appId]
  )

  useEffect(() => {
    if (appId) {
      ;(async () => {
        const response = await fetch('http://localhost:8000/demo/getSessionId', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': appId
          }
        })
        const data = await response.json()

        setSessionId(data.sessionId)
        setUrl(data.url)
        setIsLoaded(true)
      })()
    }
  }, [appId])

  return {
    VSLWebGl: () =>
      url ? <iframe title="VSLWebGl" id="VSLWebGl" style={{ width: '100%', height: '100%' }} src={url} /> : null,
    translate: translate,
    isLoaded
  }
}

export default useVslWebGL
