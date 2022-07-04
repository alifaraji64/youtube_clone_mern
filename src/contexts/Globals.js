import { createContext, useState } from 'react'
import { Web3Storage } from 'web3.storage'
export const globalContext = createContext()
function GlobalContext ({ children }) {
  const client = new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI5MTE4NzJjNzJDZjIyNkE0YTZEQ0RjMjM2NTRFMzBEREU3NGJlRTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTQwNzY1NzIxMzEsIm5hbWUiOiJmbHV0dGVyX3Rva2VuIn0.suwy6RUx-ce61ZYPnd_LV1JeHiVjfpTG4dIK06yJdZs'
  })
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [userId, setUserId] = useState('gggg')
  function showAlert ({ text, type }) {
    console.log(type)
    type == 'error' ? setIsError(true) : setIsSuccess(true)
    setAlertText(text)
    setTimeout(() => {
      type == 'error' ? setIsError(false) : setIsSuccess(false)
      setAlertText('')
    }, 2700)
  }
  return (
    <>
      {isError || isSuccess ? (
        <div
          className={`py-3 px-5 ${isError ? 'bg-red-100' : 'bg-green-300'} ${
            isError ? 'text-red-900' : 'text-green-800'
          } text-base rounded-md border border-red-200`}
          role='alert'
        >
          {alertText}
        </div>
      ) : (
        <span></span>
      )}
      <globalContext.Provider
        value={{
          showAlert,
          setAlertText,
          client,
          setUserId,
          userId
        }}
      >
        {children}
      </globalContext.Provider>
    </>
  )
}

export default GlobalContext
