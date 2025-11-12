// Components
import TeamCard from '../ui/TeamCard'

// Libs
import { clsx } from 'clsx'
import { useTranslations } from '../../i18n/utils'
import { marked } from 'marked'

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
  const teamKeys = ['omar', 'claudia', 'luis', 'monica', 'miriam']
  const teamData = t('teamMenu.members')

  // States
  const [activeOption, setActiveOption] = useState('omar')

  return (
    <section
      className={clsx('container')}
      id='team'
    >
      {/* Page title */}
      <h2 className={clsx(titleClasses)}>{t('teamMenu.title')}</h2>

      {/* Text */}
      <div dangerouslySetInnerHTML={{ __html: marked(t('teamMenu.text')) }} />

      <div
        className={clsx(
          'team-data',
          'flex',
          'flex-col md:flex-row',
          'gap-8',
          'mt-12'
        )}
      >
        <div className={clsx('aside', 'w-full md:w-4/12 lg:w-1/4')}>
          {/* Links */}
          <ul>
            {teamKeys.map((teamKey) => (
              <li key={teamKey}>
                <button
                  onClick={() => {
                    setActiveOption(teamKey)
                  }}
                  className={clsx(
                    getMenuLinksClasses(activeOption == teamKey),
                    'transition-all duration-300 ease-in-out'
                  )}
                >
                  {teamData[teamKey].name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={clsx('content', 'w-full md:w-7/12 lg:w-3/4', 'relative')}>
          {teamKeys.map((teamKey) => {
            const member = teamData[teamKey]
            return (
              <div
                key={teamKey}
                className={clsx(
                  'absolute inset-0',
                  'transition-all duration-500 ease-in-out',
                  activeOption === teamKey
                    ? 'opacity-100 visible translate-x-0'
                    : 'opacity-0 invisible translate-x-4 pointer-events-none'
                )}
              >
                <TeamCard
                  id={teamKey}
                  name={member.name}
                  bio={member.bio}
                />
              </div>
            )
          })}
          {/* Spacer to maintain layout height */}
          <div className="invisible">
            <TeamCard
              id={teamKeys[0]}
              name={teamData[teamKeys[0]].name}
              bio={teamData[teamKeys[0]].bio}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
