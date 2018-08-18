document.addEventListener('DOMContentLoaded', () => {
    console.log('App loaded')

    const header = document.getElementById('header')

    const homeOption = document.getElementById('home-option')
    const productOption = document.getElementById('product-option')
    const integrationOptions = document.getElementById('integration-option')

    const homeSection = document.getElementById('hero')
    const productSection = document.querySelector('#product-content span')
    const integrationSection = document.querySelector('#integration-content')

    const python = document.getElementById('python')
    const javascript = document.getElementById('javascript')
    const node = document.getElementById('node')
    const java = document.getElementById('java')
    const php = document.getElementById('php')

    // Set default language shown
    python.style.color = '#222f3e'

    const editor = document.querySelector('#code-editor p')

    homeOption.onclick = () => {
        window.scroll({
            behavior: 'smooth',
            top: 0
        })
    }

    productOption.onclick = () => {
        productSection.scrollIntoView({
            behavior: 'smooth'
        })
    }

    integrationOptions.onclick = () => {
        integrationSection.scrollIntoView({
            behavior: 'smooth'
        })
    }

    window.onscroll = () => {
        if (window.pageYOffset == 0) {
            header.style.boxShadow = 'none'
        } else {
            header.style.boxShadow = '1px 1px 5px rgba(0, 0, 0, 0.1)'
        }
    }

    python.onclick = () => {
        python.style.color = '#222f3e'
        javascript.style.color = '#fdcb6e'
        node.style.color = '#fdcb6e'
        java.style.color = '#fdcb6e'
        php.style.color = '#fdcb6e'

        showEditor('python')
    } 
    javascript.onclick = () => {
        python.style.color = '#fdcb6e'
        javascript.style.color = '#222f3e'
        node.style.color = '#fdcb6e'
        java.style.color = '#fdcb6e'
        php.style.color = '#fdcb6e'
    }
    node.onclick = () => {
        python.style.color = '#fdcb6e'
        javascript.style.color = '#fdcb6e'
        node.style.color = '#222f3e'
        java.style.color = '#fdcb6e'
        php.style.color = '#fdcb6e'
    }
    java.onclick = () => {
        python.style.color = '#fdcb6e'
        javascript.style.color = '#fdcb6e'
        node.style.color = '#fdcb6e'
        java.style.color = '#222f3e'
        php.style.color = '#fdcb6e'
    }
    php.onclick = () => {
        python.style.color = '#fdcb6e'
        javascript.style.color = '#fdcb6e'
        node.style.color = '#fdcb6e'
        java.style.color = '#fdcb6e'
        php.style.color = '#222f3e'
    }

    function showEditor(lang) {
        if (lang == 'python') {

        }
    }
})