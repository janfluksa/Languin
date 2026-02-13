export function useHistoryModal() {
  const open = ref(false)

  function openModal() {
    open.value = true
    history.pushState({ modal: true }, '')
  }

  function closeModal() {
    if (open.value) {
      open.value = false
      history.back()
    }
  }

  onMounted(() => {
    window.addEventListener('popstate', () => {
      open.value = false
    })
  })

  return { open, openModal, closeModal }
}