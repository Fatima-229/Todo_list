#!/usr/bin/env node
import inquirer from "inquirer";
let todo_list = [];
let while_condition = true;
while (while_condition === true) {
    // OPTIONS
    let option = await inquirer.prompt([
        {
            type: "list",
            name: "user_option",
            message: "select an option",
            choices: ["Add", "Remove", "Update"],
        },
    ]);
    //   ADD
    if (option.user_option === "Add") {
        let ans = await inquirer.prompt([
            {
                type: "input",
                name: "user_ans",
                message: "write something to add in todo list.",
            },
        ]);
        if (ans.user_ans !== "") {
            todo_list.push(ans.user_ans);
            console.log(todo_list);
        }
        else {
            console.log("Please write something to add in todo list.");
        }
    }
    //   REMOVE
    else if (option.user_option === "Remove") {
        let removeChoice = await inquirer.prompt([
            {
                type: "list",
                name: "remove_item",
                message: "Select item to remove",
                choices: todo_list,
            },
        ]);
        let index_to_remove = todo_list.indexOf(removeChoice.remove_item);
        if (index_to_remove >= 0) {
            todo_list.splice(index_to_remove, 1);
            console.log("You removed : ", removeChoice.remove_item);
            console.log(todo_list);
        }
    }
    // UPDATE
    else if (option.user_option === "Update") {
        if (todo_list.length > 0) {
            let updateShow = await inquirer.prompt([
                {
                    type: "list",
                    name: "updateItem",
                    message: "Select an item to update:",
                    choices: todo_list,
                },
            ]);
            let index = todo_list.indexOf(updateShow.updateItem);
            let editValue = await inquirer.prompt([
                {
                    type: "input",
                    name: "editItem",
                    message: "Enter the updated task:",
                },
            ]);
            if (editValue.editItem !== "") {
                todo_list[index] = editValue.editItem;
                console.log("Task updated successfully.");
                console.log("Updated List:");
                todo_list.forEach((item) => {
                    console.log(`${item}`);
                });
                console.log("\n");
            }
            else {
                console.log(" You cannot update to an empty item.");
            }
        }
        else {
            console.log("The To-Do list is Empty. Please add tasks before updating.");
        }
    }
    // CONFIRMATION
    let user_ans = await inquirer.prompt([
        {
            type: "confirm",
            name: "selection",
            message: "Do you want to countinue?",
            default: true,
        },
    ]);
    if (user_ans.selection === false) {
        while_condition = false;
    }
}
console.log(`Thank you for using todo list!`);
