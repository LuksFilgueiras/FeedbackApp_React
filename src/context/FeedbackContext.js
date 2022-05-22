import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>{
        fetchFeedback()
    }, [])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const fetchFeedback = async () =>{
        const response = await fetch("http://localhost:5000/feedback?_sort=id&_order=desc")
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }
    // Set item to be updated
    const editFeedback = (item) =>{
        setFeedbackEdit({
            item,
            edit: true
        })
    }
    
    // Update feedback item
    const updateFeedback = async (id, updItem) => {
        console.log(id, updItem)

        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(updItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? 
        {...item, ...data} : item ))
    }

    // Add Feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('http://localhost:5000/feedback', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFeedback)
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
    }
    
    // Delete feedback
    const deleteFeedback = async (id) => {
        await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'DELETE',
        })

        if(window.confirm('Are you sure you want to delete?')){
        setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    return <FeedbackContext.Provider 
    value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext