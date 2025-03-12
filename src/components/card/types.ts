import { ReactNode } from "react"

// Type definitions
export type CardProps = {
  children: ReactNode
  variant?: "default" | "outlined" | "elevated"
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export type CardHeaderProps = {
  children?: ReactNode
  title?: string
  subtitle?: string
  className?: string
  rightAction?: ReactNode
  style?: React.CSSProperties
}

export type CardBodyProps = {
  children: ReactNode
  className?: string
  noPadding?: boolean
  style?: React.CSSProperties
}

export type CardFooterProps = {
  children?: ReactNode
  className?: string
  align?: "left" | "center" | "right" | "stretch"
  style?: React.CSSProperties
}
