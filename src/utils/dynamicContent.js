const findDynamicContent = () => $('[data-bv-content]');

const displayTargetedContent = (queryArgs, $dynamicElems) => {
  const ref = queryArgs.pagetype;
  const kw = ref && ref.toLowerCase().replace(' ', '');

  if (!ref) {
    return;
  }

  $dynamicElems.forEach(element => {
    const $elem = $(elem);
    const $defaults = $elem.find('[data-bv-ref=default]');
    const $target = $elem.find('[data-bv-ref=' + kw + ']');


    if (!$target || $target.length === 0) {
      $defaults.show();
    } else {
      $defaults.hide();
      $target.show();
    }
  });
};

const displayDynamicContent = queryArgs => {
  const $dynamicElems = findDynamicContent();
  displayTargetedContent(queryArgs, $dynamicElems);
}

export { displayDynamicContent };
