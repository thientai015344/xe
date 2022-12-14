import axios from "../axios"


const handleLoginApi = (username, password) => {

    return axios.post('/api/login', { username, password });
}
//template string
const getAllUSER = (inputId) => {

    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserAdm = (data) => {

    return axios.post('/api/create-new-userAdm', data);
}


const deleteUserAdm = (userId) => {
    return axios.delete('/api/delete-userAdm', {
        // headers: {Authorization: authorizationToken},
        data: { id: userId }


    });
}

const editUserAdm = (data) => {
    return axios.put('/api/edit-userAdm', data);
}







export {
    handleLoginApi,
    getAllUSER,
    createNewUserAdm,
    deleteUserAdm,
    editUserAdm



}