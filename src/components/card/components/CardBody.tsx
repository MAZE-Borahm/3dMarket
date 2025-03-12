import { CardBodyProps } from "@/components/card/types"
import styles from "@/components/card/card.module.scss"

const CardBody = ({ children, className = "", noPadding = false, style }: CardBodyProps) => {
  const bodyClasses = noPadding
    ? `${styles.body} ${styles.noPadding} ${className}`
    : `${styles.body} ${className}`

  return (
    <div className={bodyClasses} style={style}>
      {children}
    </div>
  )
}

export default CardBody
