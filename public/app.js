document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }

    if (event.target.dataset.type === 'edit') {
        const text = event.target.parentNode.parentNode.childNodes[0].textContent.trim()
        const data = prompt('Enter a new name', text)
        if (data !== text) {
            console.log(`Вносим изменения`)
        }
    }
})


async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

