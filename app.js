const servicesList = document.querySelector('#services-details-list');
const form = document.querySelector('#add-service-form');

function renderServicesDetails(doc){
    
    let li = document.createElement('li');
    let contact = document.createElement('span');
    let contact1 = document.createElement('span');
    let description =document.createElement('span');
    let cross = document.createElement('div');
    // let images =document.createElement('span');
    // let name =document.createElement('span');
    // let payment_pattern =document.createElement('span');
    let pricing =document.createElement('span');
    let pricing1 =document.createElement('span');

    li.setAttribute('data-id', doc.id);
    contact.textContent =`Name : ${doc.data().contacts[0].name}`;
    contact1.textContent = `Phone Number : ${doc.data().contacts[0].number}`;
    description.textContent = `Hall Name : ${doc.data().description}`;
    cross.textContent = 'x';
    pricing.textContent = `Service : ${doc.data().pricing[0].description}`;
    pricing1.textContent = `price : ${doc.data().pricing[0].price}`;

    li.appendChild(contact);
    li.appendChild(contact1);
    li.appendChild(description);
    li.appendChild(cross);
    li.appendChild(pricing);
    li.appendChild(pricing1);
   
    servicesList.appendChild(li);
  
    cross.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('services').doc(id).delete();
    })
}

// db.collection('services').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderServicesDetails(doc);
//     })
// })
    
form.addEventListener('submit', (e)=>{
   e.preventDefault();
   db.collection('services').add({
       contacts: [{name:form.name.value,number:form.number.value}],
       description: form.hall.value,
      
       name:form.hall.value,
       
       pricing:[{description: form.service.value, name: 'Advance', price: form.amount.value}],
   }); 
   form.name.value = '';
   form.number.value = '';
//    form.service.value = '';
   form.hall.value = '';
   form.amount.value = '';
});

db.collection('services').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderServicesDetails(change.doc);
        } else if(change.type == 'removed'){
            let li = servicesList.querySelector('[data-id='+change.doc.id+']');
            servicesList.removeChild(li);
        }
    })
})
