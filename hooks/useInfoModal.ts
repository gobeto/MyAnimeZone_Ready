import { create } from "zustand"

//manages the state of an informational modal,  whether the modal is open or closed and which movie is currently selected.
//billboard and movie card
export interface ModalStoreInterface{
    movieId?:string;
    isOpen:boolean;
    openModal:(movieId: string) => void;
    closeModal:() => void
};

const useInfoModal = create<ModalStoreInterface>((set)=>({
    movieId: undefined,
    isOpen: false,
    openModal:(movieId: string) => set({isOpen:true,movieId}),
    closeModal:() => set({isOpen: false,movieId:undefined})
}));

export default useInfoModal;