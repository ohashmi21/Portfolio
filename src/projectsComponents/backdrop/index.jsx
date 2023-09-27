import { motion } from "framer-motion"

const Backdrop =({children, onClick})=> {
    return(
        <motion.div
            className="backdrop"
            onClick={onClick}
            initial={{opacity:0}}a
            animate={{opacity:1}}
            exit={{opacity:0}}
        >
            {children}
        </motion.div>
    )
};
export default Backdrop;