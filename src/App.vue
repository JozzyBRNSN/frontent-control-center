<script>
import ItemRow from "./components/ItemRow.vue";

export default {
	components: {
		ItemRow,
	},
	data() {
		return {
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
		removeItem(id) {
			this.items = this.items.filter(item => item.id !== id);
		},
	},
};
</script>

<template>
	<ul>
		<ItemRow
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:title="item.title"
			@remove="removeItem"
		/>
	</ul>
	<input type="text" v-model="value" />
	<button @click="addNewItem">Добавить</button>
</template>
