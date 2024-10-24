const style = document.createElement('style');
style.textContent = `
    .content {
    grid-row: 3/4;
    margin-top: 23px;
    box-shadow: 0px -4px 3px 2px #00000024;
    height: fit-content;
    }

    .task {
    width: 100%;
    height: 14%;
    background-color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    position: relative;
    cursor: pointer;
    border-bottom: .6px solid var(--Light-Grayish-Blue);
    transition: background-color .9s ease-in;
    display: none;
    }
    
    .target {
    font-weight: 400;
    font-size: 25px;
    text-indent: 15%;
    line-height: 75px;
    }

    #done {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    left: 30px;
    top: 30%;
    cursor: pointer;
    border: 1px solid var(--Light-Grayish-Blue);
    transition: 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    }

    #done:hover {
    border-color: transparent; 
    outline: 2px solid transparent;
    outline-offset: -2px;
    background: linear-gradient(white, white) padding-box, 
                var(--Check-Background) border-box;
    }

    #done .imgdone {
    width: 15px;
    height: 15px;
    display: none;
    }

    .cross {
    position: absolute;
    right: 30px;
    top: 40%;
    cursor: pointer;
    display: none;
    }

    /* Media query for 375px width */
    @media screen and (max-width: 375px) {
        .target {
            font-size: 17px !important; /* Reduce font size */
            text-indent: 18%;
        }

        #done {
            width: 25px !important;
            height: 25px !important;
            left: 16px !important;
        }

        .cross {
            right: 17px !important; 
        }
        .cross img {
        width: 15px; 
        height: 15px; 
    }
    }
`;
document.head.appendChild(style);


    let addTaskImage = document.querySelector(".addTaskImage");
    let TASKS = document.querySelector(".tasks");
    let typingInput = document.getElementById("typingInput");
    let addTask = document.getElementById("addTask");

    typingInput.onfocus = function () {
        typingInput.style.outline = "none";
    }

    typingInput.addEventListener("input", function () {
        if (typingInput.value) {
        addTask.style.backgroundImage = "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
        addTaskImage.style.display = "block";
            
        } else {
        addTask.style.backgroundImage = "";
        addTaskImage.style.display = "none";
        }
    });
    addTask.onclick = function () {
        let typingTask = typingInput.value;
    
        if (addTaskImage.style.display === "block" && typingTask) {
            let task = document.createElement("div");
            task.className = "task";
            task.style.display = "block"; 
    
            let p = document.createElement("p");
            p.className = "target";
            p.textContent = typingTask;
            task.appendChild(p);
    
            TASKS.appendChild(task);
    
            let done = document.createElement("div");
            done.id = "done"; 
    
            let imgdone = document.createElement("img");
            imgdone.src = "./images/icon-check.svg";
            imgdone.className = "imgdone";
    
            done.appendChild(imgdone);
            task.appendChild(done);
    
            let cross = document.createElement("div");
            cross.className = "cross";
            cross.id = "x";
    
            let imgcross = document.createElement("img");
            imgcross.src = "./images/icon-cross.svg";
            cross.appendChild(imgcross);
    
            task.appendChild(cross);
    
            typingInput.value = '';
            addTask.style.backgroundImage = "";
            addTaskImage.style.display = "none";
    
            task.onmouseenter = function() {
                cross.style.display = "inline";
            };
            task.onmouseleave = function() {
                cross.style.display = "none"; 
            };

            let currentMode = btnDark.style.display === "none" ? "dark" : "light";

        if (currentMode === "dark") {
            task.style.backgroundColor = getComputedStyle(root).getPropertyValue('--Very-Dark-Desaturated-Blue');
            task.style.color = "white";
            task.style.borderColor = getComputedStyle(root).getPropertyValue('--Dark-Grayish-Blue');
        } else {
            task.style.backgroundColor = "white";
            task.style.color = getComputedStyle(root).getPropertyValue("--Very-Dark-Grayish-Blue");
            task.style.borderColor = getComputedStyle(root).getPropertyValue("--Very-Dark-Grayish-Blue");
        }
            
            done.onclick = function() {
                if (done.style.backgroundImage === '') {
                    done.style.backgroundImage = "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
                    
                    let imgRight = done.querySelector(".imgdone");
                    imgRight.style.display = "block";
    
                    let targetRight = imgRight.closest('.task').querySelector('.target');
                    targetRight.style.textDecoration = 'line-through';
                } else {
                    done.style.backgroundImage = '';
                    let imgWrong = done.querySelector(".imgdone");
                    imgWrong.style.display = "none"; 
    
                    let targetWrong = imgWrong.closest('.task').querySelector('.target');
                    targetWrong.style.textDecoration = 'none';
                }
                updateTaskCount(); 
            };

            let tr = task.querySelector('.target');
            tr.onclick = function() {
                done.onclick(); 
            };

            cross.onclick = function() {
                task.remove();
                updateTaskCount(); 
            };
    
            updateTaskCount(); 
        }
    };
    

    function updateTaskCount() {
        let tasks = document.querySelectorAll(".task");
        let count = 0;
    
        tasks.forEach(function(task) {
            let ele = task.querySelector("#done");
            if (ele.style.backgroundImage === '') {
                count++;
            }
        });
    
        let items = document.querySelector(".items");
        items.textContent = count;
    }
    
    let all = document.querySelector("#All");
    all.onclick = function() {
        let allTasks = document.querySelectorAll(".task");
        allTasks.forEach(function(task){
            task.style.display = "block";
        });
    };
    
    let completed = document.querySelector("#Completed");
    completed.onclick = function() {
        let tasks = document.querySelectorAll(".task");
        tasks.forEach(function(task){
            let ele = task.querySelector("#done");
            if (ele.style.backgroundImage === '') {
                task.style.display = "none"; 
            } else {
                task.style.display = "block"; 
            }
        });
    };
    
    let active = document.querySelector("#Active");
    active.onclick = function() {
        let tasks = document.querySelectorAll(".task");
        tasks.forEach(function(task){
            let ele = task.querySelector("#done");
            if (ele.style.backgroundImage === '') {
                task.style.display = "block"; 
            } else {
                task.style.display = "none"; 
            }
        });
    };
    
    let clearCompleted = document.querySelector("#Clear");
    clearCompleted.onclick= function(){
        let tasks = document.querySelectorAll(".task");
        tasks.forEach(function(task){
            let ele = task.querySelector("#done");
            if (ele.style.backgroundImage !== '') {
                task.remove();
            }
        });
        updateTaskCount(); 
    };
    
    updateTaskCount();
    

    /*********************DARK MODE***************** */
