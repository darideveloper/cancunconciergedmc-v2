import { clsx } from 'clsx'

export const titleClasses = clsx(
  'text-3xl',
  'font-bold',
  'text-black',
  'font-title',
  'tracking-wide',
  'leading-tight',
  'my-6',
  'text-center md:text-left'
)

export const getMenuLinksClasses = (active: boolean): string => {
  return clsx(
    'py-1',
    'duration-300',
    'text-center md:text-left',
    'w-full',
    'opacity-70',
    active ? 'text-blue' : 'text-black',
    active ? 'pl-2' : 'pl-0',
    active ? 'cursor-default' : 'cursor-pointer',
    !active && 'hover:pl-2',
    'inline-block',
  )
}