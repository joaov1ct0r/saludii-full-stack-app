/* import Button from '@mui/material/Button' */

import { Link } from '@redwoodjs/router'

interface LinkButtonProps {
  title: string
  variant: 'text' | 'outlined' | 'contained'
  to: string
}

export default function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link {...rest}>
      {title}
      {/*
      <Button href="#text-buttons" {...rest}>
        {title}
      </Button>
    */}
    </Link>
  )
}
