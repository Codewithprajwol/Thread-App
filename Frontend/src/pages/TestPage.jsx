import React from 'react'

const TestPage = ({user}) => {
    console.log(user)
    if(!user){
        return <div>loading...</div>
    }
  return (
    <div>TestPage</div>
  )
}

export default TestPage