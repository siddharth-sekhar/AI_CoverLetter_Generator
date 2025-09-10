import React from 'react'

export default function AuthenticationPage(){
  return (
    <div style={{padding:20, maxWidth:700, margin:'40px auto', background:'#111', color:'#fff', borderRadius:8}}>
      <h2 style={{marginTop:0}}>Sign In</h2>
      <p>This is a placeholder sign-in page. Clerk or your auth UI can be mounted here.</p>
      <p>If you need the real sign-in flow, I can wire Clerk or your chosen provider next.</p>
    </div>
  )
}
