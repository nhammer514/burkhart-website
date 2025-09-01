const reviews = 
[
    ["Bob put my addition on and it is just fantastic. I will call him again for anything else. He also did my moms bathroom and gameroom. It looks spectacular we love how dependable and honest and nice he is. We look forward working with him when he puts our game room on in the spring.", "Bonnie" ],
    ["He is a nice honest reliable guy. best plumber in the world he built my house and fixed a lot of things he is my favorite definitely call him before anyone else he is great and the best ever", "Tina"]
];

let queued_quote = 0;

const stars = document.getElementById('stars');
const quote = document.getElementById('quote');
const quoter = document.getElementById('quoter');
const left_arrow = document.getElementById('prev');
const right_arrow = document.getElementById('next');
const wrap = document.querySelector('.quote-wrap');

function refresh_text() {
  quote.innerHTML = "<q>" + reviews[queued_quote][0]  + "</q>";
  quoter.textContent = "- " + reviews[queued_quote][1];
}

let animating = false;
function transitionTo(nextIndex, direction /* 'next' | 'prev' */) {
  if (animating) return;
  animating = true;

  // Step 1: slide the current content out
  wrap.classList.add(direction === 'next' ? 'exit-left' : 'exit-right');

  const onExitEnd = () => {
    wrap.removeEventListener('animationend', onExitEnd);

    // Step 2: swap content
    queued_quote = nextIndex;
    refresh_text();

    // Step 3: slide new content in
    wrap.classList.remove('exit-left', 'exit-right');
    wrap.classList.add(direction === 'next' ? 'enter-right' : 'enter-left');

    const onEnterEnd = () => {
      wrap.removeEventListener('animationend', onEnterEnd);
      wrap.classList.remove('enter-right', 'enter-left');
      animating = false;
    };
    wrap.addEventListener('animationend', onEnterEnd, { once: true });
  };

  wrap.addEventListener('animationend', onExitEnd, { once: true });
}

left_arrow.addEventListener('click', () => {
  const next = (queued_quote - 1 + reviews.length) % reviews.length;
  transitionTo(next, 'prev');
});

right_arrow.addEventListener('click', () => {
  const next = (queued_quote + 1) % reviews.length;
  transitionTo(next, 'next');
});

refresh_text();
