import { useRouter } from "next/router"

export default function NewsDetail(){
    const router = useRouter();

    const id = router.query.newsId;

    return <h1>The News Detail Page for id {id}</h1>
}