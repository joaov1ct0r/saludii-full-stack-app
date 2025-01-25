import type { Prisma, Task } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: { description: 'String', status: false },
    },
    two: {
      data: { description: 'String', status: false },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
