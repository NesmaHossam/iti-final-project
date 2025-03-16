<script setup>

const token = useCookie("token");
</script>

<template >
<div v-if="!token">
    <slot name="unAuth"></slot>
</div>
<div v-else>
    <slot name="auth"></slot>
</div>
</template>