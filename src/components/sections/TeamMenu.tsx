// Components
import TeamCard from '../ui/TeamCard'

// Libs
import { clsx } from 'clsx'
import { useTranslations } from '../../i18n/utils'

// Hooks
import { useState } from 'react'

// Styles
import { titleClasses, getMenuLinksClasses } from '../../styles/classes'

// Props interface
interface TeamProps {
  lang: 'en' | 'es'
}

export default function Team({ lang }: TeamProps) {
  // Translations and data
  const t = useTranslations(lang)
  const teamKeys = ['omar', 'claudia', 'luis']
  const teamData = t('teamMenu.members')
  console.log('teamData', teamData)

  // States
  const [activeOption, setActiveOption] = useState('omar')

  return (
    <section
      className={clsx(
        'container',
        'team',
        'flex',
        'flex-col md:flex-row',
        'gap-8'
      )}
      id='team'
    >
      <div className={clsx('aside', 'w-full md:w-4/12 lg:w-1/4')}>
        {/* Page tile */}
        <h2 className={clsx(titleClasses)}>Our Team</h2>

        {/* Links */}
        <ul>
          {teamKeys.map((teamKey) => (
            <li key={teamKey}>
              <button
                onClick={() => {
                  setActiveOption(teamKey)
                }}
                className={getMenuLinksClasses(activeOption == teamKey)}
              >
                {teamData[teamKey].name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={clsx('content', 'w-full md:w-7/12 lg:w-3/4')}>
        {teamKeys.map((teamKey) => {
          const member = teamData[teamKey]
          return (
            <TeamCard
              id={teamKey}
              key={teamKey}
              name={member.name}
              bio={member.bio}
              className={activeOption != teamKey ? 'hidden' : ''}
            />
          )
        })}
      </div>
    </section>
  )
}
