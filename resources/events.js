
document.getElementById("btn1").addEventListener("click", function() {
    const group = document.getElementsByClassName("charts")
    for (let i=0; i<group.length; i++) {
        group[i].style = "height: 300px; width: 100%; display: none";
    }
    document.getElementById("chartContainer1").style.display = "block"
    
  });

document.getElementById("btn2").addEventListener("click", function() {
    const group = document.getElementsByClassName("charts")
    for (let i=0; i<group.length; i++) {
        group[i].style.display = "none";
    }
    document.getElementById("chartContainer2").style.display = "block"
    
  });

document.getElementById("btn3").addEventListener("click", function() {
    const group = document.getElementsByClassName("charts")
    for (let i=0; i<group.length; i++) {
        group[i].style.display = "none";
    }
    document.getElementById("chartContainer3").style.display = "block"
    
  });

document.getElementById("btn4").addEventListener("click", function() {
    const group = document.getElementsByClassName("charts")
    for (let i=0; i<group.length; i++) {
        group[i].style.display = "none";
    }
    document.getElementById("chartContainer4").style.display = "block"
    
  });

document.getElementById("btn5").addEventListener("click", function() {
    const group = document.getElementsByClassName("charts")
    for (let i=0; i<group.length; i++) {
        group[i].style.display = "none";
    }
    document.getElementById("chartContainer5").style.display = "block"
    
  });
