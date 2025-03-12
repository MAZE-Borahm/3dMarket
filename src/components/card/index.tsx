import styles from "./Card.module.scss"
import { CardProps } from "@/components/card/types"
import CardHeader from "@/components/card/components/CardHeader"
import CardBody from "@/components/card/components/CardBody"
import CardFooter from "@/components/card/components/CardFooter"
import { CardContext } from "@/components/card/CardContext"

// Main Card component
const Card = ({ children, variant = "default", className = "", onClick, style }: CardProps) => {
  const getCardClasses = () => {
    const baseClass = styles.card

    switch (variant) {
      case "outlined":
        return `${baseClass} ${styles.outlined}`
      case "elevated":
        return `${baseClass} ${styles.elevated}`
      default:
        return baseClass
    }
  }

  return (
    <CardContext.Provider value={{ variant }}>
      <div className={`${getCardClasses()} ${className}`} onClick={onClick} style={style}>
        {children}
      </div>
    </CardContext.Provider>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
