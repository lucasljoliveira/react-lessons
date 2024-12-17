'use client';

import { useRef, useState } from "react";
import cssClasses from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }){
    const [pickedImage, setPickedImage] = useState();
    const imageInputRef = useRef();

    function handlePickClick(){
        imageInputRef.current.click();
    }
    

    function handleChangeImage(event){
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file)
    }
    
    return <div className={cssClasses.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={cssClasses.controls}>
            <div className={cssClasses.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt="The image selected by the user." fill />}
            </div>
            <input
                ref={imageInputRef}
                className={cssClasses.input}
                type="file" id={name}
                accept="image/png, image/jpeg"
                name={name}
                onChange={handleChangeImage}
                required
            />
            <button onClick={handlePickClick} className={cssClasses.button} type="button">Pick an Image</button>
        </div>
    </div>
}
