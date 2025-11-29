export default defineEventHandler(async (event) => {
  // Middleware už ověřilo uživatele a uložilo ho do contextu
  const user = event.context.user  // ← dostupné po auth middleware
  
  // Tvůj chráněný kód
  return { 
    message: 'Protected data', 
    userId: user.id,
    email: user.email 
  }
})