import React from 'react'

function SideNav({setTab}) {
  return (
    <aside className='sidenav p-5'>

        <p onClick={()=>{setTab(0)}}>VIEW USERS</p>
        <p onClick={()=>{setTab(1)}}>ADD USERS </p>
    </aside>
  )
}

export default SideNav