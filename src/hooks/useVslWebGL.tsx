import { useCallback, useEffect, useState } from 'react'
import { useUnityContext, Unity } from 'react-unity-webgl'

const fetchFunction = async (API_KEY: string, text: string) => {
  const response = await fetch('https://dev-api.vsllabs.com/api/v2/models/clerc/0', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify({
      user_input: text,
      settings_nlp: {
        synonyms: false,
        details: false,
        ner: false,
        numbers: false,
        nmm: false,
        emotions: false,
        translation_model: {
          model_type: 'SEQ2SEQ',
          model_id: ''
        }
      },
      settings_anim: { character: 'terra', platform: 'webgl' },
      settings_2d: {
        output_settings: {
          data_gzip: false,
          data_raw: false,
          data_stream: false
        }
      },
      settings_3d: {
        output_settings: {
          bvh: false,
          data_gzip: false,
          data_raw: false,
          data_stream: false,
          video_3d: false,
          web_glb: false
        }
      }
    })
  })

  return await response.json()
}

type useVslWebGLProps = {
  API_KEY: string
  loaderUrl: string
  dataUrl: string
  frameworkUrl: string
  codeUrl: string
}

function handleCacheControl(url: string) {
  if (url.endsWith('.loader.js') || url.endsWith('.framework.js.br')) {
    return 'no-store'
  }
  return 'must-revalidate'
}

const useVslWebGL = ({ API_KEY, loaderUrl, dataUrl, frameworkUrl, codeUrl }: useVslWebGLProps) => {
  const [translatedText, setTranslatedText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [error, setError] = useState('')

  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
    loaderUrl,
    dataUrl,
    frameworkUrl,
    codeUrl,
    cacheControl: handleCacheControl
  })

  const translateTextToASL = useCallback(
    async (text: string) => {
      if (isLoaded && isApproved && text) {
        try {
          setIsTranslating(true)
          const data = await fetchFunction(API_KEY, text)
          setTranslatedText(data?.NLP?.unity_3d_input || '')
          setIsTranslating(false)
          setError('')
        } catch (_err) {
          setError('Invalid API Key!')
          console.error('Invalid API Key!')
        }
      }
    },
    [isLoaded, API_KEY, isApproved]
  )

  const replay = useCallback(() => {
    if (translatedText) {
      sendMessage('Gabi', 'GetWordsFromUser', translatedText)
    }
  }, [translatedText])

  const changeBgColor = useCallback((color: string) => {
    if (color) {
      sendMessage('BGcontroller', 'ChangeColorFromUserInput', color)
    }
  }, [])

  const toggleCameraRotation = useCallback((isEnabled: boolean) => {
    sendMessage('Main Camera', 'ToggleRotationFromStringInput', isEnabled ? 'true' : 'false')
  }, [])

  const setAnimationSpeed = useCallback((speed: string) => {
    sendMessage('speedController', 'SetSpeedFromUserInput', speed)
  }, [])

  useEffect(() => {
    if (API_KEY) {
      ;(async () => {
        try {
          await fetchFunction(API_KEY, 'test')
          setIsApproved(true)
        } catch (_err) {
          setError('Invalid API Key!')
          console.error('Invalid API Key!')
        }
      })()
    } else {
      setError('Missing API_KEY!')
      console.error('Missing API_KEY!')
    }
  }, [API_KEY])

  useEffect(() => {
    if (translatedText) {
      sendMessage('Gabi', 'GetWordsFromUser', translatedText)
    }
  }, [translatedText])

  return {
    VSLWebGl: Unity,
    translateTextToASL,
    isUnityLoaded: isLoaded,
    isTranslating,
    unityProvider,
    replay,
    error,
    changeBgColor,
    toggleCameraRotation,
    setAnimationSpeed
  }
}
export default useVslWebGL
