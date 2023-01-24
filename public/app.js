document.addEventListener('click', event => {
    // обработка нажатия на кнопку "Удалить"
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }

    // обработка нажатия на кнопку "Изменить"
    if (event.target.dataset.type === 'edit') {
        const element = event.target.parentNode.parentNode.childNodes[0]
        const text = element.textContent.trim()
        const newText = prompt('Enter a new name', text)
        const id = event.target.dataset.id
        if (newText !== null && newText !== text) {
            edit(id, newText).then(() => {
                element.textContent = newText
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id, text) {
    const options = {
        method: 'PUT',
        body: JSON.stringify({text: text}),
        headers: {'Content-Type': 'application/json'}
    }

    await fetch(`/${id}`, options)
}