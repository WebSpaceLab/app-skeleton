<template>
	<div class="glitch">
		<img class="w-full h-full opacity-80" src="/images/vector/glitch.webp" alt="glitch">

		<div class="glitch__layers">
			<div class="glitch__layer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
			<div class="glitch__layer bg-gradient-to-r from-red-500 via-purple-500 to-green-500"></div>
			<div class="glitch__layer bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
			<div class="glitch__layer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
			<div class="glitch__layer bg-gradient-to-r from-red-500 via-purple-500 to-green-500"></div>
			<div class="glitch__layer bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
			<div class="glitch__layer bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.glitch {
	overflow: hidden;
}

.glitch__layers {
	position: absolute;
	z-index: 2;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

.glitch__layer {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

.glitch__layer:nth-child(1) {
	transform: translateX(-5%);
	animation: glitch-anim-1 1s infinite linear alternate;
}

.glitch__layer:nth-child(2) {
	transform: translateX(3%) translateY(3%);
	animation: glitch-anim-2 .1s -.3s infinite linear alternate;
}

.glitch__layer:nth-child(3) {
	transform: translateX(-10%);
	animation: glitch-anim-1 1s infinite linear alternate;
}

.glitch__layer:nth-child(4) {
	transform: translateX(-3%) translateY(-5%);
	animation: glitch-anim-2 .1s -.3s infinite linear alternate;
}

.glitch__layer:nth-child(5) {
	transform: translateX(-3%) translateY(-2%);
	animation: glitch-anim-1 .1s -.3s infinite linear alternate;
}

.glitch__layer:nth-child(6) {
	transform: translateX(-7%) translateY(-7%) ;
	animation: glitch-anim-1 .1s -.3s infinite linear alternate;
}

.glitch__layer:nth-child(7) {
	transform: translateX(5%);
	animation: glitch-anim-flash .3s infinite linear;

}

@keyframes glitch-anim-1 {
	0% {
		clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%);
	}
	10% {
		clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
	}
	20% {
		clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
	}
	30% {
		clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
	}
	40% {
		clip-path: polygon(0 35%, 100% 35%, 100% 35%, 0 35%);
	}
	50% {
		clip-path: polygon(0 45%, 100% 45%, 100% 46%, 0 46%);
	}
	60% {
		clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%);
	}
	70% {
		clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
	}
	80% {
		clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
	}
	90% {
		clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
	}
	100% {
		clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%);
	}
}

@keyframes glitch-anim-2 {
	0% {
		clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%);
	}
	15% {
		clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
	}
	25% {
		clip-path: polygon(0 8%, 100% 8%, 100% 20%, 0 20%);
	}
	30% {
		clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
	}
	45% {
		clip-path: polygon(0 45%, 100% 45%, 100% 45%, 0 45%);
	}
	50% {
		clip-path: polygon(0 50%, 100% 50%, 100% 57%, 0 57%);
	}
	65% {
		clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
	}
	75% {
		clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
	}
	80% {
		clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%);
	}
	95% {
		clip-path: polygon(0 45%, 100% 45%, 100% 60%, 0 60%);
	}
	100% {
		clip-path: polygon(0 11%, 100% 11%, 100% 15%, 0 15%);
	}
}

@keyframes glitch-anim-flash {
	0% {
		opacity: .2;
	}
	30%, 100% {
		opacity: 0;
	}
}
</style>