import React, { JSX } from "react"
import * as Icons from "@/assets/svgs"
import { KeyOfIcon } from "@/types/svg"

interface SvgIconProps extends Omit<React.SVGProps<SVGSVGElement>, "name"> {
  name: KeyOfIcon
  size?: number
  onClick?: () => void
}

const SvgIcon = ({
  name,
  width: _width,
  height: _height,
  size,
  onClick,
  ...props
}: SvgIconProps): JSX.Element => {
  // 타입 단언을 사용하여 name이 Icons의 유효한 키임을 명시
  const IconComponent = Icons[name as keyof typeof Icons]
  const width = _width ?? size
  const height = _height ?? size
  const sizeProps = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  }

  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-block",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <IconComponent {...props} {...sizeProps} />
    </span>
  )
}

export default SvgIcon
