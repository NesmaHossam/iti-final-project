<script setup>
const toast = useToast();

const data = ref([]);

const columns = [
  {
    accessorKey: "_id",
    header: "#ID",
    cell: ({ row }) => `#${row.getValue("_id")}`,
  },
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumberRaw",
    header: "Phone Number",
  },
  {
    header: "Action",
    id: "action",
  },
];

function getDropdownActions(user) {
  return [
    [
      {
        label: "Copy user Id",
        icon: "i-lucide-copy",
        onSelect: () => {
          navigator.clipboard.writeText(user.id.toString());
          toast.add({
            title: "User ID copied to clipboard!",
            color: "success",
            icon: "i-lucide-circle-check",
          });
        },
      },
    ],
    [
      {
        label: "Edit",
        icon: "i-lucide-edit",
      },
      {
        label: "Delete",
        icon: "i-lucide-trash",
        color: "error",
      },
    ],
  ];
}

const table = useTemplateRef("table");
const page = ref();
const columnFilters = ref([
  {
    id: "email",
    value: "",
  },
]);

onMounted(async () => {
  try {
    const response = await useApi('/user/allProfiles', "get");
    console.log(response);
    
    if (response?.users) {
      data.value = response.users;
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    toast.add({
      title: "Failed to load users",
      description: error.message,
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
});
</script>

<template>
  <div class="flex flex-col gap-8 w-full my-8 mx-[20%] lg:mx-[10%]">
    <div class="flex justify-between items-center">
      <div class="flex justify-between flex-col">
        <h2 class="text-primary text-xl md:text-3xl font-bold">
          Users Information
        </h2>
        <p>{{ data.length }} users</p>
      </div>

      <div>
        <UInput
          :model-value="table?.tableApi?.getColumn('email')?.getFilterValue()"
          icon="i-lucide-search"
          class="max-w-sm"
          size="md"
          variant="outline"
          placeholder="Search..."
          @update:model-value="
            table?.tableApi?.getColumn('email')?.setFilterValue($event)
          "
        />
      </div>
    </div>

    <div>
      <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        :data="data"
        :columns="columns"
        max-h-[312px]
        sticky
        class="flex-1"
      >
        <template #action-cell="{ row }">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton
              icon="i-lucide-ellipsis-vertical"
              color="neutral"
              variant="ghost"
              aria-label="Actions"
            />
          </UDropdownMenu>
        </template>
      </UTable>
    </div>

    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm text-gray-500">Showing {{ data.length }} users</p>
      </div>

      <div>
        <UPagination
          :default-page="
            (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
          "
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </div>
  </div>
</template>