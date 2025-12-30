<script>
export default {
	data() {
		return {
			title: "Счетчик",
			counter: 0,
		};
	},
};
</script>

<template>
	<h1>{{ title }}</h1>
	<br />
	<div>{{ counter }}</div>
	<button @click="counter--">-</button>
	<button @click="counter++">+</button>
</template>

