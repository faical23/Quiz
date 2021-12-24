<template>
  <div class="TeacherPage">
      <Dashboard/>
      <div class="Content">
          <h1>Teachers</h1>
          <div class="TableZone flex justify-center mx-auto">
              <div class="flex flex-col">
                  <div class="w-full">
                      <div class="border-b border-gray-200 shadow">
                          <table>
                              <thead class="bg-gray-50">
                                  <tr>
                                      <th class="px-6 py-2 text-xs text-gray-500">
                                          ID
                                      </th>
                                      <th class="px-6 py-2 text-xs text-gray-500">
                                          Name
                                      </th>
                                      <th class="px-6 py-2 text-xs text-gray-500">
                                          Email
                                      </th>
                                      <th class="px-6 py-2 text-xs text-gray-500">
                                          Created_at
                                      </th>
                                      <th class="px-6 py-2 text-xs text-gray-500">
                                          Edit
                                      </th>
                                      <th class="px-6 py-2 text-xs text-gray-500">
                                          Delete
                                      </th>
                                  </tr>
                              </thead>
                              <tbody class="bg-white">
                                  <tr class="whitespace-nowrap">
                                      <td class="px-6 py-4 text-sm text-gray-500">
                                          1
                                      </td>
                                      <td class="px-6 py-4">
                                          <div class="text-sm text-gray-900">
                                              Jon doe
                                          </div>
                                      </td>
                                      <td class="px-6 py-4">
                                          <div class="text-sm text-gray-500">jhondoe@example.com</div>
                                      </td>
                                      <td class="px-6 py-4 text-sm text-gray-500">
                                          2021-1-12
                                      </td>
                                      <td class="px-6 py-4">
                                          <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded">Edit</a>
                                      </td>
                                      <td class="px-6 py-4">
                                          <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded">Delete</a>
                                      </td>
                                  </tr>
                                  <tr class="whitespace-nowrap">
                                      <td class="px-6 py-4 text-sm text-gray-500">
                                          1
                                      </td>
                                      <td class="px-6 py-4">
                                          <div class="text-sm text-gray-900">
                                              Jon doe
                                          </div>
                                      </td>
                                      <td class="px-6 py-4">
                                          <div class="text-sm text-gray-500">jhondoe@example.com</div>
                                      </td>
                                      <td class="px-6 py-4 text-sm text-gray-500">
                                          2021-1-12
                                      </td>
                                      <td class="px-6 py-4">
                                          <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded">Edit</a>
                                      </td>
                                      <td class="px-6 py-4">
                                          <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded">Delete</a>
                                      </td>
                                  </tr>
                                  <tr class="whitespace-nowrap">
                                      <td class="px-6 py-4 text-sm text-gray-500">
                                          1
                                      </td>
                                      <td class="px-6 py-4">
                                          <div class="text-sm text-gray-900">
                                              Jon doe
                                          </div>
                                      </td>
                                      <td class="px-6 py-4">
                                          <div class="text-sm text-gray-500">jhondoe@example.com</div>
                                      </td>
                                      <td class="px-6 py-4 text-sm text-gray-500">
                                          2021-1-12
                                      </td>
                                      <td class="px-6 py-4">
                                          <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded">Edit</a>
                                      </td>
                                      <td class="px-6 py-4">
                                          <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded">Delete</a>
                                      </td>
                                  </tr>

                              </tbody>
                          </table>
                      </div>
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
import Dashboard from '../components/Dashboad.vue'


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
    Dashboard
  }
}
</script>

<style>
  @import '../assets/css/style.css';
  .TeacherPage{
    display:flex;    
  }
  .TeacherPage .Content{
    width:100%;
    padding:30px 100px;
  }
  h1{
    font-size:40px;
  }
  .TableZone{
    margin:50px 0px;
  }
</style>