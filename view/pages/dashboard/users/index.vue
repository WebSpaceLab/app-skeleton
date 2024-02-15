<script setup>
import { storeToRefs } from 'pinia';

const { $users, $auth } = useNuxtApp()
const { data , pagination, months, queryParams, isLoading} = storeToRefs($users)

definePageMeta({
    layout: "authorization",
    middleware: [ 'auth']
    
})

onMounted(() => {
    $auth.giveAccess($auth.accessGranted('ROLE_ADMIN'))
})

const page = ref(1)

const query = ref({
    term: queryParams.value.term ? queryParams.value.term : '',
    month: queryParams.value.month ? queryParams.value.month : null,
    orderBy: queryParams.value.orderBy ? queryParams.value.orderBy : 'createdAt',
    orderDir: queryParams.value.orderDir ? queryParams.value.orderDir : 'desc'
})

const perPage = ref(8)

let isShowModalUserEdit = ref(false)
let userPreview = ref(null)
let isShowModalUserCreate = ref(false)
let isShowActions = ref(false)
let selectAll = ref(false)

const allMonths = computed(() => {
    return [
        {value: null, label: 'Any date'},
        ...months.value,
    ];
}) 

const roles = [
    {
        label: 'Admin',
        value: 'ROLE_ADMIN',
    },
    {
        label: 'User',
        value: 'ROLE_USER'
    },
    {
        label: 'Editor',
        value: 'ROLE_EDITOR'
    },
]

async function  getUsers() {
    await $users.get(query.value, perPage.value, page.value)
}


async function addedToLibrary () {
    await getUsers()

    isShowModalUserCreate.value = false
    isShowModalUserEdit.value = false
}

async function switchPage(event) {
    page.value = event
    await getUsers()
}

async function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    await getUsers()
}

function toggleSelectAll(e) {
    data.value.forEach(item => item.selected = e.target.checked)
    
    showFieldAction()
}

async function destroy(item) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {     
        await $users.destroy(item.id)
        await getUsers()
    }
}

async function executeAction(actionId) {
    const usersIds = data.value.filter(item => item.selected)
        .map(item => item.id);

    if (!actionId?.length) return;

    switch (actionId) {
        case 'delete':
        if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {
            usersIds.forEach(async (userId) => {                    
                const deleted = await $users.destroy(userId)
     
                isShowActions.value = false
                selectAll.value = false
                await getUsers()            
            })
        }
        break;
    }
}

function edit(item) {
    userPreview.value = item

    isShowModalUserEdit.value = true
}

function showFieldAction() {
    const isSelected = data.value.filter(item => item.selected)

    if(isSelected?.length) {
        isShowActions.value = true

    } else {
        isShowActions.value = false
    }
}

onMounted(async () => {
    await getUsers()
})

watch(() => query.value.term, () => {
    setTimeout(async () => {
        page.value = 1
        await getUsers()
    }, 300)
})

watch(() => query.value.month, () => {
    setTimeout(async () => {
        page.value = 1
        await getUsers()
    }, 300)
})

watch(() => query.value.orderBy, async () => {
    page.value = 1
    await getUsers()
})

watch(() => query.value.orderDir, async () => {
    page.value = 1
    await getUsers()
})
</script>

