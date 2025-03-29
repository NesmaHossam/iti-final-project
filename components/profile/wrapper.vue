<template>
    <div class="flex gap-8">
          <USeparator color="primary" type="solid" orientation="vertical" class=" h-auto hidden md:block" />
          <div
        class="bg-slate-200/10 backdrop-blur-md shadow-lg p-6 lg:p-12 overflow-hidden relative  rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full ">
        <slot/>
      </div>
        </div>
</template>