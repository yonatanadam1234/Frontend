import jwtAxios from "../../../services/auth/jwt-auth";




const CreateShop = (data) => {
    try {
      
      jwtAxios.post('verifyForgotPassword', data).then((res) => {
        if (res.status === 200) {
          showMessage(res.data.message);
          navigate('/setNewPassword');
        }
      })
        .catch((res) => {
          fetchError(res.response.data.message);
        })
    }
    catch (err) {
      console.log(err);
    }
  }