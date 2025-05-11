// Libs
import { clsx } from 'clsx'

// Styles
import { titleClasses } from '../../styles/classes'

// Props interface
interface Props {
  id: string
  name: string
  bio: string
  className?: string
}

export default function TeamCard({ id, name, bio, className = "" }: Props) {
  // Split the bio into multiple texts
  const texts = bio.split(';')

  return (
    <article className={clsx('team-card', className)}>
      <h3 className={clsx('card-title', titleClasses, '!text-xl')}>{name}</h3>
      {texts.map((text, index) => (
        <p
          key={index}
          className='bio-text'
        >
          {text}
        </p>
      ))}
      <img
        src={`/team/${id}.webp`}
        alt={`${name}'s photo`}
        className={clsx('w-full', "mx-auto md:mx-0", 'max-w-xl', 'my-6')}
        loading='lazy'
      />
    </article>
  )
}
