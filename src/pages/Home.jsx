import {v4 as uuidv4} from 'uuid'
import { useState } from "react"

import FeedbackData from "../data/FeedbackData"
import FeedbackList from "../components/FeedbackList"
import FeedbackStats from "../components/FeedbackStats"
import FeedbackForm from "../components/FeedbackForm"
import {FeedbackProvider} from "../context/FeedbackContext"

function Home() {
    const [feedback, setFeedback] = useState(FeedbackData)

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
        setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

  return (
    <FeedbackProvider>
        <FeedbackForm handleAdd={addFeedback}/>
        <FeedbackStats />
        <FeedbackList handleDelete={deleteFeedback}/>
    </FeedbackProvider>
  )
}

export default Home