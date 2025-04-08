import {create} from 'zustand';

export const useAuthStore=create((set)=>({
    authScreenState:'login',
    setAuthScreenState:(newState)=>set({authScreenState:newState}),
}))


