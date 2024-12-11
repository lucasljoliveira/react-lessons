import { useActionState } from "react";
import { OpinionsContext } from '../store/opinions-context';
import { use } from "react";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext); // the same as useContext, introduced in react 19

  async function newOpinionAction(prevFormState, formData){
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");
  
    let errors = [];
  
    // validate data
    if (title.trim().length < 5) {
      errors.push("Title must be at least five characters long.")
    }
  
    if (!userName.trim()) {
      errors.push("Please provide your name.")
    }
  
    const opinionData = {
      userName,
      title,
      body
    }

    if (errors.length > 0) {
      return {errors, previousData: opinionData}
    }
  
    await addOpinion(opinionData);
  
    return {errors: null}
  }

  const [formState, formAction, pending] = useActionState(newOpinionAction, {errors: null});

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.previousData?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.previousData?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.previousData?.body}></textarea>
        </p>

        {formState.errors && (
          <ul className='errors'>
            {formState.errors.map((error) => (<li key={error}>{error}</li>))}
          </ul>
        )}

        <p className="actions">
          {/* <button type="submit" disabled={pending}>Submit</button> */}
          <Submit />
        </p>
      </form>
    </div>
  );
}
