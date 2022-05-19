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
            id: 2,
            text: 'This item 2 from context',
            rating: 8,
        },
        {
            id: 3,
            text: 'This item 3 from context',
            rating: 5,
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Set item to be updated
    const editFeedback = (item) =>{
        setFeedbackEdit({
            item,
            edit: true
        })
    }
    
    // Update feedback item
    const updateFeedback = (id, updItem) => {
        console.log(id, updItem)
        setFeedback(feedback.map((item) => item.id === id ? 
        {...item, ...updItem} : item ))
    }

    // Add Feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
    
    // Delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
        setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    return <FeedbackContext.Provider 
    value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext