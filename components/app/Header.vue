<script setup>
const auth = useAuth();
</script>

<template>
    <header>
        <div class="flex justify-between items-start p-6 bg-slate-300  text-playfair text-xl">
            <div class="first">
                <div class="first-nav flex gap-4 mb-6">
                    <nuxt-link to="/user/ContactUs" class=' underline underline-offset-4'>Our location</nuxt-link>
                    <p class=" cursor-default">Open Daily: 8 AM - 12 AM</p>
                    <a href="tel:+20 0100 506 6611">phone No.: +20 0100 506 6611</a>
                </div>
                <div class="second-nav flex gap-4">
                    <nuxt-link to="/">Home</nuxt-link>
                    <nuxt-link to="/user/AboutUs">Our Stroy</nuxt-link>
                    <nuxt-link to="/user/Events">Offers & Events</nuxt-link>
                </div>
            </div>
            <div class="logo grow-1 flex justify-center cursor-default">
                <nuxt-link to="/">
                    <img src="../../assets/images/Logo.png" alt="logo image" class="h-[80px]">
                </nuxt-link>
            </div>
            <div class="last">
                <div class="first-nav flex gap-4 grow-1 mb-6 justify-end">
                    <a href="mailto:zaytona@gmail.com">zaytona@gmail.com</a>
                    <appAuthChecker>
                        <template #auth>
                            <nuxt-link to="/auth/Login" class='underline underline-offset-4' @click="auth.logout">Log Out</nuxt-link>
                        </template>
                        <template #unAuth>
                            <nuxt-link to="/auth/Login" class=' underline underline-offset-4'>Login</nuxt-link>
                        </template>
                    </appAuthChecker>
                </div>
                <div class="second-nav flex gap-4 ">
                    <nuxt-link to="/user/ContactUs">Contact Us</nuxt-link>
                    <nuxt-link to="/user/Menu">Menu</nuxt-link>
                    <nuxt-link to="/user/Tables/BookTable">Reservation</nuxt-link>
                    <nuxt-link to="/user/Tables">Photos</nuxt-link>
                </div>
            </div>
        </div>
    </header>
</template>
