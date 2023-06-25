
"use strict";


// სატესტო
let arr=[1]
console.log(arr);




// ფილტრი

let result = document.getElementById("result");
let inputFilter = document.getElementById("filter");
let listItems = [];

function getUsersName() {
  fetch("https://search.idigbio.org/v2/search/records/?rq=%7B%22data.dwc%3AdynamicProperties%22%3A%22nsf_tcn%22%7D&limit=1&fbclid=IwAR09WfcyxYMNVPhI_7SyChymT8uW6aVih9xYboTzuBJSdZ5hg7RWaZgk6X0", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((responseData) => {

      responseData.items.forEach((item) => {
        let li = document.createElement("li");

        let pName = document.createElement("p");
        pName.textContent = `${item.type}`;

        li.appendChild(pName);
        listItems.push(li);
        console.log(listItems);
        result.appendChild(li);
      });
    })
    .catch((error) => console.log(error));
}
getUsersName();


function filterData(searchItem) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchItem.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}





let scrolltop=document.getElementById('top');
scrolltop.addEventListener('click', ()=>{
    window.scrollTo({top:0 })
})

// სლაიდერი

const dataSlider = [
    {
      id: 1,
      imageUrl:
      "https://img.freepik.com/free-photo/examining-sample-with-microscope_1098-18424.jpg?w=740&t=st=1687014099~exp=1687014699~hmac=0fee8e5f6f776bc7047378973e27bfef6d727eb2e90d569c89ed8da0d91424f8",
      title: "Laboratory Services",
    },
    {
      id: 2,
      imageUrl:
      "https://img.freepik.com/free-photo/woman-looking-tube-medium-shot_23-2148969962.jpg?w=740&t=st=1687024064~exp=1687024664~hmac=d45de651756df0b95664bc1b46cac47185ebc50703a95ebcdddb436a74633ddd",
      title: "Recent Researches",
    },
    {
      id: 3,
      imageUrl:
      "https://img.freepik.com/free-photo/close-up-hands-holding-petri-dish_23-2148882087.jpg?w=740&t=st=1687024077~exp=1687024677~hmac=9940447bc5ecf39686e8e23601bfa9980b85bea6eccd15a56613b11ad7768030",
      title: "Laboratory equipment",
    },
    {
      id: 4,
      imageUrl:
      "https://img.freepik.com/free-photo/medium-shot-scientists-laboratory_23-2148882091.jpg?w=740&t=st=1687029158~exp=1687029758~hmac=e0710b33936f93917d6c382b1ea479b782a5155ec2ef40216aad11785e534c5e",
      title: "Our Team",
    },
  ];
  
  const sliderContent = document.getElementById("slider-content");
  const arrowLeft = document.getElementById("arrow-left");
  const arrowRight = document.getElementById("arrow-right");
  let sliderIndex = 0;
  
  
  function createDivTag() {
    let div = document.createElement("div");
    
    return div;
  }
  

  function createImgTag(item) {
    let tagImage = document.createElement("img");
    tagImage.setAttribute("src", `${item.imageUrl}`);
    tagImage.setAttribute("alt", `${item.title}`);
  
    
  
    return tagImage;
  }
  
  
  function createTitle(item) {
    let titleTag = document.createElement("h2");
    titleTag.classList.add('slidertitle');
    titleTag.innerText = `${item.title}`;
  
    return titleTag;
  }
  
  
  function slide() {
    sliderContent.innerHTML = " ";
    let slideItem = createDivTag();
    let imgTag = createImgTag(dataSlider[sliderIndex]);
    let h2Tag = createTitle(dataSlider[sliderIndex]);
  
    slideItem.appendChild(imgTag);
    slideItem.appendChild(h2Tag);
  
    sliderContent.appendChild(slideItem);
  
  }
  


  function arrowLeftClick() {
    if (sliderIndex == 0) {
      sliderIndex = dataSlider.length - 1;
      slide();
      return;
    }
    sliderIndex -= 1;
    slide();
  }
  
  function arrowRightClick() {
    if (sliderIndex == dataSlider.length - 1) {
      sliderIndex = 0;
      slide();
      return;
    }
    sliderIndex += 1;
    slide();
  }
  
  arrowLeft.addEventListener("click", arrowLeftClick);
  arrowRight.addEventListener("click", arrowRightClick);
  
  setInterval(() => {
    arrowRightClick();
  }, 2000);
  
  slide();

//   ფორმის ვალიდაცია 

  let formELement = document.getElementById("registration-form");

formELement.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = {};

  let usernameValue = document.getElementById("username-field").value;
  if (usernameValue == ''){
    errors.username = "username field can not be empty";
  }
  
  

  //password
  let passw1 = document.getElementById("password-field1").value;
  let passw2 = document.getElementById("password-field2").value;

  if (passw1 == "") {
    errors.password = "Password field can not be empty";
  }
  if (passw2 == "") {
    errors.password2 = "This field can not be empty"
  }
  if (passw1 != passw2) {
    errors.password2 = "Password do not match";
  }

  //radio
  let userAge = false;

  document.querySelectorAll('[name="age"]').forEach((item) => {
    if (item.checked) {
      userAge = true;
    }
  });

  if (!userAge) {
    errors.age = "Please Selct your Age";
  
  }

  //checkbox
  let agree = document.getElementById("agree").checked;

  if (!agree) {
    errors.agree = "You must agree our terms and conditions";
  }

  console.log(errors);

  document.querySelectorAll(".error-text").forEach((item) => {
    item.textContent = "";
  });

  //შეცდომების ტექსტები
  for (let objectKey in errors) {
    

    let pErrorElement = document.getElementById("error-" + objectKey);
    console.log(pErrorElement);

    if (pErrorElement) {
      pErrorElement.textContent = errors[objectKey];
    }
  }

  if (Object.keys(errors).length == 0) {
    formELement.submit();
  }
});



