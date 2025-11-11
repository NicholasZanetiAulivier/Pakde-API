const { errorResponder, errors } = require('../../../core/errors');
const db = require('../../../database/db');
const { swap } = require('../../../utils/utils');

const pages = [
    'home',
    'menu',
    'contact',
    'about'
];

const pageMap = {
    home: {
        home_banner_title_white: "bannerTitleWhite",
        home_banner_title_orange: "bannerTitleOrange",
        home_banner_subtitle: "bannerSubtitle",
        home_menu_title: "menuTitle",
        home_menu_subtitle: "menuSubtitle",
        home_story_title: "storyTitle",
        home_story_description: "storyDescription",
        home_blog_title: "blogTitle",
        home_blog_subtitle: "blogSubtitle",
    },
    menu: {
        menu_banner_title_white: "bannerTitleWhite",
        menu_banner_title_orange: "bannerTitleOrange",
        menu_banner_subtitle: "bannerSubtitle",
        menu_menu_title: "menuTitle",
        menu_menu_subtitle: "menuSubtitle",
    },
    contact: {
        contact_banner_title_white: "bannerTitleWhite",
        contact_banner_title_orange: "bannerTitleOrange",
        contact_banner_subtitle: "bannerSubtitle",
    },
    about: {
        about_banner_title_white: "bannerTitleWhite",
        about_banner_title_orange: "bannerTitleOrange",
        about_banner_subtitle: "bannerSubtitle",
        about_story_title: "storyTitle",
        about_story_description: "storyDescription",
        about_team_title: "teamTitle",
        about_team_subtitle: "teamSubtitle",
    },
};

const inversePageMap = {
    home: swap(pageMap.home),
    menu: swap(pageMap.menu),
    contact: swap(pageMap.contact),
    about: swap(pageMap.about),
};

const pageAttributes = {
    home: Object.values(pageMap.home),
    menu: Object.values(pageMap.menu),
    contact: Object.values(pageMap.contact),
    about: Object.values(pageMap.about),
};

async function getPageData(pageName) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM misc WHERE attribute LIKE $1`,
            [`${pageName}%`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting page from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

async function updatePageAttribute(pageName, attribute, value) {
    let clientref, res
    const realAttrib = inversePageMap[pageName][attribute];
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `UPDATE misc SET value = $2 WHERE attribute = $1`,
            [realAttrib, value]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error updating page attribute from database");
        }).finally(() => {
            clientref.release();
        });
    })
}


module.exports = {
    pages,
    pageMap,
    pageAttributes,
    inversePageMap,
    getPageData,
    updatePageAttribute,
};