let btnDark = document.querySelector("#btnDark");
let btnLight = document.querySelector("#btnLight");

const root = document.documentElement;
const body = document.body;

root.style.setProperty('--Very-Dark-Blue', 'hsl(235, 21%, 11%)');
root.style.setProperty('--Very-Dark-Desaturated-Blue', 'hsl(235, 24%, 19%)');
root.style.setProperty('--Light-Grayish-Blue', 'hsl(234, 39%, 85%)');
root.style.setProperty('--Light-Grayish-Blue-hover', 'hsl(236, 33%, 92%)');
root.style.setProperty('--Dark-Grayish-Blue', 'hsl(234, 11%, 52%)');
root.style.setProperty('--Very-Dark-Grayish-Blue', 'hsl(233, 14%, 35%)');
root.style.setProperty('--Very-Dark-Grayish-Blue-alt', 'hsl(237, 14%, 26%)');

btnDark.onclick = function() {
    btnDark.style.display = "none";
    btnLight.style.display = "inline";

    body.style.backgroundColor = getComputedStyle(root).getPropertyValue('--Very-Dark-Blue');
    body.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')";

    typingInput.style.backgroundColor = getComputedStyle(root).getPropertyValue('--Very-Dark-Desaturated-Blue');
    typingInput.style.color = "white";    
    typingInput.style.setProperty('--placeholder-color', getComputedStyle(root).getPropertyValue('--Dark-Grayish-Blue'));

    addTask.style.borderColor = getComputedStyle(root).getPropertyValue('--Dark-Grayish-Blue');

    // Update tasks in dark mode
    let tasks = document.querySelectorAll(".task");
    tasks.forEach(function(task) { 
        task.style.backgroundColor = getComputedStyle(root).getPropertyValue('--Very-Dark-Desaturated-Blue');
        task.style.color = "white";
        task.style.borderColor = getComputedStyle(root).getPropertyValue('--Dark-Grayish-Blue');
    });

    let doneTasks = document.querySelectorAll("#done");
    doneTasks.forEach(function(doneTask) { 
        doneTask.style.borderColor = getComputedStyle(root).getPropertyValue('--Dark-Grayish-Blue');
    });

    let crosses = document.querySelectorAll(".cross");
    crosses.forEach(function(ele){
        ele.style.color = getComputedStyle(root).getPropertyValue('--Dark-Grayish-Blue');
    });

    let endContent = document.querySelector(".endContent"); 
    endContent.style.backgroundColor = getComputedStyle(root).getPropertyValue('--Very-Dark-Desaturated-Blue');
    endContent.style.color = getComputedStyle(root).getPropertyValue("--Light-Grayish-Blue");
}


