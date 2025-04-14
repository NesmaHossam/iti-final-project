<script setup>
const toast = useToast();
const deleteModalOpen = ref(false);
const changeRoleModalOpen = ref(false);
const selectedRole = ref("user");
const currentUserId = ref(null);
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
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Action",
    id: "action",
  },
];

const table = useTemplateRef("table");
const page = ref(1);
const itemsPerPage = ref(10);
const columnFilters = ref([
  {
    id: "email",
    value: "",
  },
]);

// Data fetching function
const fetchUsers = async () => {
  try {
    const response = await useApi("/admin/getUsers", "get");
    console.log("API Response:", response);
    selectedRole.value = "user";

    if (response?.results) {
      data.value = response.results;
      console.log("Loaded users:", data.value);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.add({
      title: "Failed to load users",
      description: error.message || "Could not load users",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
};

const fetchAdmins = async () => {
  try {
    const response = await useApi("/admin/getAdmins", "get");
    console.log("API Response:", response);

    if (response?.results) {
      data.value = response.results;
      console.log("Loaded Admins:", data.value);
      selectedRole.value = "admin";
    }
  } catch (error) {
    console.error("Error fetching Admins:", error);
    toast.add({
      title: "Failed to load Admins",
      description: error.message || "Could not load Admins",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
};

// Call fetchUsers on component mount
onMounted(() => {
  fetchUsers();
});

// Filter function for role filtering
const filteredData = computed(() => {
  return data.value;
});

// Open delete confirmation modal
const openDeleteModal = (userId) => {
  currentUserId.value = userId;
  deleteModalOpen.value = true;
};

// Handle delete user
const deleteUser = async () => {
  try {
    const response = await useApi(
      `/admin/deleteUser/${currentUserId.value}`,
      "delete"
    );
    if (response && response.success) {
      toast.add({
        title: "Success",
        description: "User deleted successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });

      // Refresh data after deletion
      await fetchUsers();
    } else {
      throw new Error(response?.message || "Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.add({
      title: "Failed to delete user",
      description: error.message || "Could not delete the user",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    deleteModalOpen.value = false;
  }
};

// Open change role modal
const openChangeRoleModal = (userId) => {
  currentUserId.value = userId;
  changeRoleModalOpen.value = true;
};

// Handle change role
const changeRole = async () => {
  try {
    const response = await useApi(
      `/admin/changeRole`,
      "patch",
      { userId: currentUserId.value ,role: "Admin" }
    );

    if (response && response.success) {
      toast.add({
        title: "Success",
        description: "User role changed to admin successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });

      // Refresh data after role change
      await fetchUsers();
    } else {
      throw new Error(response?.message || "Failed to change user role");
    }
  } catch (error) {
    console.error("Error changing user role:", error);
    toast.add({
      title: "Failed to change user role",
      description: error.message || "Could not change the user role",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    changeRoleModalOpen.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-8 w-full my-8 mx-[20%] lg:mx-[10%]">
    <div class="flex justify-between items-center">
      <div class="flex justify-between flex-col">
        <h2 class="text-primary text-xl md:text-3xl font-bold cursor-default">
          Users Information
        </h2>
        <p class="cursor-default">
          {{
            `${filteredData.length} ${
              selectedRole == "user" ? "users" : "admins"
            }`
          }}
        </p>
      </div>

      <div>
        <UInput
          :model-value="table?.tableApi?.getColumn('email')?.getFilterValue()"
          icon="i-lucide-search"
          class="max-w-sm"
          size="md"
          variant="outline"
          placeholder="Search by email..."
          @update:model-value="
            table?.tableApi?.getColumn('email')?.setFilterValue($event)
          "
        />
      </div>
    </div>

    <!-- Role filter bar -->
    <div class="flex flex-wrap gap-3 mt-2">
      <UButton
        :class="
          selectedRole === 'user'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        "
        class="px-4 py-2 rounded-md cursor-pointer"
        @click="fetchUsers"
      >
        Regular Users
      </UButton>
      <UButton
        :class="
          selectedRole === 'admin'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        "
        class="px-4 py-2 rounded-md cursor-pointer"
        @click="fetchAdmins"
      >
        Admins
      </UButton>
    </div>

    <div>
      <UTable
        v-if="filteredData.length > 0"
        ref="table"
        v-model:column-filters="columnFilters"
        :data="filteredData"
        :columns="columns"
        class="flex-1"
      >
        <template v-if="selectedRole == 'user'" #action-cell="{ row }">
          <div class="flex gap-2">
            <UModal
              v-model:open="changeRoleModalOpen"
              title="Change User Role"
              :ui="{ footer: 'justify-end' }"
            >
              <UButton
                size="sm"
                color="primary"
                variant="soft"
                @click="openChangeRoleModal(row.original._id)"
              >
                <template #leading>
                  <UIcon name="i-lucide-user-cog" class="w-4 h-4" />
                </template>
                Change Role
              </UButton>
              <template #body>
                <p>
                  Are you sure you want to change this user's role to admin?
                  This grants additional permissions.
                </p>
              </template>

              <template #footer>
                <div class="flex justify-center gap-4 mt-6">
                  <UButton
                    color="gray"
                    variant="outline"
                    class="px-4 py-2 border border-slate-600 rounded-3"
                    @click="changeRoleModalOpen = false"
                  >
                    Cancel
                  </UButton>
                  <UButton
                    class="px-4 py-2 bg-primary text-white rounded-3"
                    @click="changeRole"
                  >
                    Confirm
                  </UButton>
                </div>
              </template>
            </UModal>



            <UModal
              v-model:open="deleteModalOpen"
              title="Delete user"
              :ui="{ footer: 'justify-end' }"
            >
            <UButton
              size="sm"
              color="red"
              variant="soft"
              @click="openDeleteModal(row.original._id)"
            >
              <template #leading>
                <UIcon name="i-lucide-trash" class="w-4 h-4" />
              </template>
              Delete
            </UButton>
              <template #body>
                <p>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>

              </template>

              <template #footer>
                <div class="flex justify-center gap-4 mt-6">
            <UButton
              color="gray"
              variant="outline"
              class="px-4 py-2 border border-slate-600 rounded-3"
              @click="deleteModalOpen = false"
            >
              Cancel
            </UButton>
            <UButton
              class="px-4 py-2 bg-red-700 text-white rounded-3"
              color="red"
              @click="deleteUser"
            >
              Delete
            </UButton>
          </div>
              </template>
            </UModal>

          </div>
        </template>
      </UTable>
      <div
        v-if="filteredData.length === 0"
        class="py-8 text-center text-gray-500"
      >
        No users found. Try a different filter or refresh the page.
      </div>
    </div>


    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm text-gray-500 cursor-default">
          Showing
          {{ filteredData.length > 0 ? (page - 1) * itemsPerPage + 1 : 0 }}-{{
            Math.min(page * itemsPerPage, filteredData.length)
          }}
          of {{ filteredData.length }}
        </p>
      </div>

      <div>
        <UPagination
          v-model="page"
          :items-per-page="itemsPerPage"
          :total="filteredData.length"
          @update:page="page = $event"
        />
      </div>
    </div>
  </div>
</template>
