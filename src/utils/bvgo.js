const keys = [66, 86, 71, 79]; // Represent the command 'bvgo'.
let nextKey = 0;

const keyMap = (fn) => {
  const maxKeyIndex = keys.length - 1;
  if (nextKey > maxKeyIndex) {
    fn();
    nextKey = 0;
  }
};

const initializeBVGO = (fn) => {
  $(window).keydown((e) => {
    const key = e.which;
    nextKey = (key === keys[nextKey]) ? nextKey + 1 : 0;
    keyMap(fn);
  });
};

export { initializeBVGO };
