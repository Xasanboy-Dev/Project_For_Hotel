import { Link, useParams } from "react-router-dom";

export default function PlacePage() {
    const { action } = useParams()
    return (
        <div className="">
            {action !== "new" && (
                <div className=" text-center">
                    <Link className="gap-1 inline-flex bg-primary text-white py-2 px-4 rounded-full " to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action == "new" && (
                <div className="">
                    <form>
                        <h2 className="text-2xl mt-4">Title</h2>
                        <input type="text" placeholder="For example: My lovely apartment!" />
                        <h2 className="text-2xl mt-4">Address</h2>
                        <input type="text" placeholder="address" />
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <input type="file" placeholder="address" />
                    </form>
                </div>
            )}
        </div>
    )
}