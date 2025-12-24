import { useRouter, useCookie } from '#imports'


export const apiGet = async <T>(url: string, query?: object): Promise<T | null> => {

const token = useCookie<string | null>('token')
const router = useRouter()

  try {
    return await $fetch<T>(url, {
      headers: { Authorization: token.value ? `Bearer ${token.value}` : '' },
      query: query ?? {}
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const status = e?.response?.status || e?.status
    console.error(`Fetch error (${status}):`, e)

     if (status === 401) {
        token.value = null
        await router.push('/login')
        alert('401 – Unauthorized: Prosím přihlaste se znovu.')
      } 
      else if (status === 403) {
        alert('403 – Forbidden: Nemáte přístup k tomuto zdroji.')
      } 
      else if (status >= 500) {
        alert('500 – Server error: Nastala chyba na serveru.')
      }
   
    return null
  }
}
