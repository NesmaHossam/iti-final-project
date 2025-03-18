<template>
    <div class=" bg-blue-700 text-white flex flex-col gap-12">
        <nuxt-link to="/admin" class="mb-12">
                    <img src="../../assets/images/Logo.png" alt="logo image" class="h-[80px]">
        </nuxt-link>
        <div class="second-nav flex gap-4 min-h-[100vh] flex-col items-center">
                    <nuxt-link to="/admin">Home</nuxt-link>
                    <nuxt-link to="/admin/Users">Users</nuxt-link>
                    <nuxt-link to="/admin/Tables">Tables</nuxt-link>
                    <nuxt-link to="/admin/Menu">Menu</nuxt-link>
        </div>
    </div>
</template>