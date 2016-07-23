/*
 * ================================================================================================
 * Settings...
 * Author BigTows
 * ================================================================================================
 */
var nameInDOM = "box"; // Name Element on DOM 
var MaxY = 10; //Max Horizontal Offset (Min Offset == (-MaxY))
var MaxX = 10; //Max Horizontal Offset (Min Offset == (-MaxX))
var ColorShadow = "rgba(101, 101, 101, 0.2)"; //Use RBG(a) or Hex or HSLA
var Blur = 20; //Blur 
var Spread = 10; // Spread
var inSet = false; // inSet
var Mode = 0; // 0 - Surveillance of the cursor 1 - Central point
/*
 * ================================================================================================
 * Code...
 * ================================================================================================
 */
Blur += "px ";
Spread += "px ";
var MouseCoords = {
    // X
    getX: function (e) {
        if (e.pageX) {
            return e.pageX;
        }
        else if (e.clientX) {
            return e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
        }
        return 0;
    }, // Y
    getY: function (e) {
        if (e.pageY) {
            return e.pageY;
        }
        else if (e.clientY) {
            return e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
        }
        return 0;
    }
}
document.onmousemove = function (e) {
    if (!e) e = window.event;
    MouseX = MouseCoords.getX(e);
    MouseY = MouseCoords.getY(e);
    Shadow();
}

function Shadow() {
    for (var obj = document.getElementsByName(nameInDOM), j = 0; j < obj.length; j++) {
        if (Mode == 0) {
            X = obj[j].offsetWidth + obj[j].offsetLeft;
            Y = obj[j].offsetHeight + obj[j].offsetTop;
            Y = ((MouseY + obj[j].offsetHeight / 2) - Y);
            X = ((MouseX + obj[j].offsetWidth / 2) - X);
        }
        else if (Mode == 1) {
            X = (MouseX * 30 / 100) / 2 - obj[j].offsetWidth / 2;
            Y = (MouseY * 30 / 100) / 2 - obj[j].offsetHeight / 2;
        }
        if (X > MaxX) {
            X = MaxX;
        }
        else if (X < -MaxX) {
            X = -MaxX;
        }
        if (Y > MaxY) {
            Y = MaxY;
        }
        else if (Y < -MaxY) {
            Y = -MaxY;
        }
        var StyleResult = X + "px " + Y + "px " + Blur + Spread + ColorShadow;
        if (inSet) {
            StyleResult += " inset";
        }
        obj[j].style.boxShadow = StyleResult;
    }
}
