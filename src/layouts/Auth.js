import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { handleLoginApi } from '../services/USERService';

function Admin() {

  const [username, setusername] = useState()

  //const [arruser, setarruser] = useState()


  const [password, setpassword] = useState()
  const [errMessage, seterrMessage] = useState()



  const handleLogins = async () => {

    handleLogin(username, password)

  }


  const history = useHistory();

  const handleLogin = async (usernamea, passwordw) => {

    try {


      let data = await handleLoginApi(usernamea, passwordw)


      if (data && data.errCode !== 0) {
        seterrMessage(data.message)
        alert(data.message)
      }
      if (data && data.errCode == 0) {


        sessionStorage.setItem('userId', data.user.id)
        history.push("/")
      }

    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({ errMessage: error.response.data.message })

        }
      }
      console.log('tai', error)


    }


  }


  return (
    <>


      <div className="container">
        <div className="row">
          <div className="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
            <div className="row">
              <div className="col-lg-6 col-md-8 mx-auto">

                <div className="card rounded shadow shadow-sm">
                  <div className="card-header">
                    <h3 className="mb-0">Login</h3>
                  </div>
                  <div className="card-body">
                    <div className="form" role="form" autoComplete="off" id="formLogin" noValidate="" >
                      <div className="form-group">
                        <label htmlFor="username1">Username</label>
                        <input type="text" className="form-control form-control-lg rounded-0" name="username1" id="username1" required="" onChange={(e) => setusername(e.target.value)} />

                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control form-control-lg rounded-0" id="pwd1" required="" autoComplete="new-password" onChange={(e) => setpassword(e.target.value)} />

                      </div>
                      <div>

                      </div>
                      <button type="submit" className="btn btn-success btn-lg float-right" id="btnLogin" onClick={handleLogins}>Login</button>
                    </div>
                  </div>

                </div>

              </div>


            </div>


          </div>

        </div>

      </div>

    </>
  );
}

export default Admin;