// show hide password
let passwordField = document.getElementById("password-field1");
let toggleIcon = document.getElementById("toggleIcon");

toggleIcon.addEventListener("click", function () {
  if (passwordField.type == "password") {
    passwordField.setAttribute("type", "text");
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.setAttribute("type", "password");
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
});


// email regex

let emailField = document.getElementById("emailField");

emailField.addEventListener("keyup", function () {
  let emailValue = document.getElementById("emailField").value
  let pErrorEmail = document.getElementById("error-email");
  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  

  if (emailValue.match(emailPattern)) {
    pErrorEmail.textContent = "Your Email is Valid";
    
  } else {
    pErrorEmail.textContent = "Your Email is Invalid";
    pErrorEmail.style.color = "red";
    emailField.style.outline = "none";
    emailField.style.border = "2px solid red";
  }

  if (emailValue == "") {
    
    
    pErrorEmail.innerHTML = "This field can not be empty";
  
  };
});


// ქუქი


const cookieBox = document.querySelector(".cookiewrapper"),


acceptBtn = cookieBox.querySelector(".buttons button");

acceptBtn.onclick = () => {
    document.cookie="cookieBy=CodingNepal; max-age="+60*60*24*30
    if(document.cookie){
        cookieBox.classList.add("hide");

    } else{
        alert("cookie can't be set!");
    }
}



// ბურგერბარი

let navigationElement = document.getElementById("nav");
let burgerElement = document.getElementById("toggleButton");
let navulelement= document.getElementById('nav-ul');
let bodyelement= document.getElementById('body');

burgerElement.addEventListener("click", function () {
  navigationElement.classList.toggle("activeNav");
  burgerElement.classList.toggle("activeLine");
  navulelement.classList.toggle('inactive');
  bodyelement.classList.toggle("active")
});

// აკორდიონი

let accordionItem = document.querySelectorAll(".accordion-item");
console.log(accordionItem);

for (let item of accordionItem) {
  item.addEventListener('click', function(e) {
    this.classList.toggle('activeAccordion');
  });
}

// სერვერიდან ინფორმაცია

// axios-get
axios.get("https://search.idigbio.org/v2/search/records/?rq=%7B%22data.dwc%3AdynamicProperties%22%3A%22nsf_tcn%22%7D&limit=1&fbclid=IwAR133jQrAHQPTwRX7qk74_qcAVXxdXU_yauXPMURnbHqzOPGZDdwWbdbMFs").then((response)=>console.log('axious', response.data));

// axious-delete
axios.delete("https://search.idigbio.org/v2/search/records/?rq=%7B%22data.dwc%3AdynamicProperties%22%3A%22nsf_tcn%22%7D&limit=1&fbclid=IwAR2IVcbMrtLD93gVjfx0J9Et9gK24bLWdFdmEJv3-EarQ1odWtPTUV-kmek/\'urn:uuid:6c7c37d2-f9e4-4011-85ae-3a76f4df85f1")
.then(re => console.log(re))
.catch(err=>console.log(err))


// xml-get
let requist = new XMLHttpRequest();

requist.addEventListener("load", function () {
  let mosuliInfo = requist.responseText;
  let mosuliInfoJs = JSON.parse(mosuliInfo);

  let ulItem = document.createElement("ul");

  mosuliInfoJs.items.forEach((element) => {
    let li = document.createElement("li");

    let pDescr = document.createElement("p");
    pDescr.textContent = `${element.etag}`;

   

    li.appendChild(pDescr);
    ulItem.appendChild(li);
    console.log(ulItem);
  }); });


requist.open("GET", "https://search.idigbio.org/v2/search/records/?rq=%7B%22data.dwc%3AdynamicProperties%22%3A%22nsf_tcn%22%7D&limit=1&fbclid=IwAR133jQrAHQPTwRX7qk74_qcAVXxdXU_yauXPMURnbHqzOPGZDdwWbdbMFs");
requist.send();


// xml-post 

var http = new XMLHttpRequest();
var url = "https://jsonplaceholder.typicode.com/posts";
var method = "POST";
var data = "title=newpost&body=body";

http.open(method, url);
http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
http.onreadystatechange = function (){
  if (http.readyState === XMLHttpRequest.DONE && http.status === 201){
    console.log(JSON.parse(http.responseText));
  } else if (http.readyState === XMLHttpRequest.DONE % http.status!== 201)
  console.log("Error");
}

 http.send(data);



// async await with fetch


async function myAsyncFunction() {
  let responseInfo = await fetch("https://search.idigbio.org/v2/search/records/?rq=%7B%22data.dwc%3AdynamicProperties%22%3A%22nsf_tcn%22%7D&limit=1&fbclid=IwAR133jQrAHQPTwRX7qk74_qcAVXxdXU_yauXPMURnbHqzOPGZDdwWbdbMFs");
    

  if (responseInfo.status !== 200) {
    throw new Error("can not fetch data");
  }

  let dataInfo = await responseInfo.json();
  return dataInfo;
}

myAsyncFunction()
  .then((dataInfo) => console.log(dataInfo))
  .catch((error) => console.log(error));

