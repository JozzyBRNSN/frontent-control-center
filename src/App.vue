<script>
export default {
	data() {
		return {
			// title: "Счетчик",
			// counter: 0,
			items: [
				{ id: 1, title: "Доделать таску" },
				{ id: 2, title: "Закрыть день" },
				{ id: 3, title: "Спать" },
			],
			value: "",
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
	},
};
</script>

<template>
	<!-- <h1>{{ title }}</h1>
	<br />
	<div>{{ counter }}</div>
	<button @click="counter--">-</button>
	<button @click="counter++">+</button>
	<hr /> -->
	<li v-for="item in items" :key="item.id">{{ item.id }}. {{ item.title }}</li>
	<input type="text" v-model="value" />
	<button @click="addNewItem">Добавить</button>
</template>
