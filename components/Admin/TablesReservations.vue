<script setup>
import { useToast } from "#imports";
const UBadge = resolveComponent("UBadge");
const toast = useToast();

// States for the component
const data = ref([]);
const loading = ref(true);
const table = ref(null);
const globalFilter = ref("");
const page = ref(1);
const selectedReservation = ref(null);
const showDetailsModal = ref(false);
const showConfirmModal = ref(false);
const actionType = ref(''); // 'confirm' or 'cancel'

// Fetch checkouts from API
async function fetchReservations() {
  loading.value = true;
  try {
    const response = await useApi('/admin/getCheckOut',"get")
    if (response.success) {
      data.value = response.results.map(reservation => ({
        id: reservation._id,
        status: reservation.status || 'pending',
        deposit: reservation.deposit || 'NotPaid',
        date: reservation.date ? `${reservation.date.year}-${reservation.date.month}-${reservation.date.day}T${reservation.time}:00` : new Date(),
        userName: reservation.createdBy?.userName || 'Guest',
        email: reservation.createdBy?.email || 'N/A',
        phone: reservation.createdBy?.phoneNumberRaw || 'N/A',
        fullDetails: reservation // Store the full reservation object
      }));
    }
  } catch (error) {
    console.error('Error fetching reservations:', error);
    toast.add({
      title: 'Failed to load reservations',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    });
  } finally {
    loading.value = false;
  }
}

