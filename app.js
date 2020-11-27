const root = document.getElementById('root');
let upper;
let lower;

const putBook = (title, author, image, plot, id) => {
    const books = JSON.parse(localStorage.getItem('books'));
    if (id) {
        books.list[id] = {
            'title': title,
            'id': id,
            'author': author,
            'image': image,
            'plot': plot
        }
        localStorage.setItem('books', JSON.stringify(books))
        return id;
    } else {
        books.lastId += 1;
        books.list[books.lastId] = {
            'title': title,
            'id': books.lastId,
            'author': author,
            'image': image,
            'plot': plot
        }
        localStorage.setItem('books', JSON.stringify(books));
        return books.lastId;
    }
}

const getBook = (id) => {
    const books = JSON.parse(localStorage.getItem('books'));
    return books.list[id];
}

const createElement = (type, attributes, parent) => {
    const element = document.createElement(type);
    const attributeKeys = Object.keys(attributes);

    attributeKeys.forEach(function setAttributes(key) {
        switch (key) {
            case 'classes':
                element.classList.add.apply(element.classList, attributes[key]);
                break;
            case 'text':
                element.innerHTML = attributes[key];
                break;
            default:
                element.setAttribute(key, attributes[key]);
        }
    })
    if (parent !== undefined) {
        parent.appendChild(element);
    }

    return element;
}

const showBookLine = (book, parent) => {
    const bookLine = createElement('div', { classes: ['book-line'] });

    createElement('p', { classes: ['book-title'], text: book.title }, bookLine);
    createElement('button', { classes: ['btn', 'btn-edit'], text: 'Edit' }, bookLine);

    bookLine.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            route('edit', book.id);
        } else {
            route('preview', book.id);
        }
    }, false)
    parent.appendChild(bookLine);
}

const showBookPreview = (book, parent) => {
    const previewSection = createElement('section', { classes: ['book-preview'] });
    createElement('img', { classes: ['book-img'], src: book.image }, previewSection);
    const bookContent = createElement('div', { classes: ['book-content'] });
    createElement('h2', { classes: ['book-title', 'section-title'], text: book.title }, bookContent);
    createElement('h4', { classes: ['book-author'], text: `by ${book.author}` }, bookContent);
    createElement('p', { classes: ['book-plot'], text: book.plot }, bookContent);
    previewSection.appendChild(bookContent);
    parent.appendChild(previewSection);
}

const createfieldSet = (parent, elem, elemName, elemType, elemValue = '') => {
    const fieldSet = createElement('fieldset', { classes: ['form-field'] });

    createElement('label', { classes: ['form-label'], text: `${elemName}: `, for: `input${elemName}` }, fieldSet);
    if (elem === 'input') {
        createElement(
            elem,
            { classes: ['form-field'], type: elemType, id: `input${elemName}`, value: elemValue, required: 'required' },
            fieldSet
        );
    } else {
        const textarea = createElement(
            elem,
            { classes: ['form-field'], rows: '10', id: `input${elemName}`, required: 'required' },
            fieldSet
        );
        textarea.innerHTML = elemValue;
    }
    parent.appendChild(fieldSet);
}

const cancelForm = () => {
    if (confirm('Discard changes?')) {
        const urlNumber = -1;
        window.history.go(urlNumber);
    }
}

const saveForm = (e, updateId) => {
    e.preventDefault();

    const timeout = 200;
    let id = putBook(
        document.querySelector('#inputTitle').value,
        document.querySelector('#inputAuthor').value,
        document.querySelector('#inputImage').value,
        document.querySelector('#inputPlot').value,
        updateId
    )
    e.target.reset();
    route('preview', id);

    setTimeout(function () {
        alert('Book successfully updated');
    }, timeout);
}

const showInputForm = (parent, book) => {
    const addBookForm = createElement('form', { classes: ['book-form'] });

    if (book) {
        createfieldSet(addBookForm, 'input', 'Title', 'text', book.title);
        createfieldSet(addBookForm, 'input', 'Author', 'text', book.author);
        createfieldSet(addBookForm, 'input', 'Image', 'url', book.image);
        createfieldSet(addBookForm, 'textarea', 'Plot', 'plot', book.plot);
    } else {
        createfieldSet(addBookForm, 'input', 'Title', 'text');
        createfieldSet(addBookForm, 'input', 'Author', 'text');
        createfieldSet(addBookForm, 'input', 'Image', 'url');
        createfieldSet(addBookForm, 'textarea', 'Plot', 'plot');
    }

    const btnSet = createElement('div', { classes: ['form-btn-set'] })
    const cancelBtn = createElement(
        'button',
        { classes: ['btn', 'btn-white'], type: 'button', text: 'Cancel' },
        btnSet
    );

    createElement('button', { classes: ['btn', 'btn-white'], type: 'submit', text: 'Save' }, btnSet);
    cancelBtn.addEventListener('click', cancelForm, false);
    addBookForm.addEventListener('submit', (e) => {
        if (book) {
            saveForm(e, book.id);
        } else {
            saveForm(e);
        }
    }, false);
    addBookForm.appendChild(btnSet);
    parent.appendChild(addBookForm);
}

const booksList = () => {
    const booksList = createElement('section', { classes: ['books-list'] });
    const booksArray = Object.values(JSON.parse(localStorage.getItem('books')).list);

    booksArray.forEach(book => showBookLine(book, booksList));
    upper.appendChild(booksList);
    const addBtn = createElement('button', { classes: ['btn', 'btn-white'], text: 'Add' }, upper);
    addBtn.addEventListener('click', () => {
        route('add');
    }, false);

}

const deleteBooksList = () => {
    upper.innerHTML = '';
}

const deleteLower = () => {
    lower.innerHTML = '';
}

const render = (url) => {
    const urlParams = new URLSearchParams(url.search);
    const id = urlParams.get('id');

    if (url.hash === '#add') {
        deleteLower();
        showInputForm(lower)
    }
    if (url.hash === '#edit' && id) {
        if (!id) {
            route('')
        }
        showInputForm(lower)
        deleteLower();
        showInputForm(lower, getBook(id))
    }
    if (url.hash === '#preview') {
        if (!id) {
            route('')
        }
        deleteBooksList();
        booksList();
        deleteLower();
        showBookPreview(getBook(id), lower);
    }
}

const route = (hash, id) => {
    let url = new URL(window.location.href);

    if (hash && hash !== '') {
        url.hash = '#' + hash;
    } else {
        url.hash = '';
    }
    if (id) {
        url.search = 'id=' + id;
    } else {
        url.search = '';
    }
    window.location.href = url;
    render(url)
}

window.onload = () => {
    root.classList.add('root');
    upper = createElement('section', { classes: ['upper'] }, root);
    lower = createElement('section', { classes: ['lower'] }, root);
    booksList();
    render(new URL(window.location.href));
}

window.onhashchange = function () {
    render(new URL(window.location.href));
}