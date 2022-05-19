import { createContext, useState } from "react";
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item 1 from context',
            rating: 10,
        },
        {
            id: 1,
            text: 'This item 2 from context',
            rating: 8,
        },
        {
            id: 1,
            text: 'This item 3 from context',
            rating: 5,
        }
    ])
    
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
    
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
        setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    return <FeedbackContext.Provider 
    value={{
        feedback,
        deleteFeedback,
        addFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext