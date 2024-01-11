import { LogoSVG } from '@/assets'

const SimpleNavbar = () => {
  return (
    <div className={"flex flex-row h-14 w-full bg-[var(--foreground)] items-center sticky top-0 z-20"}>
      <a href='https://www.linkedin.com/in/arghya-das-045702222/' className="leftbox mx-3 gap-2 flex flex-row">
        <LogoSVG />
        <p className='font-sans text-xl text-white text-nowrap'>Arghya's Network</p>
      </a>
    </div>
  )
}

export default SimpleNavbar