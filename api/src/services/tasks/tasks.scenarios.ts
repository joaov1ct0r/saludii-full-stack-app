import type { Prisma, Task } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: { description: 'String', updatedAt: '2025-01-25T15:30:05.808Z' },
    },
    two: {
      data: { description: 'String', updatedAt: '2025-01-25T15:30:05.808Z' },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
