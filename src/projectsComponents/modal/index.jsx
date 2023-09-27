import {motion} from "framer-motion";
import Backdrop from "../backdrop";

const fadeIn = {
    hidden: {
        opacity: 0,
    },
    visible: {
        visible: {
            opacity: 1,
            transition: {
                duration: 0.1,
            }
        }
    },
    exit: {
        opacity: 0,
    },
}
const Modal = ({ handleClose, Name, Description, Skills }) => {
    return (
      <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="Modal Modalbackground"
          variants={fadeIn}
        >
            <div onClick={handleClose}>
            <ModalText Name={Name} Description={Description} Skills={Skills}/>
            </div>
        </motion.div>
      </Backdrop>
    );
  };
  

export default Modal

const ModalText = ({ Name, Description, Skills }) => (
    <div className="modal-text">
      <h1>{Name}</h1>
      <p>{Description}</p>
      <p>Skills: {Skills}</p>
    </div>
  );