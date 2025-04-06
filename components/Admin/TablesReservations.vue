<script setup lang="ts">
import { h, resolveComponent, ref } from "vue";
import type { TableColumn, DropdownMenuItem } from "@nuxt/ui";
import { useToast } from "#imports";

const UBadge = resolveComponent("UBadge");

const toast = useToast();

type Payment = {
  id: number;
  status: "pending" | "completed";
  Deposit: "NotPaid" | "Paid";
  date: string;
};

const data = ref<Payment[]>([
  {
    id: 125,
    status: "pending",
    Deposit: "NotPaid",
    date: "2024-03-11T15:30:00",
  },
  {
    id: 124,
    status: "completed",
    Deposit: "Paid",
    date: "2024-03-11T15:30:00",
  },
]);

const columns: TableColumn<Payment>[] = [
  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        completed: "success",
        pending: "error",
      }[row.getValue("status") as string];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("status")
      );
    },
  },
  {
    accessorKey: "Deposit",
    header: "Deposit",
    cell: ({ row }) => {
      const color = {
        Paid: "success",
        NotPaid: "error",
      }[row.getValue("Deposit") as string];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("Deposit")
      );
    },
  },
  {
    accessorKey: "date",
    header: "Reservation Time",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
  },
];

function getDropdownActions(payment: Payment): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Copy Payment ID",
        icon: "i-lucide-copy",
        onSelect: () => {
          navigator.clipboard.writeText(payment.id.toString());
          toast.add({
            title: "Payment ID copied to clipboard!",
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

const table = ref(null);
const globalFilter = ref("");
const page = ref(1);
</script>

<template>
  <div class="flex flex-col gap-8 w-full my-6">
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <h2 class="text-primary text-2xl font-bold">Tables Reservation</h2>
        <p>{{ data.length }} Reservation</p>
      </div>
      <div>
        <UInput
          v-model="globalFilter"
          icon="i-lucide-search"
          class="max-w-sm"
          size="md"
          variant="outline"
          placeholder="Search..."
        />
      </div>
    </div>

    <div>
      <UTable
        ref="table"
        v-model:global-filter="globalFilter"
        :data="data"
        :columns="columns"
        max-h="[312px]"
        sticky
        class="flex-1"
      >
        <template #actions-cell="{ row }">
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
        <p class="text-sm text-gray-500">
          Showing 1-{{ data.length }} of {{ data.length }}
        </p>
      </div>

      <div>
        <UPagination
          :default-page="page"
          :items-per-page="10"
          :total="data.length"
          @update:page="(p) => (page = p)"
        />
      </div>
    </div>
  </div>
</template>
