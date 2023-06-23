const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const main = document.querySelector('#main')
const inLocSt = document.querySelector('#inLocSt')

btn.addEventListener('click', () => {
    main.innerHTML = ''

    const url = 'http://127.0.0.1:3000'
    const data = {
        text: input.value
    };
    const customHeaders = {
        "Content-Type": "application/json",
    }

    fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(data => {
            data = data.links

            data.map(el => {
                const element = document.createElement('div')
                element.className = 'element'
                element.innerText = el[0]

                element.addEventListener('click', (e) => {
                    const link = {
                        text: el[1]
                    };
                    const urlLinks = 'http://127.0.0.1:3000/links'
                    fetch(urlLinks, {
                        method: "POST",
                        headers: customHeaders,
                        body: JSON.stringify(link),
                    })
                        .then(res => res.json())
                        .then(data => {
                            data = data.result
  
                            localStorage.setItem('data', data)
                            inLocSt.innerHTML = localStorage.getItem('data')
                        });
                });
                main.appendChild(element)
            });
        });
});

inLocSt.innerHTML = localStorage.getItem('data')