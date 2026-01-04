<script>
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
	},
	methods: {
		handleRemove() {
			this.$emit("remove", this.id);
		},
	},
};
</script>

<template>
	<li>
		{{ id }}. {{ title }}
		<button @click="handleRemove">Удалить</button>
	</li>
</template>
