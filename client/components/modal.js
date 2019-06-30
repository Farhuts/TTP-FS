import React from 'react'

const Modal = ({hideModal, showModalComp}) => {
  let showHideModal = showModalComp
    ? 'modal display-block'
    : 'modal display-none'
  return (
    <div className={showHideModal}>
      <section className="modal-main">
        <div className="container center">
          Such simbol doesn't exist
          <button onClick={hideModal}>Ok</button>
        </div>
      </section>
    </div>
  )
}

export default Modal
