import { ref, watch, nextTick, onBeforeUnmount, type Ref } from 'vue'

/**
 * Animuje výšku kontejneru podle aktuální výšky obsahu.
 * Podporuje dynamický obsah + Vue <Transition mode="out-in">.
 */
export function useAnimatedHeight(
  open: Ref<boolean>,
  deps?: Ref<unknown> | Ref<unknown>[]
) {
  const wrapper = ref<HTMLElement | null>(null)
  const content = ref<HTMLElement | null>(null)
  const height = ref(0)

  let observer: ResizeObserver | null = null

  const updateHeight = () => {
    if (!content.value) return
    height.value = content.value.offsetHeight
  }

  const attachObserver = () => {
    if (!content.value) return

    observer?.disconnect()
    observer = new ResizeObserver(updateHeight)
    observer.observe(content.value)
  }

  /**
   * Reaguje na otevření / zavření (např. UModal)
   */
  watch(open, async (isOpen) => {
    if (!isOpen) {
      // height.value = 0
      observer?.disconnect()
      return
    }

    await nextTick()
    // updateHeight()
    attachObserver()
  })

  /**
   * Reaguje na změnu obsahu, který Vue znovu vytváří
   * (typicky <Transition mode="out-in">)
   */
  if (deps) {
    const depsArray = Array.isArray(deps) ? deps : [deps]

    depsArray.forEach(dep => {
      watch(dep, async () => {
        await nextTick()
        updateHeight()
        attachObserver()
      })
    })
  }

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return {
    wrapper,
    content,
    height
  }
}
