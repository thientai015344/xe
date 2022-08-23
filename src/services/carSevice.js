import axios from "../axios"



//template string
const getALLCar = (inputId) => {
    return axios.get(`/api/get-all-car?id=${inputId}`)
}



const getDetailCar = (inputId) => {
    return axios.get(`/api/get-detail-Car?id=${inputId}`)
}


const getALLMap = (inputId) => {
    return axios.get(`/api/get-all-roadmap?id=${inputId}`)
}

const createNewCar = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-car', data);
}

const createNewmap = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-roadmap', data);
}

const deleteCar = (CarId) => {
    return axios.delete('/api/delete-Car', {
        // headers: {Authorization: authorizationToken},
        data: { id: CarId }


    });
}

const editCar = (data) => {
    return axios.put('/api/edit-Car', data);
}





const getALLManageXe = (inputId) => {
    return axios.get(`/api/get-all-manageCar?id=${inputId}`)
}

const createNewManageXe = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-manageCar', data);
}



const CreateNewsignments = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-consignment', data);
}



const CreateNewsigns = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-signs', data);
}

const getALLTypeHang = (inputId) => {
    return axios.get(`/api/get-all-signs?id=${inputId}`)
}



const createNewticket = (data) => {
    console.log(data)
    console.log('check data from service', data)
    return axios.post('/api/create-new-bookingseat', data);
}





const getALLSeat = (inputId) => {
    return axios.get(`/api/get-all-allcode?id=${inputId}`)
}


const getAllsignments = (inputId) => {
    return axios.get(`/api/get-all-consignment?id=${inputId}`)
}









export {
    createNewmap,
    getALLMap,
    getALLCar,
    createNewCar,
    deleteCar,
    editCar,
    getDetailCar,
    getALLManageXe,
    createNewManageXe,
    createNewticket,
    getALLSeat,
    CreateNewsigns,
    getALLTypeHang,
    CreateNewsignments,
    getAllsignments,

}