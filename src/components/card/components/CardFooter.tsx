import { CardFooterProps } from "@/components/card/types"
import styles from "@/components/card/card.module.scss"

const CardFooter = ({ children, className = "", align = "right", style }: CardFooterProps) => {
  const getFooterClasses = () => {
    const baseClass = styles.footer

    switch (align) {
      case "left":
        return `${baseClass} ${styles.alignLeft}`
      case "center":
        return `${baseClass} ${styles.alignCenter}`
      case "right":
        return `${baseClass} ${styles.alignRight}`
      case "stretch":
        return `${baseClass} ${styles.alignStretch}`
      default:
        return `${baseClass} ${styles.alignRight}`
    }
  }

  return (
    <div className={`${getFooterClasses()} ${className}`} style={style}>
      {children}
    </div>
  )
}
export default CardFooter
