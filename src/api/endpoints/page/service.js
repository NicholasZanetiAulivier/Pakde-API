const { errorResponder, errors } = require('../../../core/errors');
const repository = require('./repository');

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

async function getPage(pageName) {
    const result = await repository.getPageData(pageName);
    const rows = result.rows;

    if (rows.length == 0) {
        throw errorResponder(errors.DB, `${pageName} data hasn't been initialized`);
    }

    const map = pageMap[pageName];
    const data = {};
    for (const i of rows) {
        let attrib = i.attribute;
        let val = i.value;
        data[map[attrib]] = val;
    }
    return data;
}

module.exports = {
    pages: repository.pages,
    getPage,
};