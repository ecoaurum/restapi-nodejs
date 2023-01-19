'use strict'

const response = require('../response');

exports.getPosts = (req, res) => {
    const posts = [
        {
            "id": 1,
            "title": "Post title 1",
            "description": "Description Post",
            "author_id": 7
        },
        {
            "id": 2,
            "title": "Post title 2",
            "description": "Description Post",
            "author_id": 6
        },
        {
            "id": 3,
            "title": "Post title 3",
            "description": "Description Post",
            "author_id": 8
        },
        {
            "id": 4,
            "title": "Post title 4",
            "description": "Description Post",
            "author_id": 10
        }
    ]
    response.status(200, posts, res);
}