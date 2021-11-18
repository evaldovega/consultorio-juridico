export function Chunk(array, chunkSize = 2) {
  let chunkCount = Math.ceil(array.length / chunkSize);
  let chunks = new Array(chunkCount);
  for (let i = 0, j = 0, k = chunkSize; i < chunkCount; ++i) {
    chunks[i] = array.slice(j, k);
    j = k;
    k += chunkSize;
  }
  return chunks;
}

export const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node =
      typeof element == "string" ? document.querySelector(element) : element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

export const dateForDateTimeInputValue = (date) =>
  new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000)
    .toISOString()
    .slice(0, 19);
