<template>
  <div :class="theme">
    <header class="bg-primary text-white px-4 py-2 flex justify-between items-center">
      <h1 class="text-xl font-bold">FinScope</h1>
      <div>
        <button
          class="p-button p-button-outlined mr-2"
          @click="toggleTheme"
        >
          {{ theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
        </button>
      </div>
    </header>

    <main class="p-4">
      <slot />
    </main>

    <footer class="bg-primary text-white text-center p-4">
      © {{ new Date().getFullYear() }} FinScope
    </footer>
  </div>
</template>

<script setup>
const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<style>
.light {
  @apply bg-white text-gray-900;
}

.dark {
  @apply bg-gray-900 text-gray-100;
}

.bg-primary {
  @apply bg-blue-600;
}
</style>