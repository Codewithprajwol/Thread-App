import { toast } from 'react-hot-toast';
import axios from '../lib/axios'
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    authScreenState: 'login',
    setAuthScreenState: (newState) => set({ authScreenState: newState }),
    user: null,
    isLoading: false,
    isSigning:false,
    isUpdating:false,
    isAuthenticated: false,
    isGetProfileLoading:false,
    signUp: async ({ username, email, password, name }) => {
        set({ isSigning: true });
        try {
            const response = await axios.post('/user/signup', { username, name, email, password });
            if (response.status === 201) {
                set({ user: response.data.user, isSigning: false });
                toast.success('Registration successful!')
                return response.status;
            }
        } catch (error) { 
            console.error("Error in signup:", error);
            set({ isSigning: false });
            toast.error(error.response.data.errors?.[0] || error.response.data.error || error.response.data.message || "An error occured");  
            return error.response.status;    
         }
        },
    logIn: async ({ emailOrUsername, password }) => {
        try {
            const response = await axios.post('/user/login', { emailOrUsername, password });
            if (response.status === 200) {
                set({ user: response.data.user });
                toast.success('Login successful!')
            }
        } catch (error) {
            console.error("Error in login:", error);
            toast.error(error.response.data.error|| "An error occured");
        }
    },
    forgetPassword: async ({ email }) => {
        try {
            const response = await axios.post('/user/forget-password', { email });
            if (response.status === 200) {
                set({ isLoading: false });
                toast.success(response.data.message || "Password reset email sent successfully!")
            }
        } catch (error) {
            console.error("Error in forget password:", error);
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    },
    VerifyEmail:async({code})=>{
        
        try{
            const response=await axios.post('/user/verify-email',{code});
            if(response.status===200){
                toast.success(response.data.message || "Email verified successfully!")
            }
        }catch(error){
            console.error("Error in email verification:",error);
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }   
    },
    logOut:async()=>{
        try{
            const response=await axios.post('/user/logout');
        if(response.status===200){
            set({user:null});
            toast.success("Logged out successfully")
    }
        }catch(error){
            console.error("Error in logout:",error);
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    },
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.post('/user/checkauth');
            if (response.status === 200) {
                set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            }
        } catch (error) {
            console.error("Error in checking auth:", error);
            set({ isLoading: false });
        }
    },
    resetPassword:async({newPassword,token})=>{
        try{
            const response=await axios.post(`/user/reset-password/${token}`, {newPassword});
            if(response.status===200){
                toast.success(response.data.message || "Password reset successfully!")
            }
        }catch(error){
            console.error("Error in password reset:",error);
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    },
    updateProfile:async({id,name,profilePic,bio,username,email, password,newPassword})=>{
        set({isUpdating:true});
        try{
            const response=await axios.post(`/user/updateprofile/${id}`,{username,name,profilePic,bio,password,newPassword,email});
            if(response.status===200){
                set({user:response.data.user,isUpdating:false});
                toast.success(response.data.message || "Profile updated successfully!")
            }
        }catch(error){
            console.error("Error in updating profile:",error);
            set({isUpdating:false});
            toast.error(error.response.data.errors?.[0] || error.response.data.error || error.response.data.message || "An error occured");       }
    },
    followUnfollow:async({id})=>{
        try{
            const response=await axios.post(`/user/follow/${id}`);
            if(response.status===200){
                toast.success(response.data.message || "Follow/Unfollow action successful!")
            }
        }catch(error){
            console.error("Error in follow/unfollow:",error);
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    },
    getProfile:async({username})=>{
        set({isGetProfileLoading:true});
        try{
            const response=await axios.get(`/user/profile/${username}`);
            if(response.status===200){
                set({user:response.data.user,isGetProfileLoading:false});
            }
        }catch(error){
            console.error("Error in getting profile:",error);
            set({isGetProfileLoading:false});
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    }

}))


