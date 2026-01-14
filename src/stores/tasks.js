import { defineStore } from "pinia";

export const useTaskStore = defineStore("tasks", {
	state: () => ({
		items: [],
		isLoading: true,
		isError: false,
		currentTask: null,
		isTaskLoading: false,
	}),
	actions: {
		addTask(title) {
			if (title.trim() === "") {
				return;
			}
			const maxId = this.items.length
				? Math.max(...this.items.map(item => item.id))
				: 0;
			const newId = maxId + 1;
			this.items.push({ id: newId, title: title });
		},
		removeTask(id) {
			this.items = this.items.filter(item => item.id !== id);
		},
		updateTask({ id, title }) {
			const task = this.items.find(item => item.id === id);
			if (task) {
				task.title = title;
			}
		},
		toggleTaskStatus(id) {
			const task = this.items.find(item => item.id === id);
			if (task) {
				task.completed = !task.completed;
			}
		},
		async fetchTasks() {
			this.isLoading = true;
			this.isError = false;
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/todos?_limit=10"
				);
				if (!response.ok) throw new Error("Ошибка сети");
				const data = await response.json();
				this.items = data.map(d => ({
					id: d.id,
					title: d.title,
					completed: d.completed,
				}));
			} catch (e) {
				this.isError = true;
			} finally {
				this.isLoading = false;
			}
		},
		async fetchTaskById(id) {
			this.isTaskLoading = true;
			this.isError = false;
			try {
				const response = await fetch(
					`https://jsonplaceholder.typicode.com/todos/${id}`
				);
				if (!response.ok) throw new Error("Ошибка сети");
				const data = await response.json();
				this.currentTask = {
					userId: data.userId,
					id: data.id,
					title: `Задача ${id}: ${data.title}`,
					completed: data.completed,
				};
			} catch (e) {
				this.isError = true;
			} finally {
				this.isTaskLoading = false;
			}
		},
	},
});
