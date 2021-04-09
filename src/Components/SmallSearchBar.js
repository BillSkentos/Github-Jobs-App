import {React,useState} from 'react';
import Modal from '../Components/Modal';


export default function SmallSearchBar() {

  const [modal,setModal] = useState(false);

  const openModal = ()=>{
    setModal(true);
  }

  //click outside of modal to close it 

  return (
  <>  
    {modal === true && <Modal shown = {modal} close = {()=>setModal(false)} />}
    <div className="flex items-center w-full justify-center -mt-4 mb-4 rounded-full">
      <div className="relative h-20 shadow-sm w-full max-w-76 md:max-w-full inline-flex items-center bg-white dark:bg-very-dark-blue pr-4 rounded-sm outline-none">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="text-violet"><path d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z" fill="#5964E0" fillRule="nonzero"></path></svg>
        </div>

        <input type="text" id="Title Filter-id" className="focus:shadow-none font-brand text-base text-very-dark-blue dark:text-white form-input border-0 block w-full h-full pl-16 leading-button sm:text-sm sm:leading-5 dark:bg-very-dark-blue -mr-20" placeholder="Filter by text..."  />

        <div className="flex items-center md:hidden">
          <div className="cursor-pointer">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" onClick={openModal}>
              <path className="fill-current text-dark-grey dark:text-white" d="M19.108 0H.86a.86.86 0 00-.764.455.833.833 0 00.068.884l6.685 9.202.007.01c.242.32.374.708.375 1.107v7.502a.825.825 0 00.248.594.865.865 0 00.942.18l3.756-1.4c.337-.1.56-.41.56-.784v-6.092c0-.399.132-.787.375-1.108l.007-.009 6.685-9.202c.19-.26.217-.6.068-.884A.86.86 0 0019.108 0z" fill="#6E8098" fillRule="nonzero"></path></svg></div><div className="cursor-pointer ml-6 inline-flex items-center justify-center w-12 h-12 p-3.5 bg-violet"><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z" fill="#FFFFFF" fillRule="nonzero"></path>
            </svg>
          </div>
        </div>
      </div> 
    </div>
  </>
  );

}
