<template>
  <div
    class="bg-slate-200/10 backdrop-blur-md shadow-lg overflow-hidden rounded-tl-[30%] rounded-br-[30%] border border-slate-100 p-6 pt-8"
  >
    <h2 class="text-primary text-2xl font-bold">Filter</h2>
    <div class="mt-6 flex flex-col gap-4">
      <div>
        <input id="all" type="checkbox" name="filter" />
        <label for="all" class="ms-4 text-lg text-primary">All</label>
      </div>
      <div>
        <input id="breakfast" type="checkbox" name="filter" />
        <label for="breakfast" class="ms-4 text-lg text-primary"
          >BreakFast</label
        >
      </div>

      <div>
        <input id="dinner" type="checkbox" name="filter" />
        <label for="dinner" class="ms-4 text-lg text-primary">Dinner</label>
      </div>
      <div>
        <input id="dessert" type="checkbox" name="filter" />
        <label for="dessert" class="ms-4 text-lg text-primary">Dessert</label>
      </div>
      <div>
        <input id="drinks" type="checkbox" name="filter" />
        <label for="drinks" class="ms-4 text-lg text-primary">Drinks</label>
      </div>
    </div>
  </div>
</template>
