$(document).ready(function(){
    let gameplaydiv, signupbtn, loginbtn;

    $("#playbtn").click(function(){
        $(this).slideUp();
        gameplaybtns();        
    })

    function gameplaybtns(){
        gameplaydiv = document.createElement("div");
        gameplaydiv.className = "gameplaydiv";
        $("#borderdiv").append(gameplaydiv);

        signupbtn = document.createElement("a");
        signupbtn.className = "gameplaybtn animated fadeInUp hvr-sweep-to-right";
        $(signupbtn).text("Sign Up!");
        $(signupbtn).css("cursor", "pointer");
        gameplaydiv.appendChild(signupbtn);

        loginbtn = document.createElement("a");
        loginbtn.className = "gameplaybtn animated fadeInUp hvr-sweep-to-right";
        $(loginbtn).text("Log In");
        $(loginbtn).css("cursor", "pointer");
        gameplaydiv.appendChild(loginbtn);
    }

})