// Call API to update reservation status
async function updateReservationStatus(reservationId, status) {
  try {
    const response = await fetch(`/api/admin/changeCheckOutStatus/${reservationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) throw new Error('Failed to update status');
    
    const result = await response.json();
    if (result.success) {
      toast.add({
        title: `Reservation ${status} successfully!`,
        color: 'success',
        icon: 'i-lucide-check-circle'
      });
      // Update local data to reflect the change
      const index = data.value.findIndex(item => item.id === reservationId);
      if (index !== -1) {
        data.value[index].status = status;
      }
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    toast.add({
      title: 'Failed to update reservation',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    });
  }
}

// Handle showing details modal
function showDetails(reservation) {
  selectedReservation.value = reservation.fullDetails;
  showDetailsModal.value = true;
}

// Handle showing confirmation modal
function showConfirmationModal(reservation, action) {
  selectedReservation.value = reservation;
  actionType.value = action;
  showConfirmModal.value = true;
}

// Handle confirmation
function handleConfirm() {
  const status = actionType.value === 'confirm' ? 'delivered' : 'canceled';
  updateReservationStatus(selectedReservation.value.id, status);
  showConfirmModal.value = false;
}

const columns = [
  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "userName",
    header: "Customer",
    cell: ({ row }) => row.getValue("userName"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      const color = {
        delivered: "success",
        preparing: "warning",
        pending: "info", 
        canceled: "error",
      }[statusValue] || "info";

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        statusValue
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

function getDropdownActions(reservation) {
  return [
    [
      {
        label: "View Details",
        icon: "i-lucide-eye",
        onSelect: () => showDetails(reservation),
      },
      {
        label: "Copy Reservation ID",
        icon: "i-lucide-copy",
        onSelect: () => {
          navigator.clipboard.writeText(reservation.id.toString());
          toast.add({
            title: "Reservation ID copied to clipboard!",
            color: "success",
            icon: "i-lucide-circle-check",
          });
        },
      },
    ],
    [
      {
        label: "Confirm Reservation",
        icon: "i-lucide-check-circle",
        color: "success",
        onSelect: () => showConfirmationModal(reservation, 'confirm'),
        disabled: reservation.status === "delivered" || reservation.status === "canceled",
      },
      {
        label: "Cancel Reservation",
        icon: "i-lucide-x-circle",
        color: "error",
        onSelect: () => showConfirmationModal(reservation, 'cancel'),
        disabled: reservation.status === "delivered" || reservation.status === "canceled",
      },
    ],
  ];
}

// Fetch data when component mounts
fetchReservations();
</script>

<template>
  <div class="flex flex-col gap-8 w-full my-8 mx-[20%] lg:mx-[10%]">
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <h2 class="text-primary text-xl md:text-3xl font-bold cursor-default">
          Tables Reservation
        </h2>
        <p class="cursor-default">{{ data.length }} Reservations</p>
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
        :loading="loading"
      >
        <template #actions-cell="{ row }">
          <div class="flex items-center gap-2">
            <UButton
              color="primary"
              variant="soft"
              size="xs"
              icon="i-lucide-eye"
              @click="showDetails(row.original)"
              label="View"
            />
            <UDropdownMenu :items="getDropdownActions(row.original)">
              <UButton
                icon="i-lucide-ellipsis-vertical"
                color="neutral"
                variant="ghost"
                aria-label="Actions"
              />
            </UDropdownMenu>
          </div>
        </template>
        
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6">
            <div class="i-lucide-calendar-x text-4xl text-gray-400 mb-2"></div>
            <p>No reservations found</p>
          </div>
        </template>
      </UTable>
    </div>

    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm text-gray-500 cursor-default">
          Showing {{ data.length > 0 ? 1 : 0 }}-{{ Math.min(data.length, page * 10) }} of {{ data.length }}
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

  <!-- Reservation Details Modal -->
  <UModal v-model="showDetailsModal" :ui="{ width: 'md:max-w-2xl' }">
    <UCard v-if="selectedReservation">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold">Reservation Details</h3>
          <UBadge 
            class="capitalize" 
            :color="selectedReservation.status === 'delivered' ? 'success' : 
                  selectedReservation.status === 'canceled' ? 'error' : 
                  selectedReservation.status === 'preparing' ? 'warning' : 'info'"
          >
            {{ selectedReservation.status || 'pending' }}
          </UBadge>
        </div>
      </template>
      
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-medium text-gray-500">Customer Information</h4>
            <div class="mt-2 space-y-2">
              <p><span class="font-medium">Name:</span> {{ selectedReservation.fullDetails?.createdBy?.userName || 'N/A' }}</p>
              <p><span class="font-medium">Email:</span> {{ selectedReservation.fullDetails?.createdBy?.email || 'N/A' }}</p>
              <p><span class="font-medium">Phone:</span> {{ selectedReservation.fullDetails?.createdBy?.phoneNumberRaw || 'N/A' }}</p>
            </div>
          </div>
          
          <div>
            <h4 class="font-medium text-gray-500">Reservation Details</h4>
            <div class="mt-2 space-y-2">
              <p><span class="font-medium">Date:</span> {{ selectedReservation.fullDetails?.date ? 
                `${selectedReservation.fullDetails.date.day}/${selectedReservation.fullDetails.date.month}/${selectedReservation.fullDetails.date.year}` : 'N/A' }}</p>
              <p><span class="font-medium">Time:</span> {{ selectedReservation.fullDetails?.time || 'N/A' }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="selectedReservation.fullDetails?.notes">
          <h4 class="font-medium text-gray-500">Additional Notes</h4>
          <p class="mt-2 p-3 bg-gray-50 rounded-md">{{ selectedReservation.fullDetails.notes }}</p>
        </div>
      </div>
      
      <template #footer>
        <div class="flex justify-between">
          <UButton 
            color="primary" 
            variant="outline" 
            @click="showDetailsModal = false"
          >
            Close
          </UButton>
          
          <div class="flex gap-2">
            <UButton 
              v-if="selectedReservation.status !== 'delivered' && selectedReservation.status !== 'canceled'"
              color="success" 
              @click="showConfirmationModal(selectedReservation, 'confirm')"
              icon="i-lucide-check"
            >
              Confirm Reservation
            </UButton>
            <UButton 
              v-if="selectedReservation.status !== 'delivered' && selectedReservation.status !== 'canceled'"
              color="error" 
              @click="showConfirmationModal(selectedReservation, 'cancel')"
              icon="i-lucide-x"
            >
              Cancel Reservation
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </UModal>

  <!-- Confirmation Modal -->
  <UModal v-model="showConfirmModal">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">
          {{ actionType === 'confirm' ? 'Confirm Reservation' : 'Cancel Reservation' }}
        </h3>
      </template>
      
      <p>Are you sure you want to {{ actionType === 'confirm' ? 'confirm' : 'cancel' }} this reservation?</p>
      <p class="text-sm text-gray-500 mt-2">
        This will notify the customer via WhatsApp and email.
      </p>
      
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            color="gray"
            variant="outline"
            @click="showConfirmModal = false"
          >
            Cancel
          </UButton>
          <UButton
            :color="actionType === 'confirm' ? 'success' : 'error'"
            @click="handleConfirm"
          >
            {{ actionType === 'confirm' ? 'Confirm' : 'Cancel Reservation' }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>