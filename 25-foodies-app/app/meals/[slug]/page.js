import cssClasses from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export async function generateMetadata({params}) {
    const meal = getMeal(params.slug);

    if (!meal) {
        notFound();
    } // we have to make sure that if an error occurs it also occurs on the metadata function.

    return {
        title: meal.title,
        description: meal.description
    } // we can set dynamic metadata by adding this function that receives the same parameters as the MealSharePage function.
}

export default function MealSharePage({ params }){
    const meal = getMeal(params.slug);

    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return <>
        <header className={cssClasses.header}>
            <div className={cssClasses.image}>
                <Image src={meal.image} fill />
            </div>
            <div className={cssClasses.headerText}>
                <h1>{meal.title}</h1>
                <p className={cssClasses.creator}>
                    by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                </p>
                <p className={cssClasses.summary}>{meal.summary}</p>
            </div>
        </header>
        <main>
            <p className={cssClasses.instructions} dangerouslySetInnerHTML={{__html: meal.instructions}}></p>
        </main>
    </>
}
