import { loneContext } from "../context/loanContext/loanContext"
import { useContext } from "react"


const useLoanData = () => {
    return useContext(loneContext)
}

export default useLoanData