<template>
    <x-section-dashboard v-if="$auth.accessGranted('ROLE_ADMIN')"  :container="false">
        <template #header-panel>
            <x-search class="" v-model="query.term" :answer="false" icon >
                <template #selectedAction>
                    <div class="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 xl:px-6">
                        <select v-model="query.orderBy" name="orderBy" aria-label="orderBy" id="orderBy" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option value="createdAt">Uploading</option>
                            <option value="name">Alphabetically</option>
                            <option value="updatedAt">Updates</option>
                        </select>

                        <select v-model="query.orderDir" name="orderDir" aria-label="orderDir" id="orderDir" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option value="desc">Sort by descending</option>
                            <option value="asc">Sort by ascending</option>
                        </select>

                        <select v-model="query.month"  aria-label="Media date" id="date" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="month in allMonths" :key="month.value" :value="month.value">{{ month.label }}</option>
                        </select>
                    </div>
                </template>
            </x-search>

            <x-btn
                @click="isShowModalUserCreate = true"
                class="h-9 group"
                color="secondary-outline"
                shadow
                :tooltip="{text: 'Add new description'}"
                rounded
                icon
            >
                <Icon name="material-symbols:add-circle-rounded" class="text-xl " />
            </x-btn>
        </template>

        <template #main>
            <div class=" h-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl" >
                <div class="w-full flex justify-between mb-8">
                    <div class="flex justify-center items-center space-x-3 ">
                        <div class="flex justify-center items-center space-x-3 ">
                            <x-select-action :actions="actions" :isShowActions="isShowActions" @execute="executeAction" />
                        </div>
                    </div>
                </div>


                <div v-if="data" class="w-full h-full flex">
                    <div class="transition-all duration-500 w-full" >
                        <div class="w-full h-full transition-all duration-500" >
                            <x-table
                                :head="['username', 'email', 'roles', 'status', 'Statute', 'created', 'updated', '' ]"
                                @select-all="toggleSelectAll"
                                justify="center"
                                :loading="isLoading"
                                :count="data.length"
                            >
                                <x-table-body v-for="(item, index) in data" :key="item.index = index" :class="item.status == 0 ? 'bg-black/30' : ''">
                                    <x-table-body-cell  justify="center">
                                        <input v-model="item.selected" @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light dark:bg-background-dark text-blue-600 rounded border-gray-300 lg:w-4 lg:h-4 focus:ring-blue-500">
                                    </x-table-body-cell>
                                    
                                    <x-table-body-cell justify="center">
                                        <div class="w-full flex justify-start items-center space-x-6">
                                            <div class="w-9">
                                                <img :src="item.avatarUrl" alt="avatar" class="w-9 h-9 object-cover rounded-full">
                                            </div>

                                            <p class="w-full">
                                                {{ item.username }}
                                            </p>
                                        </div>
                                    </x-table-body-cell>
            
                                    <x-table-body-cell justify="center">
                                        {{ item.email }}
                                    </x-table-body-cell>
                        
                                    <x-table-body-cell justify="center">
                                        <div class="flex flex-col space-y-2 ">
                                            <span v-for="(role, index) in item.roles" :key="index">
                                                <template v-for="(r, index) in roles" :key="index">
                                                    <span v-if="role === r.value" :class="[
                                                        r.value === 'ROLE_ADMIN' ? 'bg-red-500' : '',
                                                        r.value === 'ROLE_EDITOR' ? 'bg-green-500' : '',    
                                                        r.value === 'ROLE_USER' ? 'bg-blue-500' : '',
                                                        'text-white rounded-full px-2 py-1 text-xs font-bold'
                                                    ]">
                                                        {{ r.label }}
                                                    </span>
                                                </template>
                                            </span>
                                        </div>
                                    </x-table-body-cell>

                                    <x-table-body-cell justify="center">
                                        <div :class="[item.isActiveAccount ? 'text-success-600' : 'text-danger-600']">
                                            {{ item.isActiveAccount ? 'active' : 'not active' }}
                                        </div>
                                    </x-table-body-cell>

                                    
                                    <x-table-body-cell justify="center">
                                        <div :class="[item.isAgree ? 'text-success-600' : 'text-danger-600']">
                                            {{ item.isAgree ? 'accepted' : 'not accepted' }}
                                        </div>
                                    </x-table-body-cell>

                                    <x-table-body-cell justify="center">
                                        {{ item.createdAtAgo }}
                                    </x-table-body-cell>

                                    <x-table-body-cell justify="center">
                                        {{ item.updatedAtAgo }}
                                    </x-table-body-cell>
            
                                    <x-table-body-cell justify="center">
                                        <div class="w-full justify-center items-center">
                                            <x-btn  @click="edit(item)" color="secondary" icon strip :tooltip="{text: 'Edit'}" rounded>
                                                <Icon name="ic:baseline-mode-edit"  class="text-2xl" />
                                            </x-btn>

                                            <x-btn  @click="destroy(item)" color="danger" icon strip :tooltip="{text: 'Deleted'}" rounded>
                                                <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                            </x-btn>
                                        </div>
                                    </x-table-body-cell>
                                </x-table-body>

                                <template #pagination>
                                    <x-pagination :count="data.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                                </template>
                            </x-table>
                        </div>
                    </div>
                </div>

                <x-modal-user-create
                    :show="isShowModalUserCreate"
                    @close="(event) => isShowModalUserCreate = event"
                    @addedToLibrary="addedToLibrary"
                    :title="`Creating a new description in users section.`"
                />
                    
                <x-modal-user-edit
                    :show="isShowModalUserEdit"
                    :preview="userPreview"
                    :roles="roles"
                    @close="(event) => isShowModalUserEdit = event"
                    @addedToLibrary="addedToLibrary"
                    :title="`Edycja: ${userPreview?.name}`"
                />
            </div>
        </template>

        <template #sidebar>
            
        </template>
    </x-section-dashboard>
</template>