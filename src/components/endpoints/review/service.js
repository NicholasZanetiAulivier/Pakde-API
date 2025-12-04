const repository = require('./repository');

async function getReviews(offset, limit, highlighted) {
    let results = await repository.getReviews(offset, limit, highlighted);
    const rows = results.rows;
    const data = [];

    for (const i of rows) {
        let obj = {};
        obj.id = i.id;
        obj.user = {
            name: i.name,
            email: i.email,
            phoneNo: i.phone_number,
            details: i.details,
        };
        obj.review = {
            rating: i.review_rating,
            description: i.review_description,
            highlighted: i.highlighted,
        };
        data.push(obj);
    }

    return data;
}

async function createReview(data) {
    const res = await repository.createReview(data);
    return res.rows[0].id;
}

async function updateReview(id, data) {
    await repository.updateReview(id, data);
    return;
}

async function deleteReview(id) {
    await repository.deleteReview(id);
    return;
}

module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
};