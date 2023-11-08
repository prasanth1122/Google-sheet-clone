let coloums = 26;
const mainheader=document.querySelector(".mainheader");
const snobar= document.querySelector(".sno");
console.log(mainheader)
function mainheadercells(){
    for(let i=0; i<=coloums; i++){
        const headcell=document.createElement("div");
        headcell.className="mainheadercell"
        mainheader.appendChild(headcell);
        if(i!=0){
            headcell.innerText=String.fromCharCode(64+i);
        }
        if(i==0){
            headcell.classList.add("firstheadcell")
        }
    }
}

mainheadercells();




function snocells(){
   
    for(let i=1; i<=100; i++){
        const snocell = document.createElement("div");
        snocell.className="sno_cell";
        snocell.innerText=i;
        snobar.appendChild(snocell)

    }
}
snocells();











///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const defaultproperties={
    fontSize:"16",
    color:"#000000",
    backgroundColor:"#e7eded",
    textAlign:"left",
    isBold:false,
    isItalic:false,
    isUnderline:false,
    fontFamily:"sans",
    value:'',

}
let activeElement=null;
const fontsize=document.getElementsByClassName("fontsize")[0];
const fontfamily = document.getElementsByClassName("fontfamily")[0];
const form =document.getElementsByClassName("options")[0];
console.log(fontfamily, fontsize)
let state={
    

};

function onfocus(event){
    let elementcell=event.target;
    let elementid = event.target.id;
    document.getElementsByClassName("idnumber")[0].innerText=event.target.id;
    
    activeElement=event.target;
    if(state[elementid]){
        resetoptions(state[elementid])
    }
    else{
        resetoptions(defaultproperties)

    }
    
}

function resetoptions(optionstate){
      form.fontfamily.value=optionstate.fontFamily;
      form.fontsize.value=optionstate.fontSize;
      form.bold.checked=optionstate.isBold;
      form.italic.checked=optionstate.isItalic;
      form.underline.checked=optionstate.isUnderline
      form.color.value=optionstate.color;
      form.bgcolor.value=optionstate.backgroundColor
    
}


const mainmain =document.querySelector(".mainmain");
function createrowcells(rownumber){
   const row = document.createElement("div");
   row.className="mainrows"
    for(let i=1; i<=coloums; i++){
           const rowcell=document.createElement("div");
           rowcell.className="rowcell";
           rowcell.id=String.fromCharCode(64+i)+rownumber;
           rowcell.addEventListener("focus", onfocus);
           rowcell.addEventListener("input", onformchange);
           rowcell.addEventListener("click", showmodal)
           rowcell.contentEditable=true;
           row.appendChild(rowcell);
    }
    mainmain.appendChild(row)
}

function showmodal(event){
    let elementcells = event.target;
    const modal = document.createElement("div");
    modal.class="showmodal";
    const edit =document.createElement("button")
    edit.innerText='Edit';


    const add = document.createElement("button")
    add.innerText='Add'
    modal.appendChild(edit)
    modal.appendChild(add)
    elementcells.appendChild(modal)
    console.log(modal)
    


    }


function rowscreate(){
    for(let i=0;i<100; i++){
        createrowcells(i+1);
    }
}
rowscreate();
function onformchange(){
    if(!activeElement){
        alert("Select cell to make changes")
        form.reset();


    }
    let currentstate={
        color: form.color.value,
        backgroundColor:form.bgcolor.value,
        fontFamily:form.fontfamily.value,
        fontSize: form.fontsize.value,
        isBold:form.bold.checked,
        isItalic:form.italic.checked,
        isUnderline:form.underline.checked,
        textAlign:form.textalign.value


    }
    applystylestocell(currentstate);
    state[activeElement.id]={...currentstate, value:activeElement.innerText};
}
function applystylestocell(stylecell){
    activeElement.style.fontSize=`${stylecell.fontSize}px`;
    activeElement.style.fontFamily=stylecell.fontFamily;
    activeElement.style.color=stylecell.color;
    activeElement.style.backgroundColor=stylecell.backgroundColor;
    activeElement.style.textAlign=stylecell.textAlign;
    if(stylecell.isBold){
        activeElement.style.fontWeight='600';
    }
    else{
        activeElement.style.fontWeight='normal';
    }
    if(stylecell.isItalic){
        activeElement.style.fontStyle='italic'
    }
    else{
        activeElement.style.fontStyle='normal'
    }
    if(stylecell.isUnderline){
        activeElement.style.textDecoration='underline'
    }
    else{
        activeElement.style.textDecoration='none'
    }
    

}

// Export data

function exportdata(){
    let filedata = JSON.stringify(state);
    let blob=new Blob([filedata],{type:"application/json"})
     let url = URL.createObjectURL(blob);
     let link = document.createElement("a")
     link.href = url
     link.download="sheet.json"
     link.click();


}

//function bar
const functionbar = document.getElementsByClassName("functionbar")[0];
functionbar.addEventListener("keypress", enterkey)
function enterkey(event){
    if(event.key=='Enter'){
        
        activeElement.innerText=eval(functionbar.value);
    }
}

//////////
let state1;
const c =document.getElementById("uploads")
c.onchange = () => {
    const selectedFile = c.files[0];
    console.log(selectedFile);
    let fr=new FileReader(selectedFile); 
    fr.readAsText(selectedFile)
    fr.onload = function() {
        let cells=document.getElementsByClassName("rowcell")
        state1=JSON.parse(fr.result);
        console.log(state1, cells)
        for(let x of cells){
            let idss=x.id
            
            x.innerText="";
        }
        let keys=[]
        for (let key in state1) {
            keys.push(key);
        }
        console.log(keys)
        for(let x of keys){
            let chosencell=document.getElementById(x)
            chosencell.innerText=state1[x].value
            chosencell.style.fontSize=`${state1[x].fontSize}px`;
            chosencell.style.fontFamily=state1[x].fontFamily;
            chosencell.style.color=state1[x].color;
            chosencell.style.backgroundColor=state1[x].backgroundColor;
            chosencell.style.textAlign=state1[x].textAlign;
            state[x]=state1[x]
        }
      };
    
    
              
  }
  

///// Add Sheets
const add2 =`<input type="radio" id="" class="hides" name="a1" >
<label class="sheets" style="color: #000000;  text-align: center; padding: 10px;" for="">cbcnbc</label>`

const addsheets=document.getElementsByClassName("addpages")[0];
const form2 =document.getElementById("form2");
let a =1;
let hidesbar=document.getElementsByClassName("hides")
let sheetbar=document.getElementsByClassName("sheets")
addsheets.addEventListener("click", function(e){
    
    a++;
      form2.innerHTML+=add2
     
      hidesbar[hidesbar.length-1].id=`sheet${a}`
      sheetbar[sheetbar.length-1].htmlFor=`sheet${a}`
      sheetbar[sheetbar.length-1].innerText=`Sheet${a}`
      
      hidesbar[hidesbar.length-1].checked=true;
      
      

})


