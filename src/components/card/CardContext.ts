import { createContext, useContext } from "react"

// Context for card styling
export type CardContextType = {
  variant?: "default" | "outlined" | "elevated"
}

export const CardContext = createContext<CardContextType>({
  variant: "default",
})

// 편의를 위한 훅 제공
export const useCardContext = () => useContext(CardContext)
