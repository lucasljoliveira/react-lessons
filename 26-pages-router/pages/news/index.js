import { Fragment } from "react";
import Link from 'next/link'

export default function News(){
    return <Fragment>
            <h1>The News Page</h1>
            <ul>
                <li><Link href="/news/any-id-1">
                    Next.js pages router 1
                </Link></li>
                <li><Link href="/news/any-id-2">
                    Next.js pages router 2
                </Link></li>
            </ul>
        </Fragment>
}