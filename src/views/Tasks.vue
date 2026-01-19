<script setup>
import { ref, onMounted, computed } from "vue";
import { useTaskStore } from "../stores/tasks";
import { useTaskFilters } from "../composables/useTaskFilters";
import FilterButtons from "../components/FilterButtons.vue";
import ItemRow from "../components/ItemRow.vue";

const taskStore = useTaskStore();

const taskValue = ref("");

const addNewTask = () => {
	taskStore.addTask(taskValue.value);
	taskValue.value = "";
};

const removeTask = id => {
	taskStore.removeTask(id);
};

const toggleTask = id => {
	taskStore.toggleTaskStatus(id);
};

const updateTask = payload => {
	taskStore.updateTask(payload);
};

const clearData = () => {
	localStorage.remove("tasks");
	location.reload();
};

const isLoading = computed(() => {
	return taskStore.isLoading;
});

const isError = computed(() => {
	return taskStore.isError;
});

onMounted(() => {
	if (taskStore.items.length === 0) {
		taskStore.fetchTasks();
	}
});

const {
	activeFilter,
	setFilter,
	visibleItems,
	totalCount,
	completedCount,
	activeCount,
} = useTaskFilters(taskStore.items);
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
					v-for="(item, index) in visibleItems"
					:key="item.id"
					:id="item.id"
					:title="item.title"
					:completed="item.completed"
					:display-index="index + 1"
					@remove="removeTask"
					@update="updateTask"
					@toggle="toggleTask(item.id)"
				/>
			</ul>
			<input type="text" v-model="value" @keyup.enter="addNewTask" />
			<div class="tasks__buttons">
				<button class="add-item" @click="addNewTask">Добавить</button>
				<button class="data-clear" @click="clearData">Сбросить данные</button>
			</div>
		</div>
	</div>
</template>
