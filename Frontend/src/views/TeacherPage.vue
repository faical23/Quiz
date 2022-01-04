<template>
  <div class="TeacherPage">
    <div class="BlackPage" v-if="OpenPopupTeacher" @click="CloseAll()"></div>
      <Dashboard/>
      <Popup  v-if="OpenPopupTeacher" :UserId='UserId'  @close='CloseAll()' />
      <div class="Content">
          <h1>Teachers</h1>
          <div class="TableZone flex justify-center mx-auto">
              <div class="flex flex-col">
                  <div class="w-full">
                      <a @click.prevent="UserId = '',OpenPopupTeacher =true" class=" px-4 py-1 text-sm text-white bg-blue-400 rounded">New Teacher</a>
                      <div class="border-b border-gray-200 shadow"  style='margin: 30px 0px !important;'>
                          <table>
                              <thead class="bg-gray-50">
                                  <tr>
                                      <th class="px-6 py-2 text-xs text-gray-500">
                                          ID
                                      </th>
                                      <th class="px-6 py-2 text-xs text-gray-500">
                                          FullName
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
                                  <tr class="whitespace-nowrap" v-for="Teacher in Teachers" :key="Teacher">
                                      <td class="px-6 py-4 text-sm text-gray-500">
                                          {{Teacher.id}}
                                      </td>
                                      <td class="px-6 py-4">
                                          <div class="text-sm text-gray-900">
                                              {{Teacher.Fullname}}
                                          </div>
                                      </td>
                                      <td class="px-6 py-4">
                                          <div class="text-sm text-gray-500">{{Teacher.Email}}</div>
                                      </td>
                                      <td class="px-6 py-4 text-sm text-gray-500">
                                          {{Teacher.createdAt.slice(0,10)}}
                                      </td>
                                      <td class="px-6 py-4">
                                          <a @click='UserId=Teacher,OpenPopupTeacher = true' class="px-4 py-1 text-sm text-white bg-blue-400 rounded">Edit</a>
                                      </td>
                                      <td class="px-6 py-4">
                                          <a  @click='deleteUser(Teacher.id)' href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded">Delete</a>
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
const TOKEN = localStorage.getItem('Token');
import Popup from '../components/TeacherPopup.vue'


export default {
  name: 'Home',
    data: function () {
    return {
        Teachers:[],
        OpenPopupTeacher:false,
        UserId:''
    }
  },
  methods:{
    CloseAll(){
      this.OpenPopupTeacher=false
      this.GetFormateurs()
    },
      AlertPopup(Message,Status){
            Swal.fire({
              position: 'top-end',
              icon: Status,
              title: Message,
              showConfirmButton: false,
              timer: 1500
            })
      },
      GetFormateurs(){
        console.log(TOKEN)
      axios
        .get(`${BASE_URL}/api/formateur`,{ headers: {"x-access-token" : `${TOKEN}`} })
        .then(response => {
          this.Teachers = response.data.Formateurs
            console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      },
      deleteUser(Id) {
      axios
        .delete(`${BASE_URL}/api/formateur/${Id}`,{ headers: {"x-access-token" : `${TOKEN}`} })
        .then(() => {
          this.AlertPopup('Formtareur deleted successfly','success')
            this.GetFormateurs()
        })
        .catch(error => {
          console.log(error)
        })
      }
  },
  components: {
    Dashboard,
    Popup
  },
  mounted(){
    this.GetFormateurs()
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
  .BlackPage{
    background-color:rgba(0, 0, 0, 0.4);
    width:100%;
    height:100vh;
    position:fixed;
    z-index: 100;
  }
</style>