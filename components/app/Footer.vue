<template>
    <footer>
      <div class="bg-green-900 text-white text-center p-4 font-[inter] md:flex flex-col items-center hidden">
        <h2 class="lg:text-5xl md:text-3xl text-3xl mb-6 font-inter font-normal">Zaytona</h2>
        <div class="md:flex md:items-center lg:gap-6 gap-3 lg:mb-12 mb-6 font-playfair lg:text-2xl md:text-xl font-normal grid grid-cols-3 ">
            <nuxt-link to="/">Home</nuxt-link>
            <nuxt-link to="/user/AboutUs">Our Stroy</nuxt-link>
            <nuxt-link to="/user/ContactUs">Contact Us</nuxt-link>
            <nuxt-link to="/user/Events">Offers & Events</nuxt-link>
            <nuxt-link to="/user/Menu">Menu</nuxt-link>
            <nuxt-link to="/user/Tables/BookTable">Reservation</nuxt-link>
            <nuxt-link to="/user/Tables">Photos</nuxt-link>
        </div>
        <div class="md:flex md:items-center md:gap-20 lg:mb-8 mb-4 font-playfair lg:text-xl md:text-lg font-normal grid grid-col-2 gap-3">
            <p>Phone Number : <a href="tel:+201005066611">+20 100 506 6611</a></p>
            <a href="https://www.google.com" class=" underline underline-offset-5">Location Link</a>
            <p>Email : <a href="mailto:zaytona@gmail.com">zaytona@gmail.com</a></p>
        </div>
        <div class="flex gap-12 lg:mb-6 mb-3 font-playfair lg:text-xl md:text-lg font-normal">
            <p>Open daily from 08:00 AM to 12:00 Am</p>
            <nuxt-link to="/auth/login">Sign up to get notified with special offers and events.</nuxt-link>
        </div>
        <div class="social flex gap-8 lg:mb-8 mb-4">
            <Icon name="uil:facebook" class="text-white w-6 h-6 " />
            <Icon name="uil:instagram" class="text-white w-6 h-6 " />
            <Icon name="uil:music" class="text-white w-6 h-6 " />
        </div>
        <p class=" lg:text-xl md:text-lg">&copy; {{ new Date().getFullYear() }} Zaytona. All rights reserved.</p>
      </div>
      <div class="bg-green-900 text-white text-center p-4 font-inter block md:hidden">
        <h2 class="lg:text-5xl md:text-3xl text-3xl mb-6 font-inter font-normal">Zaytona</h2>
        <p class=" lg:text-xl md:text-lg">&copy; {{ new Date().getFullYear() }} Zaytona. All rights reserved.</p>
      </div>
    </footer>

</template>
