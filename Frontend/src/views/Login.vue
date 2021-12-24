<template>
        <div class="Connexion">
            <div class="Connexion__Zone">
            <div class='Connexion__Right SignInImg' >
                    <img  src="../assets/Img/LoginImg.jpg"  alt="" />
                </div>
                    <div class="Connexion__left SignInForm">
                        <div class="Hello">
                            <h1>Hello Again!</h1>
                            <p>Welcome back you've been missed!</p>
                        </div>
                        <form >
                            <div class="FaildZone">
                            <svg class="" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                <input type="text" placeholder="Email" v-model="Email" />
                            </div>
                            <div class="FaildZone">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/></svg>
                                <input type="password" placeholder="Password" v-model="Password"  />
                                <div class="ChangeTypePassword">
                                        <svg class="ChangeTypePassword" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none"/><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                                </div>

                            </div>
                            <p class="Forgot">Forgot Password ?</p>
                            <button class="SignIn" @click.prevent='Login()'>Sign In</button>
                        </form>
                        <div class="OrLoginWith">
                                <p>Or continue with</p>
                                <div class="AnotherSocielMedia">
                                    <img  src="../assets/Img/Login/facebook.png" alt="" />
                                    <img  src="../assets/Img/Login/github.png" alt="" />
                                    <img  src="../assets/Img/Login/gmail.png" alt="" />
                                </div>

                        </div>
                    </div>

            </div>

        </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import Swal from 'sweetalert2'
import BASE_URL from '../../Config'


export default {
  name: 'Home',
    data: function () {
    return {
      Email: '',
      Password:'',
      Submit:false,
    }
  },
  methods:{
      AlertPopup:(Message,Status)=>{
            Swal.fire({
              position: 'top-end',
              icon: Status,
              title: Message,
              showConfirmButton: false,
              timer: 1500
            })
      },
      Login(){
        const Data = {
          Email:this.Email,
          Password:this.Password
        }
      axios
        .post(`${BASE_URL}/api/user/signIn`,Data)
        .then(response => {
          if(response.status === 201)
            {
              this.AlertPopup('Successfly login','success') 
              this.$router.push('/Teachers')
              localStorage.clear()
              localStorage.setItem('Token',response.data.Token)
              localStorage.setItem('Id',response.data.User.UserId)

            }
            console.log(response)
        })
        .catch(error => {
          error.response.status ? this.AlertPopup('Email or password incorrect','warning') : this.AlertPopup('Invalid Data','warning')
        })
      }
  },
  components: {
  }
}
</script>

<style>
  @import '../assets/css/style.css';
</style>