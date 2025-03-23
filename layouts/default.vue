<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="min-h-[100vh] flex flex-col justify-between">
    <div>
      <AppHeader :class="scrollY > 120 ? 'bg-white text-slate-900' : 'bg-[#233866]'" />
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
