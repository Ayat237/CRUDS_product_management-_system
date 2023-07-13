let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='Create';
let temp;

console.log(title,price,taxes ,ads,discount,total,count,category,submit)

//get total
function getTotal()
{  

    if(price.value !='')
    {   
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML= result;
        total.style.background='rgb(128, 179, 77)';
        
    }
    else
    {
        total.innerHTML= '';
        total.style.background='rgb(242, 85, 23)';

    }

}

//creat product
let data;
if(localStorage.product!=null)
{
    data=JSON.parse(localStorage.product);
}
else{
    data=[];
}

submit.onclick=function()
{
    let newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if(title.value!='' &&  price.value!='' &&category.value!=''&& newpro.count<101)
    {
    if(mood==='Create')
    {
        if(newpro.count>1)
        {
             for(let i=0;i<newpro.count;i++)
             {
                data.push(newpro);
             }
        }
        else
       {
        data.push(newpro);
       }
    }
    else{
        data[temp]=newpro;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';
    }

    }
    cleardata()
    //save local storage
    localStorage.setItem('product',JSON.stringify(data));
    cleardata()
    showdata()
}

//clear inputs
function cleardata()
{
   title.value='';
   price.value='';
   taxes.value='';
   ads.value='';
   discount.value='';
   total.innerHTML='';
   count.value='';
   category.value='';
}
//read
function showdata(){
    getTotal()
    let table='';
    for(let i=0;i<data.length;i++)
    {
        table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateaDta(${i})" id="Update">Update</button></td>
                    <td><button onclick="deleteData(${i})"  id="Delete">Delete</button></td>
                </tr>
                `;

    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteAll');
    if(data.length>0)
    {
        btndelete.innerHTML=`<button onclick="deletAll()">Delete All (${data.length})</button>`
    }
    else
    {
        btndelete.innerHTML='';

    }
}
showdata()
//count
  
//delete
function deleteData(i)
{
    data.splice(i,1);
    localStorage.product=JSON.stringify(data);
    showdata()
}
function deletAll()
{    
    localStorage.clear()
    data.splice(0)
    showdata()
    
}
//upadte
function updateaDta(i)
{
    title.value=data[i].title;
    price.value=data[i].price;
    taxes.value=data[i].taxes;
    ads.value=data[i].ads;
    discount.value=data[i].discount;
    getTotal()
    count.style.display='none'
    category.value=data[i].category;
    submit.innerHTML='Update';
    mood='Update';
    temp=i;
    scroll(
        {
            top:0,
            behavior:'smooth'
        }
    )
}
// search
let searchmood='title';
function getSearchMood(id)
{    
    
    let search=document.getElementById('search');
    if(id=='searchtitle')
    {
        searchmood='title'; 
        search.Placeholder='Search By Title';
    }
    else{
        searchmood='category';
        search.Placeholder='Search By Category';
    }
    search.focus()
    search.value='';
    showdata()

} 
function searchData(value)
{    
     let table='';
     if(searchmood='title') 
     {
        for(let i=0;i<data.length;i++)
        {
            if(data[i].title.includes(value))
            {
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateaDta(${i})" id="Update">Update</button></td>
                    <td><button onclick="deleteData(${i})"  id="Delete">Delete</button></td>
                </tr>
                `;

            }
            
        }
        }


     
     else{
        for(let i=0;i<data.length;i++)
        {
            if(data[i].title.includes(value))
            {
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateaDta(${i})" id="Update">Update</button></td>
                    <td><button onclick="deleteData(${i})"  id="Delete">Delete</button></td>
                </tr>
                `;

            }
            
        }
     }
     document.getElementById('tbody').innerHTML=table;

    }
    

//clean data