'use server'; // if used in the top of the file all functions will become server side functions
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text){
    return text || text.trim() === ""
}

export async function shareMeal(prevFormState, formData){
    'use server'; // server function, only runs in the server. Must be async // We cannot use it if 'use client' is used in the same file page.

    const meal = {
        title: formData.get("title"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("image"),
    }

    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes("@") ||
        !meal.image || meal.image.size === 0
    ) {
        return {
            message: "invalid Input."
        }
    }

    await saveMeal(meal);

    revalidatePath("/meals"); // This function makes sure that the data on that path is revalidated, in other words, the cache is throw away. 
    return redirect("/meals");
}
