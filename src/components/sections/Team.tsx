// Components
import TeamCard from '../ui/TeamCard'

// Libs
import { clsx } from 'clsx'

// Hooks
import { useState } from 'react'

// Styles
import { titleClasses } from '../../styles/classes'

// Props interface
interface TeamProps {}

export default function Team({}: TeamProps) {
  const [activeOption, setActiveOption] = useState('omar')

  const data = [
    {
      key: 'omar',
      name: 'Omar Guzman, General Manager',
      bio: "Born in the picturesque city of Orizaba, Mexico, Omar Guzman brings over two decades of luxury hospitality expertise to his role as General Manager. Omar's educational foundation in the industry was laid at UDLAP University in Mexico, where he earned a Bachelor's degree in Tourism Management followed by a Postgraduate Certificate in Executive Management.;Omar's journey in luxury hospitality began in 1998 when he first moved to Cancun, a hub of premier tourist experiences. His career flourished with The Ritz-Carlton Hotels, where he dedicated 20 years, honing his skills and leadership across various prestigious locations in Mexico, the Caribbean, and the USA. His deep-rooted passion for luxury service is evident in his extensive training with all luxury hotel brand services.;Known for his unwavering commitment and meticulous attention to detail, Omar excels in anticipating the needs of his clients and going above and beyond to craft unforgettable experiences. His leadership is guided by a focus on excellence and a personal touch in every aspect of hospitality management.;Outside of his professional life, Omar is a devoted family man, married with two wonderful children. He enjoys playing the guitar and relishes his morning walks, which provide him with a cherished opportunity to connect with God and nature. He is fluent in Spanish, English, and Italian, which enables him to connect with a diverse clientele and enhance their experience with personalized communication.;Omar continues to set the standard for exceptional service, making every stay memorable with his unique blend of expertise, passion, and dedication.",
    },
    {
      key: 'claudia',
      name: 'Claudia Rueda, Operations Manager',
      bio: "Born in the picturesque city of Orizaba, Mexico, Omar Guzman brings over two decades of luxury hospitality expertise to his role as General Manager. Omar's educational foundation in the industry was laid at UDLAP University in Mexico, where he earned a Bachelor's degree in Tourism Management followed by a Postgraduate Certificate in Executive Management.;Omar's journey in luxury hospitality began in 1998 when he first moved to Cancun, a hub of premier tourist experiences. His career flourished with The Ritz-Carlton Hotels, where he dedicated 20 years, honing his skills and leadership across various prestigious locations in Mexico, the Caribbean, and the USA. His deep-rooted passion for luxury service is evident in his extensive training with all luxury hotel brand services.;Known for his unwavering commitment and meticulous attention to detail, Omar excels in anticipating the needs of his clients and going above and beyond to craft unforgettable experiences. His leadership is guided by a focus on excellence and a personal touch in every aspect of hospitality management.;Outside of his professional life, Omar is a devoted family man, married with two wonderful children. He enjoys playing the guitar and relishes his morning walks, which provide him with a cherished opportunity to connect with God and nature. He is fluent in Spanish, English, and Italian, which enables him to connect with a diverse clientele and enhance their experience with personalized communication.;Omar continues to set the standard for exceptional service, making every stay memorable with his unique blend of expertise, passion, and dedication.",
    },
    {
      key: 'luis',
      name: 'Luis Canché, Operations Coordinator',
      bio: "Born in the picturesque city of Orizaba, Mexico, Omar Guzman brings over two decades of luxury hospitality expertise to his role as General Manager. Omar's educational foundation in the industry was laid at UDLAP University in Mexico, where he earned a Bachelor's degree in Tourism Management followed by a Postgraduate Certificate in Executive Management.;Omar's journey in luxury hospitality began in 1998 when he first moved to Cancun, a hub of premier tourist experiences. His career flourished with The Ritz-Carlton Hotels, where he dedicated 20 years, honing his skills and leadership across various prestigious locations in Mexico, the Caribbean, and the USA. His deep-rooted passion for luxury service is evident in his extensive training with all luxury hotel brand services.;Known for his unwavering commitment and meticulous attention to detail, Omar excels in anticipating the needs of his clients and going above and beyond to craft unforgettable experiences. His leadership is guided by a focus on excellence and a personal touch in every aspect of hospitality management.;Outside of his professional life, Omar is a devoted family man, married with two wonderful children. He enjoys playing the guitar and relishes his morning walks, which provide him with a cherished opportunity to connect with God and nature. He is fluent in Spanish, English, and Italian, which enables him to connect with a diverse clientele and enhance their experience with personalized communication.;Omar continues to set the standard for exceptional service, making every stay memorable with his unique blend of expertise, passion, and dedication.",
    },
  ]

  const dataTitles = data.map((item) => item.name)
  console.log(dataTitles, data)

  return (
    <section
      className={clsx('container', 'team', 'flex', 'flex-col md:flex-row', 'gap-8')}
      id='team'
    >
      <div className={clsx('aside', 'w-full md:w-4/12 lg:w-1/4')}>
        {/* Page tile */}
        <h2 className={clsx(titleClasses)}>Our Team</h2>

        {/* Links */}
        <ul>
          {data.map((member) => (
            <li key={member.key}>
              <button
                onClick={() => {
                  setActiveOption(member.key)
                }}
                className={clsx(
                  'py-1',
                  'duration-300',
                  'text-center md:text-left',
                  'w-full',
                  'opacity-70',
                  activeOption == member.key ? 'text-blue' : 'text-black',
                  activeOption == member.key ? 'pl-2' : 'pl-0',
                  activeOption == member.key
                    ? 'cursor-default'
                    : 'cursor-pointer'
                )}
              >
                {member.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={clsx('content', 'w-full md:w-7/12 lg:w-3/4')}>
        {data.map((member) => (
          <TeamCard
            id={member.key}
            key={member.key}
            name={member.name}
            bio={member.bio}
            className={activeOption != member.key ? 'hidden' : ''}
          />
        ))}
      </div>
    </section>
  )
}
