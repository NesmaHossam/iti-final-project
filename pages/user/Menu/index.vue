<script setup>
definePageMeta({
    name : "Menu"
})
</script>

<template>
    <div>
        <MenuHeader/>
        <UContainer>
            <div class="flex gap-8 mt-8">
            <div class="w-[30%] flex flex-col gap-6">
                <MenuFilter/>
                <MenuSort class="mb-8"/>
            </div>
            <div class="w-[70%]">
                <MenuSearch class="w-full mb-6"/>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/>
                </div>
            </div>
        </div>
        </UContainer>
    </div>
</template>