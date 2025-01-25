import type { FindTasks, FindTasksVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Tasks from 'src/components/Task/Tasks'

export const QUERY: TypedDocumentNode<FindTasks, FindTasksVariables> = gql`
  query FindTasks {
    tasks {
      id
      description
      status
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No tasks yet.{' '}
      <Link to={routes.newTask()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindTasks>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  tasks,
}: CellSuccessProps<FindTasks, FindTasksVariables>) => {
  return <Tasks tasks={tasks} />
}
