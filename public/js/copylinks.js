var buttons = document.getElementsByClassName('copy-btn')

for(var i = 0; i< buttons.length; i++){
    const button = buttons[i];
    button.addEventListener('click', function(){
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummyid");
        document.getElementById("dummyid").value = button.getAttribute('copytext');
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        window.location.replace(`http://${button.getAttribute('successredirect')}`);
    })
}