import { DummyPost } from "../models/testModel.js"

export const addDummyPost = async () => {
    await DummyPost.create({
        title:"Dummy Post",
        content:"This dummy post is created by author."
    })
}