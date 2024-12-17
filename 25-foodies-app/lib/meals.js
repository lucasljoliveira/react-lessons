import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql("meals.db");

export async function getMeals(){
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // just to add an extra delay to show loading page

    // throw new Error("Database error.");
    return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug){
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error("Saving image failed!");
        }
    }); // This won't work in production because the directory /public/images ins't part of the builded files, and because of that the image won't appear, to fix that we need to upload the image on a cloud, like s3.
    // In order to do that we can check the class Bonus: Storing Uploaded Images In The Cloud (AWS S3) on Section 26.

    meal.image = `/images/${fileName}`;

    db.prepare(`INSERT INTO meals 
        (title, summary, instructions, creator, creator_email, image, slug) 
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`).run(meal);

}
