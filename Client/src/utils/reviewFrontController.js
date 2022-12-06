import axios from "axios";
import { getReview } from "../Redux/Actions/Actions";
import store from "../Redux/Store";

const BACK_URL = 'http://localhost:3001'

  export const addReview = async (user, id, description, score) => {
    console.log(user, id, description, score)    
    try {
      const newReview = await axios.post(`${BACK_URL}/reviews/add`, {
        user: user,
        product: id,
        review: description,
        score: score,
      });
      let review = store.dispatch(getReview(id));
      review.push(newReview)
      window.location.reload()
      return review 

    } catch (err) {
      console.log(err);
    }
  };
  