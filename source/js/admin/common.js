const urls = {
    view_admin_login: '/admin/user/login',
    view_admin_index: '/admin/',
    api_tags_find: '/tag/find',
    api_tags_add: '/tag/add',
    api_tags_edit: '/tag/edit',
    api_tags_del: '/tag/del',
    api_upload_image: '/upload/image',
    api_article_add: '/article/add',
    api_article_detail: '/article/detail',
    api_article_save: '/article/save'
};

function matchImageUrl(str) {
    let img = str.match(/<img[^>]*\ssrc=\s*['"](.*?)['"][^>]*>/i);
    return img && img[1] !== '' ? img[1]: '';
}

export {urls, matchImageUrl};