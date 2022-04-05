let scrollTop = 0;
let t1 = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
  });

t1
.add({
  targets: '.menu',
  opacity: 1,
  translateX: [-100, 0],
}
)

.add({
  targets: '.couple',
  opacity: 1,
  translateY: [500, 0],
  easing: 'linear',
}, 3)

.add({
  targets: '.container h1',
  opacity: 1,
  translateY: [200, 0],
  easing: 'linear',
}, 3)

.add({
  targets: '.container p',
  opacity: 1,
  translateY: [200, 0],
  easing: 'linear',
}, 3)