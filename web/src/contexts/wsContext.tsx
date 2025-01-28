import { useCallback, useContext, useEffect, useRef } from 'react'

import { io, Socket } from 'socket.io-client'

import { toast } from '@redwoodjs/web/toast'

interface WsContextProps {
  sendTask: (task: string) => void
}

const WsContext = React.createContext<WsContextProps | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

const WsContextProvider: React.FC<Props> = ({ children }) => {
  const ws = useRef<Socket>()

  useEffect(() => {
    const socket = io('http://localhost:3000/ws')

    socket.on('notification', () => {
      toast.success('Tasks updated')
    })

    socket.on('close', () => {
      console.log('socket close')
    })

    socket.on('error', () => {
      console.log('socket error')
    })

    ws.current = socket

    return () => {
      socket.close()
    }
  }, [])

  const sendTask = useCallback((task: string) => {
    ws.current?.emit('new_task', JSON.stringify({ task }))
  }, [])

  return (
    <WsContext.Provider value={{ sendTask }}>{children}</WsContext.Provider>
  )
}

export function useWsContext() {
  const context = useContext(WsContext)

  if (!context) {
    throw new Error('useWsContext must be used within a WsContextProvider')
  }

  return context
}

export default WsContextProvider
