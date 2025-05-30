// Libs
import { clsx } from 'clsx'

// Styles
import { titleClasses } from '../../styles/classes'
import { marked } from 'marked'

// Props interface
interface Props {
  id: string
  name: string
  bio: string
  className?: string
}

export default function TeamCard({ id, name, bio, className = "" }: Props) {

  return (
    <article className={clsx('team-card', className)}>
      <h3 className={clsx('card-title', titleClasses, '!text-xl')}>{name}</h3>
      <div
        className='bio-text md-content'
        dangerouslySetInnerHTML={{ __html: marked(bio) }}
      />
      <img
        src={`/team/${id}.webp`}
        alt={`${name}'s photo`}
        className={clsx('w-full', "mx-auto md:mx-0", 'max-w-xl', 'my-6')}
        loading='lazy'
      />
    </article>
  )
}
