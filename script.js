console.log("Runnig........")
document.querySelector('.cross').style.display = 'none';
document.querySelector('.hamburger').addEventListener("click",()=>{
    document.querySelector('.sidebar').classList.toggle('sidebargo')
    if(document.querySelector('.sidebar').classList.contains('sidebargo')){
        setTimeout(() =>{
        document.querySelector('.ham').style.display='inline'
        },350);
        document.querySelector('.cross').style.display='none'
    }
    else{
        document.querySelector('.ham').style.display='none'
        setTimeout(() =>{
            document.querySelector('.cross').style.display='inline' 
        },350);
    }
})