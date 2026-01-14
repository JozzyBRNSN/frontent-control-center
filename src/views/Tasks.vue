<script>
import { useTaskStore } from "../stores/tasks";
import FilterButtons from "../components/FilterButtons.vue";
import ItemRow from "../components/ItemRow.vue";
export default {
	components: {
		FilterButtons,
		ItemRow,
	},
	data() {
		return {
			value: "",
			activeFilter: "all",
		};
	},
	methods: {
		addNewTask() {
			this.taskStore.addTask(this.value);
			this.value = "";
		},
		removeTask(id) {
			this.taskStore.removeTask(id);
		},
		toggleTask(id) {
			this.taskStore.toggleTaskStatus(id);
		},
		updateTask(payload) {
			this.taskStore.updateTask(payload);
		},
		setFilter(filter) {
			this.activeFilter = filter;
		},
	},
	computed: {
		taskStore() {
			return useTaskStore();
		},
		totalCount() {
			return this.taskStore.items.length;
		},
		completedCount() {
			return this.taskStore.items.filter(task => task.completed).length;
		},
		activeCount() {
			return this.taskStore.items.filter(task => !task.completed).length;
		},
		visibleItems() {
			if (this.activeFilter === "all") {
				return this.taskStore.items;
			} else if (this.activeFilter === "completed") {
				return this.taskStore.items.filter(task => task.completed);
			} else if (this.activeFilter === "active") {
				return this.taskStore.items.filter(task => !task.completed);
			}
		},
		isLoading() {
			return this.taskStore.isLoading;
		},
		isError() {
			return this.taskStore.isError;
		},
	},
	mounted() {
		this.taskStore.fetchTasks();
	},
};
</script>

<template>
	<div>
		<div v-if="isLoading">Загрузка..</div>
		<div v-else-if="isError">Ошибка загрузки данных</div>
		<div v-else>
			<div>
				Всего: {{ totalCount }}, Активные: {{ activeCount }}, Завершенные:
				{{ completedCount }}
			</div>
			<FilterButtons :activeFilter="activeFilter" @set-filter="setFilter" />
			<ul>
				<ItemRow
					v-for="item in visibleItems"
					:key="item.id"
					:id="item.id"
					:title="item.title"
					:completed="item.completed"
					@remove="removeTask"
					@update="updateTask"
					@toggle="toggleTask(id)"
				/>
			</ul>
			<input type="text" v-model="value" @keyup.enter="addNewTask" />
			<button @click="addNewTask">Добавить</button>
		</div>
	</div>
</template>
