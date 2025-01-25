import type { FindTaskById, FindTaskByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Task from 'src/components/Task/Task'

export const QUERY: TypedDocumentNode<FindTaskById, FindTaskByIdVariables> =
  gql`
    query FindTaskById($id: Int!) {
      task: task(id: $id) {
        id
        description
        status
        createdAt
        updatedAt
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Task not found</div>

export const Failure = ({ error }: CellFailureProps<FindTaskByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  task,
}: CellSuccessProps<FindTaskById, FindTaskByIdVariables>) => {
  return <Task task={task} />
}
