import { createServer as httpServer } from 'node:http'

import { Server } from 'socket.io'

import { createServer } from '@redwoodjs/api-server'

import { logger } from 'src/lib/logger'

async function main() {
  const server = await createServer({
    logger,
  })

  const socketServer = httpServer()

  const io = new Server(socketServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: false,
    },
  })

  io.on('connection', (socket) => {
    console.log('new connection ' + socket.id)

    socket.on('new_task', ({ task }) => {
      console.log('new task added ' + task)
      io.emit('notification', JSON.stringify({ message: 'Tasks updated' }))
    })

    socket.on('close', () => {
      console.log('client disconnected')
    })
  })

  socketServer.listen(3000)

  await server.start()
}

main()
