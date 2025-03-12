import { useCardContext } from "@/components/card/CardContext"
import { CardHeaderProps } from "@/components/card/types"
import styles from "@/components/card/card.module.scss"

// Card.Header component
const CardHeader = ({
  children,
  title,
  subtitle,
  className = "",
  rightAction,
  style,
}: CardHeaderProps) => {
  const { variant } = useCardContext()

  const getHeaderClasses = () => {
    const baseClass = styles.header

    switch (variant) {
      case "outlined":
        return `${baseClass} ${styles.outlinedHeader}`
      case "elevated":
        return `${baseClass} ${styles.elevatedHeader}`
      default:
        return baseClass
    }
  }

  return (
    <div className={`${getHeaderClasses()} ${className}`} style={style}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {children}
        </div>
        {rightAction && <div className={styles.headerRight}>{rightAction}</div>}
      </div>
    </div>
  )
}

export default CardHeader
