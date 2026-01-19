import { computed, ref } from "vue";

export function useTaskFilters(items) {
	const activeFilter = ref("all");

	const setFilter = (filter) => {
		activeFilter.value = filter;
	};

	const visibleItems = computed(() => {
		switch (activeFilter.value) {
			case "completed":
				return items.filter(item => item.completed);
			case "active":
				return items.filter(item => !item.completed);
			default:
				return items;
		}
	});

	const totalCount = computed(() => {
		return items.length;
	});

	const completedCount = computed(() => {
		return items.filter(item => item.completed).length;
	});

	const activeCount = computed(() => {
		return items.filter(item => !item.completed).length;
	});

	return {
		activeFilter,
		setFilter,
		visibleItems,
		totalCount,
		completedCount,
		activeCount,
	};
}
