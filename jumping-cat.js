let cat_moving = false;
let current_mouse_x = 0;
let current_mouse_y = 0;

document.addEventListener('mousemove', function(event) {
    current_mouse_x = event.clientX;
    current_mouse_y = event.clientY;
});

function cat_jump(event) {
    function get_postions(cat) {
        let cat_bbox = cat.getBoundingClientRect();
        let cat_x = cat_bbox.left + cat_bbox.width / 2;
        let cat_y = cat_bbox.top + cat_bbox.height / 2;

        return [cat_x, cat_y, current_mouse_x, current_mouse_y, cat_bbox]
    }

    const jump_range = 500;
    const catch_range = 20;
    let container = document.getElementById("cat-container");
    let cat = document.getElementById("cat");
    const speed = 3;

    let positions = get_postions(cat);
    let dx = positions[2] - positions[0];
    let dy = positions[3] - positions[1];
    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if (!cat_moving && document.body.style.cursor !== "none" && container.matches(":hover")) {
        let move_cat = setInterval(function () {
            cat_moving = true;
            positions = get_postions(cat, event);

            dx = positions[2] - positions[0];
            dy = positions[3] - positions[1];

            distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            if (distance <= catch_range) {
                document.body.style.cursor = "none";
                setTimeout(function () {
                    document.body.style.cursor = "default";
                }, 5000)
                clearInterval(move_cat);
                cat_moving = false;
            } else if (distance < jump_range) {
                let angle = Math.atan2(dy, dx);
                let x_velocity = speed * Math.cos(angle);
                let y_velocity = speed * Math.sin(angle);

                cat.style.left = (parseFloat(cat.style.left) || 0) + x_velocity + "px";
                cat.style.top = (parseFloat(cat.style.top) || 0) + y_velocity + "px";

                console.log(`mouse pos ${[positions[0], positions[1]]} | cat pos ${[positions[2], positions[3]]} | d (${dx}; ${dy})`)
            } else {
                console.log("too far")
                clearInterval(move_cat);
                cat_moving = false;
            }
        }, 1);
    }
}