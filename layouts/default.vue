<script setup>

</script>

<template>
  <div class="bg-teal-700 ">
    <header class="bg-primary text-white px-4 py-2 flex justify-between items-center">
      <img src="~/assets/fs-logo.svg" class=" w-28" alt="">
      <div>
      </div>
    </header>

    <main class="p-4 bg-slate-100">
      <slot />
    </main>

    <footer class="bg-primary text-white text-center p-4">
      © {{ new Date().getFullYear() }} FinScope
    </footer>
  </div>
</template>

