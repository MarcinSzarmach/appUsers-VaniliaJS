/*jshint esversion: 6 */

let url = "https://jsonplaceholder.typicode.com/users";

let app = {
    list: [],
    clearList: () => {
        let list = document.getElementById("users");
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    },
    renderList: () => {
        app.clearList();
        let list = document.getElementById("users");
        for (let index = 0; index < app.list.length; index++) {
            let node = document.createElement("LI");

            addNode(app.list[index].username, node);
            addNode(app.list[index].name, node);
            addNode(app.list[index].email, node);
            addNode(app.list[index].phone, node);

            let a = document.createElement("a");
            let textnode = document.createTextNode(app.list[index].website);
            a.href = `https://${app.list[index].website}`;
            a.setAttribute('target', '_blank');
            a.appendChild(textnode);
            node.appendChild(a);

            a = document.createElement("a");
            textnode = document.createTextNode('Delete this');
            a.href = '#';
            a.setAttribute('index', index);
            a.classList.add('removeItem');
            a.appendChild(textnode);
            node.appendChild(a);

            list.appendChild(node);
        }
        function addNode(elem, node) {
            let span = document.createElement("span");
            let textnode = document.createTextNode(elem);
            span.appendChild(textnode);
            node.appendChild(span);
        }
        app.addListeners();
    },
    addListeners: () => {
        let removeButton = document.querySelectorAll('.removeItem');
        for (let index = 0; index < removeButton.length; index++) {
            removeButton[index].addEventListener('click', (e) => {
                app.removeUser(e)
            });
        }
    },
    addUser: () => {
        let newUser = {
            name: document.querySelector('#addUser #name').value,
            username: document.querySelector('#addUser #username').value,
            email: document.querySelector('#addUser #email').value,
            phone: document.querySelector('#addUser #phone').value,
            website: document.querySelector('#addUser #website').value,
        };
        app.list.push(newUser);
        app.renderList();
        let inputsAddUser = document.querySelectorAll('#addUser input');
        for (let index = 0; index < inputsAddUser.length; index++) {
            inputsAddUser[index].value = '';
        }
    },
    removeUser: (e) => {
        e.preventDefault();
        let index = e.target.getAttribute('index');
        app.list.splice(index, 1);
        app.renderList();
    },
    init: (url) => {
        fetch(url).then(response => {
            response.json().then(data => {
                app.list = data;
                app.afterInit();
            });
        });
    },
    afterInit: () => {
        app.renderList();
        let removeAllButton = document.querySelector('#removeAllUsers');
        removeAllButton.addEventListener('click', () => {
            app.list = [];
            app.renderList();
        });
        let addButton = document.querySelector('#addUserButton');
        addButton.addEventListener('click', () => {
            app.addUser();
        });
        let elemetsOfAddUser = document.querySelector('#addUser')
        elemetsOfAddUser.addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                app.addUser();
            }
        });
    }
};

app.init(url);