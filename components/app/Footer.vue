<!-- <template>
    <footer>
      <div class="bg-[#233866] text-white text-center p-4 font-[inter] md:flex flex-col items-center hidden">
        <nuxt-link to="/" class="lg:text-5xl md:text-3xl text-3xl mb-6 font-inter font-normal">Zaytona</nuxt-link>
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
            <a href="https://www.google.com/maps/place/Information+Technology+Institute,Ismailia/@30.6087768,32.2494795,14z/data=!4m10!1m2!2m1!1siti+ismailia!3m6!1s0x14f8597f2f81ea4b:0xbb2533d2df13bd74!8m2!3d30.620847!4d32.2704842!15sCgxpdGkgaXNtYWlsaWGSARJyZXNlYXJjaF9pbnN0aXR1dGXgAQA!16s%2Fg%2F11c1w0d6ms?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D" class=" underline underline-offset-5">Location Link</a>
            <p class=" cursor-default">Email : <a href="mailto:zaytona@gmail.com">zaytona@gmail.com</a></p>
        </div>
        <div class="flex gap-12 lg:mb-6 mb-3 font-playfair lg:text-xl md:text-lg font-normal">
            <p class=" cursor-default">Open daily from 08:00 AM to 12:00 Am</p>
            <nuxt-link to="/auth/login">Sign up to get notified with special offers and events.</nuxt-link>
        </div>
        <div class="social flex gap-8 lg:mb-8 mb-4">
            <Icon name="uil:facebook" class="text-white w-6 h-6 " />
            <Icon name="uil:instagram" class="text-white w-6 h-6 " />
            <Icon name="uil:music" class="text-white w-6 h-6 " />
        </div>
        <p class=" lg:text-xl md:text-lg cursor-default">&copy; {{ new Date().getFullYear() }} Zaytona. All rights reserved.</p>
      </div>
      <div class="bg-[#233866] text-white text-center p-4 font-inter block md:hidden">
        <nuxt-link to="/" class="lg:text-5xl md:text-3xl text-3xl mb-6 font-inter font-normal">Zaytona</nuxt-link>
        <p class=" lg:text-xl md:text-lg">&copy; {{ new Date().getFullYear() }} Zaytona. All rights reserved.</p>
      </div>
    </footer>

</template> -->

<template>
  <div
    class="bg-primary text-white p-4 font-[inter] md:flex justify-around items-center gap-5 hidden"
  >
    <div>
      <div>
        <img
          src="../../assets/images/Logo.png"
          alt="footer image"
          class="w-[300px]"
        >
      </div>
    </div>
    <div class="flex gap-5 ">
      <div class="flex flex-col gap-3 ">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/user/Tables/BookTable">Reservation</nuxt-link>
        <nuxt-link to="/user/Menu">Menu</nuxt-link>
      </div>
      <div class="flex flex-col gap-3 ">
        <nuxt-link to="/user/AboutUs">Our Stroy</nuxt-link>
        <nuxt-link to="/user/ContactUs">Contact Us</nuxt-link>
      </div>
    </div>
    <div class="flex flex-col gap-3 items-center md:items-start">
      <p>Phone Number : <a href="tel:+201005066611">+20 100 506 6611</a></p>
      <p class="cursor-default">12 Nile Street, Zamalek, Cairo</p>

      <p class="cursor-default">Open daily from 08:00 AM to 12:00 Am</p>
    </div>
    <div class="social flex gap-3 flex-col items-center md:items-start">
      <div class="flex gap-3">
        <Icon name="uil:facebook" class="text-white w-6 h-6" />
        <p>Zaytona.eg</p>
      </div>
      <div class="flex gap-3 ">
        <Icon name="uil:instagram" class="text-white w-6 h-6" />
        <p>Zaytona.eg</p>
      </div>
      <div class="flex gap-3">
        <Icon name="uil:music" class="text-white w-6 h-6" />
        <p class="cursor-default">
          Email : <a href="mailto:zaytona@gmail.com">zaytona@cusine.com</a>
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-3 items-center">
      <div class="flex flex-col gap-3 text-center">
        <h2>Stay Updated!</h2>
        <h6 class="cursor-default ">Enter your email to receive exclusive offers</h6>
      </div>
      <div class="flex flex-col gap-3">
        <UInput
          placeholder="Email"
          class="w-full bg-[#FFFFFF] text-[#233866] border-[#233866] rounded-lg "
        >
          <template #leading>
            <UIcon
              name="i-heroicons-envelope"
              class="w-5 h-5 text-[#233866] rounded-2xl"
            />
          </template>
        </UInput>
        <UButton
          type="submit"
          class="duration-300 bg-[#FFFFFF] text-[#080D18] cursor-pointer text-lg rounded-2xl "
          block
        >
Subscribe        </UButton>
      </div>
    </div>
  </div>
  <div class="bg-primary text-white text-center p-4 font-inter  md:hidden flex gap-4 justify-center items-center">
        <nuxt-link to="/" class="lg:text-5xl md:text-3xl text-3xl  font-inter font-normal"><img src="../../assets/images/LOGO.png" alt=""></nuxt-link>
        <p class=" lg:text-xl md:text-lg">&copy; {{ new Date().getFullYear() }} Zaytona. All rights reserved.</p>
      </div>
</template>
