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

const editmanage = (data) => {
    return axios.put('/api/edit-manageCar', data);
}


const editphieuchi = (data) => {
    return axios.put('/api/edit-commodity', data);
}


const editaddhang = (data) => {
    return axios.put('/api/edit-consignment', data);
}

const editmap = (data) => {
    return axios.put('/api/edit-roadmap', data);
}

const edidtbokkve = (data) => {
    return axios.put('/api/edit-bookingseat', data);
}



const deletechi = (CarId) => {
    return axios.delete('/api/delete-commodity', {
        data: { id: CarId }
    });
}



const deletemap = (CarId) => {
    return axios.delete('/api/delete-roadmap', {
        // headers: {Authorization: authorizationToken},
        data: { id: CarId }


    });
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


const seatbook = (data) => {
    console.log('databunk', data)
    return axios.post('/api/create-new-seatbook', data);
}

const taochi = (data) => {
    return axios.post('/api/create-new-commodity', data);
}



const getchi = (inputId) => {
    return axios.get(`/api/get-all-commodity?id=${inputId}`)
}



const getve = (inputId) => {
    return axios.get(`/api/get-all-seatbookxe?id=${inputId}`)
}

const getveid = (inputId) => {
    return axios.get(`/api/get-all-getvexe?id=${inputId}`)
}

const getchithongke = (data) => {
    return axios.post('/api/get-all-commoditydate', { ...data });
}

const getthuve = (data) => {
    return axios.post('/api/get-all-thuve', { ...data });
}

const getthuhang = (data) => {
    return axios.post('/api/get-all-thuhnag', { ...data });
}

const deletehnag = (CarId) => {
    return axios.delete('/api/delete-consignment', {
        data: { id: CarId }
    });
}

const deletboking = (CarId) => {
    return axios.delete('/api/delete-bookingseat', {
        data: { id: CarId }
    });
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
    seatbook,
    taochi,
    getchi,
    getve,
    getveid,
    deletechi,
    getchithongke,
    deletemap,
    getthuve,
    getthuhang,
    deletehnag,
    editmap,
    editaddhang,
    editphieuchi,
    editmanage,
    deletboking,
    edidtbokkve,
}