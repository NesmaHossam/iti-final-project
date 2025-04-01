<template>
    <div class="bg-slate-200/10 backdrop-blur-md shadow-lg  overflow-hidden rounded-tl-[30%] rounded-br-[30%] border border-slate-100 p-6 pt-8">
        <h2 class="text-primary text-2xl font-bold">Sorting</h2>
        <div class="mt-6 flex flex-col gap-4">
            <div class="mb-6">
                <h4 class="text-xl font-semibold mb-2 text-primary">Alphabetical</h4>
                <div>
                    <input id="alphaUP" type="radio" name="alpha">
                    <label for="alphaUP" class="ms-4 text-lg text-primary">A to Z</label>
                </div>
                <div>
                    <input id="alphaDown" type="radio" name="alpha">
                    <label for="alphaDown" class="ms-4 text-lg text-primary">Z to A</label>
                </div>
            </div>
            <div class="mb-6">
                <h4 class="text-xl font-semibold mb-2 text-primary">Pricing</h4>
                <div>
                    <input id="priceUP" type="radio" name="price">
                    <label for="priceUP" class="ms-4 text-lg text-primary">Lowest to Highest</label>
                </div>
                <div>
                    <input id="priceDown" type="radio" name="price">
                    <label for="priceDown" class="ms-4 text-lg text-primary"> Highest to Lowest</label>
                </div>
            </div>
        </div>
    </div>
</template>
