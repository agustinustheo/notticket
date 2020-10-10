import swal from "sweetalert"

export const showAlert = function(message, status){
    return swal({
        title: status === 1 ? "Success" : (status === 2 ? "Info" : "Error"),
        text: message,
        icon: status === 1 ? "success" : (status === 2 ? "warning" : "error")
    })
}

export const showConfirmAlert = function(message){
    return swal({
        title: "Warning",
        text: message,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
}
export const kickToLogin = function(){
    showAlert("Your session has ended due to inactivity, please login again",2)
    .then(()=>{
        localStorage.clear()
        window.location.reload()
    })
}