'use client'

import TypeWriter from 'typewriter-effect'

const TypewriterTitle = () => {
  return (
    
    <TypeWriter options={{
        loop: true
    }}
    onInit={(typewriter) => {
        typewriter.typeString('Supercharged Productivity.').pauseFor(1000).deleteAll()
        .typeString('Ai-Powered Insights.')
        .start()
    }}/>
  )
}

export default TypewriterTitle