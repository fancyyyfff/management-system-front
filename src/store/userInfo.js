
import { defineStore } from "pinia";
import { getUserInfo } from "@/api/userinfo";

export const useUserInfo = defineStore('userinfo',{
    state:()=> {
        return {
            imageUrl:'',
            // image_url:'',
            name:'',
            sex:'',
            department:null,
            identity:'',
            account:'',
            email:''

        }
    },
    actions:{
        async fetchUserInfo(id) {
            const res = await getUserInfo(id)
            console.log("getUserInfo返回的对象：",res)
            this.imageUrl=res.image_url
            this.name=res.name
            this.sex=res.sex
            this.department=res.department
            this.identity=res.identity
            this.account=res.account
            this.email=res.email
        }
    }
},{persist:{
        enabled:true,
        key:'userinfo',
        storage:localStorage
    }
    
})