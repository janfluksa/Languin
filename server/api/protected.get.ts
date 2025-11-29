import loginRequired from "../utils/loginRequired"

export default defineEventHandler( async (event) => {
  
  await loginRequired(event)  

  const user = event.context.user  

  // Tvůj chráněný kód
  return { 
    message: 'Protected data', 
    userId: user.id,
    email: user.email 
  }
})