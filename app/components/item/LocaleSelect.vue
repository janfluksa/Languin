<script lang="ts" setup>

const modelValue = defineModel<string | null>()

interface SelectItem {
  value: string
  label: string
  dir: string
  icon: string
}

const locales = ref<SelectItem[]>([
  { "value": "sa", "label": "العربية (ar)", "dir": "rtl", "icon": "i-cif-sa" }, 
  { "value": "az", "label": "Azərbaycanca (az)",  "dir": "ltr", "icon": "i-cif-az" }, 
  { "value": "bg", "label": "Български (bg)", "dir": "ltr", "icon": "i-cif-bg" }, 
  { "value": "bd", "label": "বাংলা (bn)",  "dir": "ltr", "icon": "i-cif-bd" }, 
  { "value": "es", "label": "Català (ca)",  "dir": "ltr", "icon": "i-cif-es" }, 
  { "value": "un", "label": "کوردی (ckb)",  "dir": "rtl", "icon": "i-cif-un" }, 
  { "value": "cz", "label": "Čeština (cs)", "dir": "ltr", "icon": "i-cif-cz" }, 
  { "value": "dk", "label": "Danish (da)",  "dir": "ltr", "icon": "i-cif-dk" }, 
  { "value": "de", "label": "Deutsch (de)", "dir": "ltr", "icon": "i-cif-de" }, 
  { "value": "ch", "label": "Schweizerdeutsch (de-CH)", "dir": "ltr", "icon": "i-cif-ch" }, 
  { "value": "gr", "label": "Ελληνικά (el)",  "dir": "ltr", "icon": "i-cif-gr" }, 
  { "value": "gb", "label": "English (en)", "dir": "ltr", "icon": "i-cif-gb" }, 
  { "value": "es", "label": "Español (es)", "dir": "ltr", "icon": "i-cif-es" }, 
  { "value": "ee", "label": "Eesti (et)", "dir": "ltr", "icon": "i-cif-ee" }, 
  { "value": "ir", "label": "فارسی (fa-IR)",  "dir": "rtl", "icon": "i-cif-ir" }, 
  { "value": "fi", "label": "Suomeksi (fi)",  "dir": "ltr", "icon": "i-cif-fi" }, 
  { "value": "fr", "label": "Français (fr)",  "dir": "ltr", "icon": "i-cif-fr" }, 
  { "value": "es", "label": "Galego (gl)",  "dir": "ltr", "icon": "i-cif-es" }, 
  { "value": "il", "label": "Hebrew (he)",  "dir": "rtl", "icon": "i-cif-il" }, 
  { "value": "in", "label": "Hindi (hi)", "dir": "ltr", "icon": "i-cif-in" }, 
  { "value": "hr", "label": "Hrvatski (hr)",  "dir": "ltr", "icon": "i-cif-hr" }, 
  { "value": "hu", "label": "Magyar (hu)",  "dir": "ltr", "icon": "i-cif-hu" }, 
  { "value": "am", "label": "Հայերեն (hy)", "dir": "ltr", "icon": "i-cif-am" }, 
  { "value": "id", "label": "Bahasa Indonesia (id)",  "dir": "ltr", "icon": "i-cif-id" }, 
  { "value": "it", "label": "Italiano (it)",  "dir": "ltr", "icon": "i-cif-it" }, 
  { "value": "jp", "label": "日本語 (ja)",  "dir": "ltr", "icon": "i-cif-jp" }, 
  { "value": "ge", "label": "ქართული (ka)", "dir": "ltr", "icon": "i-cif-ge" }, 
  { "value": "kz", "label": "Қазақша (kk)", "dir": "ltr", "icon": "i-cif-kz" }, 
  { "value": "kh", "label": "ភាសាខ្មែរ (km)", "dir": "ltr", "icon": "i-cif-kh" }, 
  { "value": "kr", "label": "한국어 (ko)",  "dir": "ltr", "icon": "i-cif-kr" }, 
  { "value": "kg", "label": "Кыргызча (ky)",  "dir": "ltr", "icon": "i-cif-kg" }, 
  { "value": "lu", "label": "Lëtzebuergesch (lb)",  "dir": "ltr", "icon": "i-cif-lu" }, 
  { "value": "lt", "label": "Lietuvių (lt)",  "dir": "ltr", "icon": "i-cif-lt" }, 
  { "value": "mn", "label": "Монгол (mn)",  "dir": "ltr", "icon": "i-cif-mn" }, 
  { "value": "my", "label": "Melayu (ms)",  "dir": "ltr", "icon": "i-cif-my" }, 
  { "value": "no", "label": "Norsk Bokmål (nb-NO)", "dir": "ltr", "icon": "i-cif-no" }, 
  { "value": "nl", "label": "Nederlands (nl)",  "dir": "ltr", "icon": "i-cif-nl" }, 
  { "value": "pl", "label": "Polski (pl)",  "dir": "ltr", "icon": "i-cif-pl" }, 
  { "value": "pt", "label": "Português (pt)", "dir": "ltr", "icon": "i-cif-pt" }, 
  { "value": "br", "label": "Português - Brasil (pt-BR)", "dir": "ltr", "icon": "i-cif-br" }, 
  { "value": "ro", "label": "Română (ro)",  "dir": "ltr", "icon": "i-cif-ro" }, 
  { "value": "ru", "label": "Русский (ru)", "dir": "ltr", "icon": "i-cif-ru" }, 
  { "value": "sk", "label": "Slovenčina (sk)",  "dir": "ltr", "icon": "i-cif-sk" }, 
  { "value": "si", "label": "Slovenščina (sl)", "dir": "ltr", "icon": "i-cif-si" }, 
  { "value": "al", "label": "Shqip (sq)", "dir": "ltr", "icon": "i-cif-al" }, 
  { "value": "se", "label": "Svenska (sv)", "dir": "ltr", "icon": "i-cif-se" }, 
  { "value": "th", "label": "ไทย (th)", "dir": "ltr", "icon": "i-cif-th" }, 
  { "value": "tj", "label": "Тоҷикӣ (tj)",  "dir": "ltr", "icon": "i-cif-tj" }, 
  { "value": "tr", "label": "Türkçe (tr)",  "dir": "ltr", "icon": "i-cif-tr" }, 
  { "value": "cn", "label": "ئۇيغۇرچە (ug-CN)", "dir": "rtl", "icon": "i-cif-cn" }, 
  { "value": "ua", "label": "Українська (uk)",  "dir": "ltr", "icon": "i-cif-ua" }, 
  { "value": "pk", "label": "Urdu (ur)",  "dir": "rtl", "icon": "i-cif-pk" }, 
  { "value": "uz", "label": "Oʻzbek (uz)",  "dir": "ltr", "icon": "i-cif-uz" }, 
  { "value": "vn", "label": "Tiếng Việt (vi)",  "dir": "ltr", "icon": "i-cif-vn" }, 
  { "value": "cn", "label": "简体中文 (zh-CN)", "dir": "ltr", "icon": "i-cif-cn" }, 
  { "value": "tw", "label": "繁體中文 (zh-TW)", "dir": "ltr", "icon": "i-cif-tw" }
])

const selected = ref<SelectItem | undefined>(undefined)

const onChange = () => {
  modelValue.value = selected.value?.value
}
</script>

<template>

<USelectMenu
    v-model="selected"
    :icon="selected?.icon"
    :search-input="{
      placeholder: 'Filter...',
      icon: 'i-lucide-search'
    }"
    :items="locales"
    placeholder="Select locale"
    variant="soft"
    size="lg"
    label="Email"
    @change="onChange"
  />


</template>