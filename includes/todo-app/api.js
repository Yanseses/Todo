import { CONSTANTS_API } from './constant.js';

export async function newDeal(deal){
  const data = await fetch(CONSTANTS_API.url, {
    method: CONSTANTS_API.methods.post,
    headers: {
      'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      name: deal.name,
      owner: deal.owner,
      })
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
        return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
      }).then(response => {
        return response.json();
        });
    return data;
  }

export async function getDeals(owner){
  const data = await fetch(CONSTANTS_API.url, {
    method: CONSTANTS_API.methods.get,
    headers: {
      'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
        return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
      }).then(response => {
        return response.json();
        });
    if(data.length > 0){
      let newData = data.filter(el => {
        if(el.owner === owner) return el;
      });
      return newData;
      }
  }

export async function deletedDeal(id){
  const data = await fetch(CONSTANTS_API.url + id, {
    method: CONSTANTS_API.methods.delete,
    headers: {
      'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
        return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
      });
  }

export async function patchDeal(id, done){
  const data = await fetch(CONSTANTS_API.url + id, {
    method: CONSTANTS_API.methods.patch,
    headers: {
      'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      done: done,
      })
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
        return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
      });
  }