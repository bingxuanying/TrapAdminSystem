document.getElementById("signup").addEventListener("click", function() {
    document.querySelector("#register-modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function() {
    document.querySelector("#register-modal").style.display = "none"
});
