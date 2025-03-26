<script setup>
import { useWebsiteStore } from "../../stores/userEmail.js";

definePageMeta({
  layout: "admin",
});

const Negm = useWebsiteStore();
console.log(Negm);
</script>

<template>
  <div>
    <h1>DashBoard</h1>
    <p>{{ Negm.name }}</p>
  </div>
</template>
