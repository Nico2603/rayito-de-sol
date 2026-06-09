import logo from '../assets/images/logo_amarillo.webp'

interface LogoProps {
  className?: string
  variant?: 'default' | 'onDark'
}

const variantStyles = {
  default:
    'contrast-[1.14] saturate-[1.08] drop-shadow-[0_0_0.5px_rgb(30_58_95/0.7)] drop-shadow-[0_2px_5px_rgb(30_58_95/0.14)]',
  onDark:
    'contrast-[1.16] saturate-[1.12] brightness-[1.04] drop-shadow-[0_0_0.55px_rgb(255_255_255/0.65)] drop-shadow-[0_0_8px_rgb(255_255_255/0.22)] drop-shadow-[0_2px_6px_rgb(30_58_95/0.35)]',
}

export default function Logo({ className = 'h-9 w-auto', variant = 'default' }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Rayito de Sol"
      className={`${variantStyles[variant]} ${className}`}
      width={160}
      height={36}
      decoding="async"
    />
  )
}
