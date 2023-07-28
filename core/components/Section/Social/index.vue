<script setup>
import { storeToRefs } from 'pinia'

const {  $social } = useNuxtApp()
const { social } = storeToRefs($social)

let isAlert = ref(false);
let isActivePanel = ref(false);
let buffer = ref();
let isShowCreate = ref(false);
let isShowEdit = ref(false);

const editItem = ref([]);

function activePanel(itemId) {
    if(itemId) {
        buffer.value = itemId;
        isActivePanel.value = true;
    }
}

function addSocialMedia() {
    if(social?.value.length > 5) {
        isAlert.value = true;

        setTimeout(() => {
            isAlert.value = false;
        }, 3000);

        return;
    }

    isShowCreate.value = !isShowCreate.value;
}

function closePanel(itemId) {
    buffer.value = null
    isActivePanel.value = false;
}

async function deleteSocial(id) {
    if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {
        await $social.deletedSocialMedia(id)
        .then(({data}) => {
            if(data) {
                $social.getSocialMedia()
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}

function edit(item) {
    if(item) {
        editItem.value = item;
        isShowEdit.value = true;
    }
}

</script>

<template>
    <div class="flex  justify-center items-start p-6">
        <div v-if="isAlert" id="alert-2" class="flex w-full p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                Można użyć tylko 5 linków
            </div>

            <button @click="isAlert = false" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>

        <div class="w-full grid sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 justify-center items-center gap-4 md:gap-6">
            <template v-for="item in social" :key="item.id">
                <div
                    @mouseleave="closePanel(item.id)"
                    @mouseover="activePanel(item.id)"
                    class="relative w-72 h-40 flex flex-col justify-center items-center bg-secondary dark:bg-secondary-dark rounded-lg px-3 py-4 "
                    :class="isActivePanel && buffer === item.id ? 'shadow-xl shadow-black' : 'shadow-sm shadow-slate-600'"
                > 
                    <div v-if="isActivePanel && buffer === item.id"  class="absolute left-0 top-0 w-full h-10 flex justify-end items-center px-2  bg-black/20 box-border rounded-t-xl">
                        <x-btn @click="edit(item)" :tooltip="{text: 'edit'}" strip icon>
                            <Icon name="material-symbols:edit-square-outline-rounded" class="text-xl text-blue-400 hover:text-blue-600 hover:scale-110"/>
                        </x-btn>
    
                        <x-btn @click.prevent="deleteSocial(item.id)" :tooltip="{text: 'delete'}" strip icon>
                            <Icon name="ic:baseline-delete" class="text-xl text-red-400 hover:text-red-600 hover:scale-110"/>
                        </x-btn>
                    </div>
    
                    <div class=" flex justify-start items-center space-x-2">
                        <div class="">
                            <Icon :name="item.icon" class="text-base-color dark:text-base-dark text-3xl"  />
                        </div>
    
                        <div>
                            <p class="text-muted dark:text-muted-dark">{{item.name}}</p>
                        </div>
    
                        <div class="absolute bottom-0 left-0 w-full flex justify-end px-6 py-1 box-border">
                            <span v-if="item.is_active" class="text-sm text-green-500" >active link</span>
                            <span v-else class="text-sm text-red-500" >link not active</span>
                        </div>
                    </div>
                </div>
            </template>

            <div v-if="!social?.length"  class="w-96 h-40 flex flex-col justify-center items-center bg-secondary dark:bg-secondary-dark rounded-lg px-3 py-4 shadow-sm shadow-slate-600">
                <div class=" flex justify-start items-center space-x-2">
                    <div class="">
                        <Icon name="pajamas:thumbtack-solid" class="text-base-color dark:text-base-dark"  />
                    </div>

                    <div >
                        <p class="text-muted dark:text-muted-dark">Brak podpiętych social mediów</p>
                    </div>
                </div>
            </div>

            <div @click="addSocialMedia" class="w-40 h-40 bg-slate-500/50 hover:bg-slate-600/50 rounded-lg flex justify-center items-center cursor-pointer">
                <Icon name="material-symbols:add-circle-outline" class="text-5xl text-slate-500 "/>
            </div>

        </div>


        <x-modal-social-create title="Social media: adding a link" :show="isShowCreate" @close="(event) => isShowCreate = event"/>

        <x-modal-social-update title="Social media: link editing" :item="editItem" :show="isShowEdit" @close="(event) => isShowEdit = event"/>
    </div>
</template>