<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from "@nuxt/ui";


const toast = useToast();

interface User {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
}

const data = ref<User[]>([
  {
    id: 122,
    userName: "Nesma Hossam",
    email: "nesma4467@gmail.com",
    phoneNumber: "0123456789",
  },
  {
    id: 123,
    userName: "Moustafa Negm",
    email: "moustafa@gmail.com",
    phoneNumber: "0123456789",
  },
  {
    id: 124,
    userName: "Rahma Mandouh",
    email: "rahma@gmail.com",
    phoneNumber: "0123456789",
  },
  {
    id: 125,
    userName: "Mohamed Refaat",
    email: "mohamed@gmail.com",
    phoneNumber: "0123456789",
  },
]);

const columns: TableColumn<User>[] = [
  {
    accessorKey: "id",
    header: "#ID",

    cell: ({ row }) => `#${row.getValue("id")}`,
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
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },

  {
    header: "Action",

    id: "action",
  },
];

function getDropdownActions(user: User): DropdownMenuItem[][] {
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
</script>

<template>
  <div class="flex flex-col gap-8 w-full my-6 ">
    <div class="flex justify-between items-center">
      <div class="flex justify-between flex-col">
        <h2 class="text-primary text-2xl font-bold">Users Information</h2>
        <p>{{ data.length }} users</p>
      </div>

      <div>
        <UInput
          :model-value="table?.tableApi?.getColumn('email')?.getFilterValue() as string"
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
        <p class="text-sm text-gray-500">Showing 125-30 of 250</p>
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
