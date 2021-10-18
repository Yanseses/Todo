import { CONSTANTS_TXT } from './constant.js';

async function patchingDeal(id, done, btnContainer){
  const type = checkStorage(btnContainer);
  if(type === 'local'){
    var { patchDeal } = await import('./local.js');
    } else {
      var { patchDeal } = await import('./api.js');
      }
  patchDeal(id, done);
  }

async function deleteDeal(id, btnContainer){
  const type = checkStorage(btnContainer);
  if(type === 'local'){
    var { deletedDeal } = await import('./local.js');
    } else {
      var { deletedDeal } = await import('./api.js');
      }
  deletedDeal(id);
  }

async function addedNewDeal(title, todoItemForm, todoList, btnContainer){
  const type = checkStorage(btnContainer);
  if(type === 'local'){
    var { newDeal } = await import('./local.js');
    } else {
      var { newDeal } = await import('./api.js');
      }
  newDeal({
    name: todoItemForm.input.value,
    owner: title
    }).then(el => {
      const todoItem = createTodoItem(el.name, el.id, el.done, btnContainer);
      todoList.append(todoItem.item);
      });
  todoItemForm.form.reset();
  todoItemForm.button.setAttribute('disabled', '');
  }

async function getList(title, todoList, btnContainer){
  const type = checkStorage(btnContainer);
  if(type === 'local'){
    var { getDeals } = await import('./local.js');
    } else {
      var { getDeals } = await import('./api.js');
      }
  getDeals(title).then(array => {
    if(array !== undefined) {
      array.forEach(el => {
        const deal = createTodoItem(el.name, el.id, el.done, btnContainer);
        todoList.append(deal.item);
        });
      }
    });
  }

function checkStorage(btnContainer){
  const typeStor = localStorage.getItem('typeStorage');
  if(typeStor){
    if(typeStor === 'local'){
      btnContainer.children[0].classList.add('active');
      } else {
        btnContainer.children[1].classList.add('active');
        }
    } else {
      btnContainer.children[0].classList.add('active');
      JSON.stringify(localStorage.setItem('typeStorage', 'local'));
      }
  return typeStor;
  }

function createElementsTags(tag, className = [], settings = null, text = null){
  const element = document.createElement(tag);
  element.classList.add(...className);
  if(settings !== null){
    for(let key in settings){
        element.setAttribute(key, settings[key]);
        }
    }
  if(text !== null){
    element.textContent = text;
    }
  return element;
  }

function createTodoItem(name, id, status, btnContainer) {
  const item = createElementsTags('li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'], {id: id});
  const text = createElementsTags('p', ['mb-0'], {id: 'text-content'}, name);
  const buttonGroup = createElementsTags('div', ['btn-group', 'btn-group-sm']);
  const doneButton = createElementsTags('button', ['btn', 'btn-success'], null, CONSTANTS_TXT.buttons.done);
  const deleteButton = createElementsTags('button', ['btn', 'btn-danger'], null, CONSTANTS_TXT.buttons.delete);

  buttonGroup.append(doneButton, deleteButton);
  item.append(text, buttonGroup);
  if(status) item.classList.add('list-group-item-success');

  doneButton.addEventListener('click', () => {
    item.classList.toggle('list-group-item-success');
    patchingDeal(item.id, item.classList.contains('list-group-item-success'), btnContainer);
    });
  deleteButton.addEventListener('click', () => {
    if (confirm(CONSTANTS_TXT.texts.confirmDelete)){
      item.remove();
      deleteDeal(item.id, btnContainer);
      }
    });

  return {item};
  }

function createTodoItemForm() {
  const form = createElementsTags('form', ['input-group', 'mb-3']);
  const input = createElementsTags('input', ['form-control'], {placeholder: CONSTANTS_TXT.placeholders.nameDeal});
  const button = createElementsTags('button', ['btn', 'btn-primary'], {btn: 'btn-primary', disabled: ''}, CONSTANTS_TXT.buttons.added);

  form.append(input, button);

  input.oninput = function(){
    if(input.value){
      button.removeAttribute('disabled');
      }
    if (input.value === ''){
      button.setAttribute('disabled', '');
      }
    }

  return { input, form, button };
  }


function createTodoApp(container, title = CONSTANTS_TXT.texts.dealList){
  const btnContainer = document.querySelector('.btn-group');
  const todoApptitle = createElementsTags('h2', ['mb-5'], null, title);
  const todoList = createElementsTags('ul', ['list-group']);
  const todoItemForm = createTodoItemForm();

  container.append(todoApptitle, todoItemForm.form, todoList);

  getList(title, todoList, btnContainer);

  todoItemForm.form.addEventListener('submit', function(e){
      e.preventDefault();

      addedNewDeal(title, todoItemForm, todoList, btnContainer);
      });

  btnContainer.addEventListener('click', e => {
    e.preventDefault();

    for (let i = 0; i < btnContainer.children.length; i++) {
      const element = btnContainer.children[i];
      if(element.classList.contains('active')){
        element.classList.remove('active');
        break;
        }
      }

    JSON.stringify(localStorage.setItem('typeStorage', e.target.id));
    todoList.textContent = '';
    getList(title, todoList, btnContainer);
    e.target.classList.add('active');
    });
  }

export { createTodoApp };
