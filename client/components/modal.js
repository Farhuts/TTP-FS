import React from 'react'

const Modal = ({hideModal, showModalComp}) => {
  let showHideModal = showModalComp
    ? 'modal display-block'
    : 'modal display-none'
  return (
    <div className={showHideModal}>
      <section className="modal-main">
        <div className="container center">
          There is no such symbol : (
          <button className="modalBtn" onClick={hideModal}>
            Ok
          </button>
        </div>
      </section>
    </div>
  )
}

export default Modal
