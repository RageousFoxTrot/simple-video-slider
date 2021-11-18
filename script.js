const $ = (elem) => document.querySelectorAll(elem);

const boxes = [...$('[id^="box"]')].sort(
  (x, y) =>
    Number.parseInt(x.id.substr(4), 10) - Number.parseInt(y.id.substr(4), 10)
);
const container = $('#container')[0];
const prevBtn = $('.prev')[0];
const nextBtn = $('.next')[0];

const currentVideo = () => boxes.find(({ style }) => style.opacity == 1);

container.addEventListener('click', (ev) => {
  const video = currentVideo();
  video.paused ? video.play() : video.pause();
});

prevBtn.addEventListener('click', (ev) => {
  ev.stopPropagation();
  const video = currentVideo();
  const index = boxes.indexOf(video);

  if (!video.paused) video.pause();
  video.currentTime = 0;
  video.style.opacity = 0;
  boxes[(index == 0 ? boxes.length : index) - 1].style.opacity = 1;
  boxes[(index == 0 ? boxes.length : index) - 1].play();
});

nextBtn.addEventListener('click', (ev) => {
  ev.stopPropagation();
  const video = currentVideo();
  const index = boxes.indexOf(video);

  if (!video.paused) video.pause();
  video.currentTime = 0;
  video.style.opacity = 0;
  boxes[(index == boxes.length - 1 ? -1 : index) + 1].style.opacity = 1;
  boxes[(index == boxes.length - 1 ? -1 : index) + 1].play();
});

boxes.forEach((x, i) => {
  x.addEventListener('ended', (ev) => {
    // Activates autoplay.
    /*
    boxes[i !== boxes.length - 1 ? i + 1 : 0].play();
    x.style.opacity = 0;
    boxes[i !== boxes.length ? i + 1 : 0].style.opacity = 1;
    */

    // Activates loop.
    x.play();

    // WARNING: Don't use autoplay and loop simultaneously. For obvious reasons.
  });
});
