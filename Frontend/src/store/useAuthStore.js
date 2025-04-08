import { toast } from 'sonner';
import axios from '../lib/axios'
import {create} from 'zustand';

export const useAuthStore=create((set)=>({
    authScreenState:'login',
    setAuthScreenState:(newState)=>set({authScreenState:newState}),
    user:null,
    isLoading:false,
    isAuthenticated:false,
    signUp:async({username,email,password,name})=>{
        set({isLoading:true});
        try{

            const response=await axios.post('/user/signup',{username, name, email, password});
            if(response.status===201){
                set({user:response.data.user,isLoading:false});
                toast.success('Registration successful!')
            }
        }catch(error){
            console.error("Error in signup:",error);
            set({isLoading:false});
            toast.error(error.response.data.error||error.response.data.message || "An error occured");
    }
},



}))


