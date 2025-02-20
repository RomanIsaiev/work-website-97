document.querySelectorAll('.program-item').forEach(item => {
  const itemContainer = item;

  itemContainer.addEventListener('click', () => {
    item.classList.toggle('open');
    itemContainer.classList.toggle('active');
  });
});
