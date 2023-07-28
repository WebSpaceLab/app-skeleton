<script setup>
const emits = defineEmits(['addedToLibrary', 'deleted'])

const props = defineProps({
    grid: {
        type: String,
        default: '4'
    },
    media: Array
})

const loading = ref(false)

const gridClass = computed(() => {
    return {
        '6' : 'grid-cols-6',
        '4' : 'grid-cols-4',
        '3' : 'grid-cols-3',
        '2' : 'grid-cols-2',
        '1' : 'grid-cols-1',
    } [props.grid]
})

let isShowPreviewImage = ref(false)
let isShowModalPhotoDetails = ref(false)
let fileEdit = ref(null)

const preview = ref({})

function getPreviewImage(file) {
    preview.value = file
    isShowPreviewImage.value = true
}

function openEditFile(file) {
    fileEdit.value = file
    isShowModalPhotoDetails.value = true
}

async function deletedFile(media) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik o nazwie ${media.name}?`)) {
        emits('deleted', media.id)
    }
}

const addedToLibrary = (event) => {
    if(event) {
        emits('addedToLibrary', event)
    }
}
</script>

<template>
    <div class="w-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl">
        <div class="w-full">
            <div v-if="loading" class="w-full h-100 flex justify-center ">
                <Spinner :loading="loading" />
            </div>

            <div v-else class="w-full">

                <div v-if="media" class="grid gap-6" :class="[gridClass]">
                    <x-photo-card
                        v-for="(file, index) in media"
                        :key="file.index = index"
                        :file="file"
                        @showFieldAction="false"
                    >

                        <template #action>
                            <x-btn  @click="getPreviewImage(file)" color="secondary-outline" icon  :tooltip="{text: 'Preview'}" rounded>
                                <Icon name="mdi:eye"  class="text-2xl"/>
                            </x-btn>

                            <x-btn
                                @click="openEditFile(file)"
                                class="h-9 w-9"
                                :tooltip="{text: 'Edit'}"
                                color="secondary-outline"
                                rounded
                                icon
                            >
                                <Icon name="material-symbols:edit" class="text-xl" />
                            </x-btn>

                            
                            <x-btn
                                :tooltip="{text: 'Deleted'}"
                                class="h-9 w-9"
                                @click="deletedFile(file)"
                                color="danger-outline"
                                icon
                                rounded
                            >
                                <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                            </x-btn>
                        </template>
                    </x-photo-card>
                </div>
                <!--
                -->
            </div>
        </div>

        <x-modal-photo-details
            :show="isShowModalPhotoDetails"
            :file="fileEdit"
            @close="(event) => isShowModalPhotoDetails = false"
            @addedToLibrary="addedToLibrary"
            title="Images details"
        />

        <div v-if="media && preview">
            <x-photo-preview
                :isShowPreviewImage="isShowPreviewImage"
                :photos="media"
                :preview="preview"
                @close="event => isShowPreviewImage = event"
                @preview="event => preview = event"
            />
        </div>
        <!--
        -->
    </div>
</template>