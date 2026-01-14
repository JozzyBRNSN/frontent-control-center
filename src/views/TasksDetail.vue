<script>
import { useTaskStore } from "../stores/tasks.js";

export default {
	props: ["id"],
	methods: {
		fetchTaskById() {
			this.taskStore.fetchTaskById(this.id);
		},
		goBack() {
			this.$router.push({ name: "Tasks" });
		},
	},
	computed: {
		taskStore() {
			return useTaskStore();
		},
		currentTask() {
			return this.taskStore.currentTask;
		},
		isTaskLoading() {
			return this.taskStore.isTaskLoading;
		},
		isError() {
			return this.taskStore.isError;
		},
	},
	mounted() {
		return this.fetchTaskById();
	},
};
</script>

<template>
	<div>
		<div v-if="isTaskLoading">Загрузка...</div>
		<div v-else-if="isError">Ошибка загрузки задачи</div>
		<div v-else>
			<h1>{{ currentTask?.title }}</h1>
			<p>Статус: {{ currentTask?.completed ? "Выполнено" : "Активно" }}</p>
			<button @click="goBack">Назад к списку</button>
			<br />
			<br />
			<hr />
			<br />
			<h2>Детальная информация</h2>
			<br />
			<span
				>Номер пользователя добавившего задачу:
				<strong>{{ currentTask?.userId }}</strong></span
			>
		</div>
	</div>
</template>
