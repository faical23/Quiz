<template>
<div class="MyPopup w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        FullName
      </label>
      <input v-model="Fullname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Email
      </label>
      <input v-model="Email" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="exemple@gmail.com">
    </div>
    <div class="mb-6" v-if="UserId === ''">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input v-model="Password" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
    </div>
    <div class="flex items-center justify-between">
      <button  v-if="UserId === ''" @click='NewUser()' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        New Teacher
      </button>
    <button v-else @click='UpdateUser()' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Update Teacher
      </button>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>
</template>
<script>
// @ is an alias to /src
import axios from "axios"
import Swal from 'sweetalert2'
import BASE_URL from '../../Config'
const TOKEN = localStorage.getItem('Token');


export default {
  name: 'Home',
  emit:['close'],
  props:['UserId'],
    data: function () {
    return {
        Email:'',
        Password:'',
        Fullname:''
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
      NewUser(){
        let Data ={
            Email:this.Email,
            Password:this.Password,
            Fullname:this.Fullname,
        }
      axios
        .post(`${BASE_URL}/api/formateur/`,Data,{ headers: {"x-access-token" : `${TOKEN}`} })
        .then(response => {
            if(response.status === 201){
                this.AlertPopup('Formtareur created successfly','success')
                this.$emit('close')
            }
        })
        .catch(() => {
            this.AlertPopup('Invalide data','warning')
        })
      },
      UpdateUser(){
          let Data ={
            Email:this.Email,
            Password:this.Password,
            Fullname:this.Fullname,
        }
      axios
        .put(`${BASE_URL}/api/formateur/${this.UserId.id}`,Data,{ headers: {"x-access-token" : `${TOKEN}`} })
        .then(response => {
            if(response.status === 201){
                this.AlertPopup('Formtareur Updated successfly','success')
                this.$emit('close')
            }
        })
        .catch(() => {
            this.AlertPopup('Invalide data','warning')
        })
      },
      GetUser(){
            this.Fullname =this.UserId.Fullname
            this.Email = this.UserId.Email
          // console.log(this.UserId.id)
          // if(this.UserId !== ''){
          //       axios
          //       .get(`${BASE_URL}/api/formateur/${this.UserId.id}`,{ headers: {"x-access-token" : `${TOKEN}`} })
          //       .then(response => {
          //           console.log(response.data.Formateur)
          //           this.Fullname = response.data.Formateur.Fullname
          //           this.Email = this.UserId.Email

          //       })
          //       .catch(error => {
          //       console.log(error)
          //       })
          // }

      }
  },
  components: {
  },
  mounted(){
      this.GetUser()

  }
}
</script>

<style>
  @import '../assets/css/style.css';
.MyPopup{
    position: absolute;
    left: 40%;
    top: 30%;
    z-index: 200;
}
</style>