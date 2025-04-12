<script setup>
const toast = useToast();
const deleteModalOpen = ref(false);
const editModalOpen = ref(false);
const currentUserId = ref(null);
const selectedRole = ref("all"); // Default to show all users

// For edit form
const editForm = ref({
  userName: '',
  email: '',
  phoneNumberRaw: '',
  role: ''
});

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

function getDropdownActions(user) {
  return [
    [
      {
        label: "Copy user Id",
        icon: "i-lucide-copy",
        onSelect: () => {
          navigator.clipboard.writeText(user._id.toString());
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
        onSelect: () => openEditModal(user),
      },
      {
        label: "Delete",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => openDeleteModal(user._id),
      },
    ],
  ];
}

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
    const response = await useApi('/user/allProfiles', "get");
    console.log('API Response:', response);
    
    if (response?.users) {
      data.value = response.users;
      console.log('Loaded users:', data.value);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    toast.add({
      title: "Failed to load users",
      description: error.message || "Could not load users",
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
  if (selectedRole.value === "all") {
    return data.value;
  }
  return data.value.filter(user => user.role === selectedRole.value);
});

// Open delete confirmation modal
const openDeleteModal = (userId) => {
  currentUserId.value = userId;
  deleteModalOpen.value = true;
};

// Handle delete user
const deleteUser = async () => {
  try {
    const response = await useApi(`/user/deleteProfile/${currentUserId.value}`, 'delete');
    
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
    console.error('Error deleting user:', error);
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

// Open edit modal and populate form with user data
const openEditModal = (user) => {
  // Make sure to populate the form with user data
  editForm.value = {
    userName: user.userName || '',
    email: user.email || '',
    phoneNumberRaw: user.phoneNumberRaw || '',
    role: user.role || 'user'
  };
  
  // Log to verify the data is being set correctly
  console.log("Opening edit modal with data:", editForm.value);
  
  currentUserId.value = user._id;
  editModalOpen.value = true;
};

// Handle edit user submission
const submitEditUser = async (event) => {
  if (event) event.preventDefault();
  
  try {
    // Validate required fields
    if (!editForm.value.userName || !editForm.value.email) {
      toast.add({
        title: "Validation Error",
        description: "Please fill in all required fields",
        color: "error",
        icon: "i-lucide-alert-circle",
      });
      return;
    }
    
    const userData = {
      userName: editForm.value.userName,
      email: editForm.value.email,
      phoneNumberRaw: editForm.value.phoneNumberRaw,
      role: editForm.value.role
    };

    console.log("Submitting edit with data:", userData);

    const response = await useApi(`/user/updateProfile/${currentUserId.value}`, 'put', userData);
    
    if (response && response.success) {
      toast.add({
        title: "Success",
        description: "User updated successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });
      
      // Refresh data after update
      await fetchUsers();
      editModalOpen.value = false;
    } else {
      throw new Error(response?.message || "Failed to update user");
    }
  } catch (error) {
    console.error('Error updating user:', error);
    toast.add({
      title: "Failed to update user",
      description: error.message || "Could not update the user",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
};

// Role options for edit form
const roleOptions = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" }
];
</script>

<template>
  <div class="flex flex-col gap-8 w-full my-8 mx-[20%] lg:mx-[10%]">
    <div class="flex justify-between items-center">
      <div class="flex justify-between flex-col">
        <h2 class="text-primary text-xl md:text-3xl font-bold">
          Users Information
        </h2>
        <p>{{ filteredData.length }} users</p>
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
        :class="selectedRole === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        @click="selectedRole = 'all'"
        class="px-4 py-2 rounded-md"
      >
        All Users
      </UButton>
      <UButton
        :class="selectedRole === 'admin' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        @click="selectedRole = 'admin'"
        class="px-4 py-2 rounded-md"
      >
        Admins
      </UButton>
      <UButton
        :class="selectedRole === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        @click="selectedRole = 'user'"
        class="px-4 py-2 rounded-md"
      >
        Regular Users
      </UButton>
    </div>

    <div>
      <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        :data="filteredData"
        :columns="columns"
        class="flex-1"
        v-if="filteredData.length > 0"
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
      <div v-if="filteredData.length === 0" class="py-8 text-center text-gray-500">
        No users found. Try a different filter or refresh the page.
      </div>
    </div>

    <!-- Edit User Modal -->
    <UModal v-if="editModalOpen" :model-value="editModalOpen" @close="editModalOpen = false">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">Edit User</h3>
            <UButton icon="i-lucide-x" color="gray" variant="ghost" @click="editModalOpen = false" />
          </div>
        </template>
        
        <form @submit.prevent="submitEditUser">
          <div class="space-y-4">
            <UFormGroup label="User Name">
              <UInput v-model="editForm.userName" type="text" required />
            </UFormGroup>
            
            <UFormGroup label="Email">
              <UInput v-model="editForm.email" type="email" required />
            </UFormGroup>
            
            <UFormGroup label="Phone Number">
              <UInput v-model="editForm.phoneNumberRaw" type="tel" />
            </UFormGroup>
            
            <UFormGroup label="Role">
              <USelect 
                v-model="editForm.role" 
                :options="roleOptions"
                required
              />
            </UFormGroup>
          </div>
          
          <div class="flex justify-end gap-3 mt-6">
            <UButton
              type="button" 
              color="gray" 
              variant="outline" 
              @click="editModalOpen = false"
            >
              Cancel
            </UButton>
            <UButton type="submit" color="primary">
              Save Changes
            </UButton>
          </div>
        </form>
      </UCard>
    </UModal>

    <!-- Delete User Modal -->
    <UModal v-if="deleteModalOpen" :model-value="deleteModalOpen" @close="deleteModalOpen = false">
      <UCard>
        <div class="text-center p-4">
          <h3 class="text-lg font-medium mb-4">Confirm Deletion</h3>
          <p>Are you sure you want to delete this user? This action cannot be undone.</p>
          
          <div class="flex justify-center gap-4 mt-6">
            <UButton 
              color="gray" 
              variant="outline" 
              @click="deleteModalOpen = false"
            >
              Cancel
            </UButton>
            <UButton 
              color="red" 
              @click="deleteUser"
            >
              Delete
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>

    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm text-gray-500">
          Showing {{ filteredData.length > 0 ? (page - 1) * itemsPerPage + 1 : 0 }}-{{ Math.min(page * itemsPerPage, filteredData.length) }} of {{ filteredData.length }}
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