/*********************LIGHT MODE***************** */
root.style.setProperty('--Very-Light-Gray', 'hsl(0, 0%, 98%)'); 
root.style.setProperty('--Very-Light-Grayish-Blue', 'hsl(0, 0%, 96%)'); 
root.style.setProperty('--Light-Grayish-Blue', 'hsl(234, 39%, 85%)'); 
root.style.setProperty('--Dark-Grayish-Blue', 'hsl(234, 11%, 52%)'); 
root.style.setProperty('--Very-Dark-Grayish-Blue', 'hsl(233, 14%, 35%)'); 

btnLight.onclick = function() {
    btnLight.style.display = "none";
    btnDark.style.display = "inline";

    body.style.backgroundColor = getComputedStyle(root).getPropertyValue('--Very-Light-Gray');
    body.style.backgroundImage = "url('./images/bg-desktop-light.jpg')";

    typingInput.style.backgroundColor = "white";
    typingInput.style.color = getComputedStyle(root).getPropertyValue("--Very-Dark-Grayish-Blue");    
    typingInput.style.setProperty('--placeholder-color', getComputedStyle(root).getPropertyValue("--Dark-Grayish-Blue"));

    addTask.style.borderColor = getComputedStyle(root).getPropertyValue('--Light-Grayish-Blue');

    // Update tasks in light mode
    let tasksLight = document.querySelectorAll(".task");
    tasksLight.forEach(function(task) { 
        task.style.backgroundColor = "white";
        task.style.color = getComputedStyle(root).getPropertyValue("--Very-Dark-Grayish-Blue");  
        task.style.borderColor = getComputedStyle(root).getPropertyValue("--Very-Dark-Grayish-Blue");  
    });

    let doneTasksLight = document.querySelectorAll("#done");
    doneTasksLight.forEach(function(doneTask) { 
        doneTask.style.borderColor = getComputedStyle(root).getPropertyValue('--Light-Grayish-Blue');
    });

    let crossesLight = document.querySelectorAll(".cross");
    crossesLight.forEach(function(ele){
        ele.style.color = getComputedStyle(root).getPropertyValue('--Light-Grayish-Blue');
    });

    let endContentLight = document.querySelector(".endContent"); 
    endContentLight.style.backgroundColor = "white";
    endContentLight.style.color = getComputedStyle(root).getPropertyValue("--Dark-Grayish-Blue");
}
