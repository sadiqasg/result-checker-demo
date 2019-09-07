$(function () {
    const url = "http://localhost:3000";

    // 
    // admin login
    // 
    $("#adminLogin").click(function () {
        let user = $("#adminUsername").val();
        let pwd = $("#adminPwd").val();

        if ((user === "Admin" && pwd === "password") || (user === "admin" && pwd === "password")) {
            window.location = "../pages/admin.html";
        } else {
            alert("access denied")
        }
    });

    // 
    // student login
    //

    $("#studentLogin").click(function () {
        let userReg = $("#studentReg").val();

        $.ajax({
            type: "GET",
            url: `${url}/ITDepartment`,
            dataType: "json",
            success: result => {

                let { students } = result[0];

                for (let i = 0; i < students.length; i++) {
                    if (Number(userReg) === students[i].reg_no) {

                        if (typeof (Storage) !== "undefined") {
                            // Code for localStorage
                            let loggedInuser = students[i].username;
                            let studentResults = students[i].result;

                            localStorage.setItem("username", loggedInuser);
                            localStorage.setItem("results", JSON.stringify(studentResults))
                        } else {
                            // Sorry! No Web Storage support..
                        }

                        window.location = "../pages/student.html";
                    }
                }

            },
            error: err => console.log("error", err)
        });
    });

    // 
    // load student data
    // 
    $("#studentName").html(localStorage.getItem("username"));
    let res = localStorage.getItem("results");
    let parsedResult = JSON.parse(res);

    let formatted = ""

    // loop through and display result
    for (let i = 0; i < parsedResult.length; i++) {
        formatted += `<tr>
        <td>${Object.keys(parsedResult[i])}</td>
        <td>${Object.values(parsedResult[i])}</td>
        </tr>`
    }
    $("#results").html(formatted);

});
