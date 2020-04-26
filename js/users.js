let userList;

/////// EVENT LISTENERS ////////
const userListItem = document.querySelector('ons-list-item#user-list-item');
if (userListItem != null) {
    document.querySelector('ons-list-item#user-list-item').addEventListener('click', (event) => {
        const config = {
            "url": "http://localhost:5000/user-management/api/v1/users/all",
            "method": "GET",
            "timeout": 60000,
        };
        callApi(config, (data) => {
            userList = data;
        }, 'users');   
    });
}
