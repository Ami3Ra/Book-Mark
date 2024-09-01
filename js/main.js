var inputName  = document.getElementById("inputName");
var inputUrl  = document.getElementById("inputUrl");
var addBtn  = document.getElementById("addBtn");
var UpdateBtn  = document.getElementById("UpdateBtn");
var searchInput  = document.getElementById("searchInput");
var indexUpdate = 0;
var bookmarks = [];

if(localStorage.getItem("bookmarks-list") != null){
  bookmarks =  JSON.parse(localStorage.getItem("bookmarks-list"));
  displayBook();
}

function addBookmark(){
    var bookmark={
        name:inputName.value,
        url:inputUrl.value
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks-list",JSON.stringify(bookmarks));
    displayBook();
    addBtn.classList.remove("d-none");
    UpdateBtn.classList.add("d-none");
    // clearBook();
}
function clearBook(){
    inputName.value = " ";
    inputUrl.value = " ";
}

function displayBook(){
    var cartona = "";
    for(var i=0 ; i< bookmarks.length ; i++){
        cartona +=`
         <tr>
          <td>${i + 1}</td>
          <td>${bookmarks[i].name}</td>
          <td><button class="btn btn-info"><a onclick="visited_url('${bookmarks[i].url}')">visit</a></button></td>
          <td><button onclick="setBook(${i})" class="btn btn-warning">Update</td>
          <td><button onclick="deleteBook(${i})" class="btn btn-danger ">Delete</td>
        </tr>
        `
    };
    document.getElementById("tableBody").innerHTML = cartona;
}
function visited_url(visitUrl){
    console.log(visitUrl);
    window.open(visitUrl ,'_blank');
}
function deleteBook(index){
    bookmarks.splice(index,1);
    displayBook();
    console.log(bookmarks);
}
function searchBook(){
    var book = searchInput.value;
    var cartona = "";
    for(var i=0 ; i< bookmarks.length ; i++){
     if(bookmarks[i].name.toLowerCase().includes(book.toLowerCase())){  
        cartona +=`
         <tr>
          <td>${i}</td>
          <td>${bookmarks[i].name}</td>
          <td><button class="btn btn-info"><a href="${bookmarks[i].url}">visit</a></button></td>
          <td><button class="btn btn-warning">Update</td>
          <td><button onclick="deleteBook(${i})" class="btn btn-danger ">Delete</td>
        </tr>
        `
     }
    };
    document.getElementById("tableBody").innerHTML = cartona;
}
function setBook(index){
    indexUpdate = index;
    var book_update = bookmarks[index];
    inputName.value = book_update.name;
    inputUrl.value = book_update.url;

    UpdateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");

}
function updateBook(){
    var books={
        name:inputName.value,
        url:inputUrl.value
    }

    bookmarks.splice(indexUpdate ,1 , books);
    displayBook();
    clearBook();
    
    UpdateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
}
