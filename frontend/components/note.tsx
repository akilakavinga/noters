import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

export default function Note() {
    return (
        <div className="shrink-0 w-full h-full flex flex-col gap-3">
            <div className=" h-52 rounded-lg border-2 border-black overflow-hidden p-4">
                <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi culpa nihil quaerat quis officiis non corrupti sapiente cumque ab, illo quod nostrum hic provident odio rem harum ex praesentium est? Lorem ipsum dolor sit amet consectetur adipisicing elit. Et asperiores cum obcaecati voluptatem assumenda explicabo aliquam fuga non rerum soluta aut repellendus dolore voluptas beatae recusandae, totam aspernatur. Asperiores, minima! Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus velit officiis doloribus ducimus. Unde voluptates animi suscipit vero consectetur, ullam, excepturi maiores omnis numquam odio nesciunt accusantium, laboriosam natus ex.</p>
            </div>
            <div className="text-center">

                <h1 className="text-4xl font-bold text-center">title</h1>
                <h2>06 dec</h2>
                <div className="">
                    <Button size='sm' variant='ghost'>Edit</Button>
                    <Button size='sm' variant='destructive'>Delete</Button>
                </div>
            </div>
        </div>
    )
}