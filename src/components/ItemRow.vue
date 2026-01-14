<script>
import { useTaskStore } from "../stores/tasks";
import { RouterLink } from "vue-router";

export default {
	props: {
		id: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			isEditing: false,
			editTitle: this.title,
		};
	},
	methods: {
		handleRemove() {
			this.taskStore.removeTask(this.id);
		},
		startEdit() {
			this.isEditing = true;
			this.editTitle = this.title;
		},
		cancelEdit() {
			this.isEditing = false;
			this.editTitle = this.title;
		},
		saveEdit() {
			this.taskStore.updateTask({ id: this.id, title: this.editTitle });
			this.cancelEdit();
		},
		toggleStatus() {
			this.taskStore.toggleTaskStatus(this.id);
		},
	},
	computed: {
		taskStore() {
			return useTaskStore();
		},
	},
};
</script>

<template>
	<li v-if="!isEditing">
		<input type="checkbox" :checked="completed" @change="toggleStatus" />
		<span>{{ id }}. {{ title }}</span>
		<button @click="startEdit">Редактировать</button>
		<button @click="handleRemove">Удалить</button>
		<RouterLink :to="`/tasks/${id}`">Подробнее</RouterLink>
	</li>
	<li v-else>
		<input v-model="editTitle" />
		<button @click="saveEdit">Сохранить</button>
		<button @click="cancelEdit">Отмена</button>
	</li>
</template>
