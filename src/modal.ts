export const Modal = {
  modalButton: document.querySelectorAll('#modal-button'),
  modal: document.querySelector('#modal')!,
  toggle(){
    // if(this.modal.classList.contains('open')){
      
    // } else if(this.modal.classList.contains('-top-72')){
    //   this.modal.classList.replace('-top-72', 'top-72')
    // }
    this.modal.classList.toggle('open')
  },
  action(){
    // console.log(this.modal.classList.toggle('hidden'))
    this.modalButton.forEach(element => {
     element.addEventListener('click', (e: Event) => {
       this.toggle()
     })
    });
  }
}