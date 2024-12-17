import Link from 'next/link'
import cssClasses from './page.module.css'
import MealsGrid from '@/components/meals/meals-grid'
import { getMeals } from '@/lib/meals'
import { Suspense } from 'react';
import MealsLoadingPage from './loading-out';

export const metadata = {
    title: "All Meals",
    description: "Brose the delicious meals shared by our vibrant community."
} // We can export a metadata in each page to share specific data on that page, we can see all the fields that can be used on the metadata on the official docs: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

async function Meals(){
    const meals = await getMeals(); // In development server this function will be reused fine, but once we build, the build process will generate the static files and this function will not be called again, even if the values changed, this is a problem because the meals added won't appear, only if we rebuild.
    // To fix that problem we have to clear the cache every time we add a new meal.

    return <MealsGrid meals={meals}></MealsGrid>
}

export default function MealsPage(){

    return <>
        <header className={cssClasses.header}>
            <h1>
                Delicious meals, created{' '}
                <span className={cssClasses.highlight}>by you</span>
            </h1>
            <p>
                Choose your favorite recipe and cook it yourself. It is easy and fun.
            </p>
            <p className={cssClasses.cta}>
                <Link href="/meals/share">Share Your Favorite Recipe</Link>
            </p>
        </header>
        <main className={cssClasses.main}>
            <Suspense fallback={<MealsLoadingPage />}>
                <Meals />
            </Suspense>
        </main>
    </>
}