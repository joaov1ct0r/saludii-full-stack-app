import { ReactNode } from 'react'

import Stack from '@mui/material/Stack'

interface StackButtonProps {
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  spacing: number
  children: ReactNode
}

export default function StackButton({ children, ...rest }: StackButtonProps) {
  return <Stack {...rest}>{children}</Stack>
}
