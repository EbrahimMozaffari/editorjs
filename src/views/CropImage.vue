<template>
<div><cropper
width="600px"
		:src="img"
		@change="change"
	/>
  hi
  </div>
	
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
	components: {
		Cropper,
	},
	data() {
		return {
			img: '/img/slider.jpg',
		};
	},
	methods: {
		change({ coordinates, canvas }) {
			console.log(coordinates, canvas);
		},
	},
};
</script>