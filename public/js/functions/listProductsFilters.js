const $ = (element) => document.querySelector(element);

window.addEventListener('load', () => {
    const categorySelect = $('.categorySelect');
    const subcategorySelect = $('.subcategorySelect');
    const query = new URLSearchParams(location.search);

    // Establecer la categoría seleccionada inicialmente
    const categoryId = query.get('category');
    if (categoryId) categorySelect.value = categoryId;

    // Establecer la subcategoría seleccionada inicialmente
    const subcategoryId = query.get('subcategory');
    if (subcategoryId) subcategorySelect.value = subcategoryId;

    categorySelect.addEventListener('change', () => {
        const category = categorySelect.value;
        category === '0' ? query.delete('category') : query.set('category', category);
        updateUrl()
    });

    subcategorySelect.addEventListener('change', () => {
        const subcategory = subcategorySelect.value;
        subcategory === '0' ? query.delete('subcategory') : query.set('subcategory', subcategory);
        updateUrl()
    });

    function updateUrl() {
        const newUrl = `${location.pathname}?${query.toString()}`;
        window.location.href = newUrl;
    }
});