import { toast } from 'sonner';
import axios from '../lib/axios'
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    authScreenState: 'login',
    setAuthScreenState: (newState) => set({ authScreenState: newState }),
    user: null,
    isLoading: false,
    isAuthenticated: false,
    signUp: async ({ username, email, password, name }) => {
        set({ isLoading: true });
        try {

            const response = await axios.post('/user/signup', { username, name, email, password });
            if (response.status === 201) {
                set({ user: response.data.user, isLoading: false });
                toast.success('Registration successful!')
            }
        } catch (error) {
            console.error("Error in signup:", error);
            set({ isLoading: false });
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    },
    logIn: async ({ emailOrUsername, password }) => {
        set({ isLoading: true });
        try {
            const response = await axios.post('/user/login', { emailOrUsername, password });
            if (response.status === 200) {
                set({ user: response.data.user, isLoading: false });
                toast.success('Login successful!')
            }
        } catch (error) {
            console.error("Error in login:", error);
            set({ isLoading: false });
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    },
    forgetPassword: async ({ email }) => {
        set({ isLoading: true });
        try {
            const response = await axios.post('/user/forget-password', { email });
            if (response.status === 200) {
                set({ isLoading: false });
                toast.success(response.data.message || "Password reset email sent successfully!")
            }
        } catch (error) {
            console.error("Error in forget password:", error);
            set({ isLoading: false });
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    },
    VerifyEmail:async({code})=>{
        set({isLoading:true});
        try{
            const response=await axios.post('/user/verify-email',{code});
            if(response.status===200){
                set({isLoading:false});
                toast.success(response.data.message || "Email verified successfully!")
            }
        }catch(error){
            console.error("Error in email verification:",error);
            set({isLoading:false});
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }   
    },
    LogOut:async()=>{
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
        set({isLoading:true});
        try{
            const response=await axios.post(`/user/reset-password/${token}`, {newPassword});
            if(response.status===200){
                set({isLoading:false});
                toast.success(response.data.message || "Password reset successfully!")
            }
        }catch(error){
            console.error("Error in password reset:",error);
            set({isLoading:false});
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    },
    updateProfile:async({id,name,profilePic,bio,username, password,newPassword})=>{
        set({isLoading:true});
        try{
            const response=await axios.post(`/user/updateprofile/${id}`,{username,name,profilePic,bio,username,password,newPassword});
            if(response.status===200){
                set({isLoading:false});
                toast.success(response.data.message || "Profile updated successfully!")
            }
        }catch(error){
            console.error("Error in updating profile:",error);
            set({isLoading:false});
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    },
    followUnfollow:async({id})=>{
        set({isLoading:true});
        try{
            const response=await axios.post(`/user/follow/${id}`);
            if(response.status===200){
                set({isLoading:false});
                toast.success(response.data.message || "Follow/Unfollow action successful!")
            }
        }catch(error){
            console.error("Error in follow/unfollow:",error);
            set({isLoading:false});
            toast.error(error.response.data.error || error.response.data.message || "An error occured");
        }
    }

}))


