

export default defineEventHandler( async (event) => {
  
//   event.context.auth = { user: 123 }
  const user = event.context.auth.user  

  // Tvůj chráněný kód
  return { 
    message: 'Protected data', 
    user: user,
  }
})