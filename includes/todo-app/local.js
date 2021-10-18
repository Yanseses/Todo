export function newDeal(object){
  return new Promise((resolve) => {
    let array = [];
    object.id = '1629454' + Math.floor(Math.random() * (999999 - 111111) + 1)
    object.done = false;

    if(!localStorage.getItem('Deals')){
      array.push(object);
      localStorage.setItem('Deals', JSON.stringify(array))
      } else {
        array = JSON.parse(localStorage.getItem('Deals'));
        array.push(object);
        localStorage.setItem('Deals', JSON.stringify(array))
        }
      resolve(object);
    });
  }

export function getDeals(title){
  return new Promise((resolve, reject) => {
    let array = [];
    array = JSON.parse(localStorage.getItem('Deals'));
    if(array !== null){
      let filteredArr = array.filter(el => {
        if(el.owner === title) return el;
        });
      if(filteredArr !== null) {
        resolve(filteredArr);
        } else {
          reject('Локальный массив пустой')
        }
      }
    });
  }

export function deletedDeal(id){
  let data = JSON.parse(localStorage.getItem('Deals'));
  if(data !== null){
    let filtered = data.filter(el => {
      if(el.id !== id) return el;
      })
    localStorage.setItem('Deals', JSON.stringify(filtered))
    }
  }

export function patchDeal(id, done){
  let data = JSON.parse(localStorage.getItem('Deals'));
  let filtered = data.map(el => {
    if(el.id !== id){
      return el;
      } else {
        el.done = done;
        return el;
        }
    });
  localStorage.setItem('Deals', JSON.stringify(filtered))
  }
