<script setup>
// const emits = defineEmits([
// 	'closeDropdown',
// ]);

const props = defineProps({
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },

    isActive: {
      type: Function,
      default: null,
    },
	dropdown: {
		type: Boolean,
		default: false,
	},
	items: {
		type: Array,
		default: () => [],
	},
	editor: {
		type: Object,
		required: true,
	},
	isCloseDropdown: {
		type: Boolean,
		default: false,
	},
});

let isShow = ref(false);
let selectedItem = ref(null);

const select = (item) => {
	selectedItem.value = item;
	item.action();
	isShow.value = false;

};

const open = () => {
	isShow.value = !isShow.value;
	// emits('closeDropdown', isShow.value );
};

// watch(() => props.isCloseDropdown, (value) => {
// 	if (value) {
// 		isShow.value = false;
// 		console.log('close dropdown', value);
// 	}
// });

onMounted(() => {
	props.items.forEach((item) => {
		if (item.isActive && item.isActive()) {
			selectedItem.value = item;
		}
	});
});

</script>

<template>
	<div class="flex">
		<button
			v-if="!dropdown"
			class=" flex justify-center items-center cursor-pointer text-white border-none rounded-md p-2 m-1 bg-slate-800 hover:bg-slate-400 hover:dark:bg-slate-700 hover:text-muted hover:dark:text-muted-dark"
			:class="{ ' bg-slate-400 dark:bg-slate-800 text-muted-light dark:text-muted-dark ': isActive ? isActive(): null }"
			@click="action"
			:title="title"
			type="button"
		>
			<Icon :name="icon" ></Icon>
		</button>

		<div
			v-else
			class=" relative flex justify-center items-center text-white border-none bg-slate-800 hover:bg-slate-400 hover:dark:bg-slate-700 hover:text-muted hover:dark:text-muted-dark rounded-md"
		>
			<span v-if="isShow" class="-z-1 fixed top-0 left-0 w-screen h-screen" @click="isShow = false"></span>
			<button @click="open()"  type="button" class="w-full h-full  flex  justify-between items-center relative bg-transparent border-none transition duration-150 ease-out rounded-md font-bold cursor-pointer tracking-wider focus:ring-focus box-border">
				<span>
					<Icon :name="icon" class="text-xl text-white" ></Icon>
	

				</span>

				<Icon name="material-symbols:arrow-forward-ios-rounded" :class="isShow ? 'rotate-270' : 'rotate-90'"></Icon>
			</button>

			<div v-if="isShow" class="w-35 absolute left-0 bottom-0 translate-y-[100%]  flex flex-col justify-start items-start space-y-2 p-2 bg-slate-800/80" :class="isShow ? '' : ''">
				
				<span class="w-full" v-for="(item, index) in items" :key="index">
					<button
						class="w-full flex justify-start items-center cursor-pointer text-white border-none rounded-md bg-transparent hover:bg-slate-400 hover:dark:bg-slate-700 hover:text-muted hover:dark:text-muted-dark"
						:class="{ ' bg-slate-400 dark:bg-slate-700 text-muted-light dark:text-muted-dark ': item.isActive ? item.isActive(): null }"
						@click="select(item)"
						:title="item.title"
						type="button"
					>
						<Icon v-if="item.icon !== ''" :name="item.icon" class="mr-2"></Icon> 

						<span v-else class=" h-6 w-6 mr-2 box-border flex justify-center items-center" :style="{
							'border-solid border-color': item.color,
							'color': item.color,
							'background-color': item.backgroundColor,
						}">
							A
						</span>

						{{ item.title }} 
					</button>
				</span>
			</div>
		</div>
	</div>


</template>
