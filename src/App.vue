<script>
import FilterButtons from "./components/FilterButtons.vue";
import ItemRow from "./components/ItemRow.vue";

export default {
	components: {
		ItemRow,
		FilterButtons,
	},
	data() {
		return {
			items: [],
			value: "",
			activeFilter: "all",
			isLoading: true,
			isError: false,
		};
	},
	methods: {
		addNewItem() {
			if (this.value.trim() === "") {
				return;
			}
			const maxId = this.items.length
				? Math.max(...this.items.map(item => item.id))
				: 0;
			const newId = maxId + 1;
			this.items.push({ id: newId, title: this.value });
			this.value = "";
		},
		removeItem(id) {
			this.items = this.items.filter(item => item.id !== id);
		},
		updateItem({ id, title }) {
			const item = this.items.find(item => item.id === id);
			if (item) {
				item.title = title;
			}
		},
		setFilter(filter) {
			this.activeFilter = filter;
		},
		toggleCompleted(id) {
			const item = this.items.find(item => item.id === id);
			if (item) {
				item.completed = !item.completed;
			}
		},
		fetchData() {
			this.isLoading = true;
			this.isError = false;

			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([
						{ id: 1, title: "Учить Vue", completed: false },
						{ id: 2, title: "Сделать TODO", completed: true },
						{ id: 3, title: "Закончить Этап 5", completed: false },
					]);
				}, 1000);
			})

				.then(data => {
					this.items = data;
					this.isLoading = false;
				})
				.catch(() => {
					this.isError = true;
					this.isLoading = false;
				});
		},
		// Подключение через настоящий API
		// async fetchData() {
		// 	this.isLoading = true;
		// 	this.isError = false;
		// 	try {
		// 		const response = await fetch(
		// 			"https://jsonplaceholder.typicode.com/todos?_limit=5"
		// 		);
		// 		if (!response.ok) throw new Error("Ошибка сети");
		// 		const data = await response.json();
		// 		this.items = data.map(d => ({
		// 			id: d.id,
		// 			title: d.title,
		// 			completed: d.completed,
		// 		}));
		// 	} catch (e) {
		// 		this.isError = true;
		// 	} finally {
		// 		this.isLoading = false;
		// 	}
		// },
	},
	computed: {
		totalCount() {
			return this.items.length;
		},
		completedCount() {
			return this.items.filter(item => item.completed).length;
		},
		activeCount() {
			return this.items.filter(item => !item.completed).length;
		},
		visibleItems() {
			if (this.activeFilter === "all") {
				return this.items;
			} else if (this.activeFilter === "completed") {
				return this.items.filter(item => item.completed);
			} else if (this.activeFilter === "active") {
				return this.items.filter(item => !item.completed);
			}
		},
	},
	mounted() {
		this.fetchData();
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
					@remove="removeItem"
					@update="updateItem"
					@change="toggleCompleted(item.id)"
				/>
			</ul>
			<input type="text" v-model="value" @keyup.enter="addNewItem" />
			<button @click="addNewItem">Добавить</button>
		</div>
	</div>
</template>
